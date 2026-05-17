"""
Lead-notification email service via SendGrid.

Never raises out of `notify_*` — silently logs and returns a status code so the
API endpoint never breaks on a mail outage. Use FastAPI BackgroundTasks at the
call site so the user-facing request returns fast.
"""
from __future__ import annotations

import html
import logging
import os
from typing import Any, Optional

from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import (
    Attachment,
    Bcc,
    Disposition,
    FileContent,
    FileName,
    FileType,
    Mail,
    ReplyTo,
)

logger = logging.getLogger(__name__)

BRAND_GREEN = "#1B5E20"
BRAND_AMBER = "#FFA500"


def _esc(value: Any) -> str:
    """HTML-escape any value, treating None as empty string."""
    if value is None:
        return ""
    return html.escape(str(value))


def _row(label: str, value: Any) -> str:
    if value in (None, "", False):
        return ""
    return (
        '<tr>'
        f'<td style="padding:8px 12px;background:#f5f5f0;font-family:monospace;'
        'font-size:12px;color:#555;text-transform:uppercase;letter-spacing:.05em;'
        f'width:38%;vertical-align:top;border-bottom:1px solid #e0e0d8;">{_esc(label)}</td>'
        '<td style="padding:8px 12px;font-family:-apple-system,BlinkMacSystemFont,'
        '\'Segoe UI\',Roboto,sans-serif;font-size:14px;color:#1a1a1a;'
        f'border-bottom:1px solid #e0e0d8;">{_esc(value)}</td>'
        '</tr>'
    )


def _wrap(title: str, kicker: str, table_rows: str, extra: str = "") -> str:
    return f"""\
<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#f5f5f0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#f5f5f0;padding:24px 0;">
    <tr><td align="center">
      <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="background:#ffffff;max-width:600px;width:100%;border:1px solid #e0e0d8;">
        <tr><td style="background:{BRAND_GREEN};padding:24px 28px;color:#fffff5;">
          <div style="font-family:monospace;font-size:11px;letter-spacing:.18em;color:{BRAND_AMBER};text-transform:uppercase;">— {_esc(kicker)}</div>
          <div style="font-size:24px;font-weight:700;letter-spacing:-.01em;margin-top:6px;">{_esc(title)}</div>
        </td></tr>
        <tr><td style="padding:20px 28px 8px;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border:1px solid #e0e0d8;border-bottom:none;">
            {table_rows}
          </table>
          {extra}
        </td></tr>
        <tr><td style="padding:16px 28px 28px;font-family:-apple-system,sans-serif;font-size:12px;color:#888;">
          Sent automatically by accuteksolar.com • {_esc(os.environ.get("LEAD_NOTIFY_FROM", ""))}
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>"""


def _send(
    subject: str,
    html_body: str,
    plain_body: str,
    reply_to: Optional[str] = None,
    attachment: Optional[dict] = None,
) -> int:
    """
    Send via SendGrid. Returns the HTTP status code (or 0 on internal failure).
    Never raises.
    """
    api_key = os.environ.get("SENDGRID_API_KEY", "").strip()
    sender = os.environ.get("LEAD_NOTIFY_FROM", "").strip()
    primary = os.environ.get("LEAD_NOTIFY_TO", "").strip()
    bcc = os.environ.get("LEAD_NOTIFY_BCC", "").strip()

    if not api_key or not sender or not primary:
        logger.warning(
            "SendGrid not fully configured (api_key=%s, from=%s, to=%s) — skipping email",
            "set" if api_key else "missing",
            sender or "missing",
            primary or "missing",
        )
        return 0

    try:
        message = Mail(
            from_email=sender,
            to_emails=primary,
            subject=subject,
            html_content=html_body,
            plain_text_content=plain_body,
        )
        if bcc and bcc.lower() != primary.lower():
            message.add_bcc(Bcc(bcc))
        if reply_to:
            message.reply_to = ReplyTo(reply_to)
        if attachment:
            att = Attachment(
                FileContent(attachment["content_b64"]),
                FileName(attachment["filename"]),
                FileType(attachment.get("content_type", "application/octet-stream")),
                Disposition("attachment"),
            )
            message.attachment = att

        sg = SendGridAPIClient(api_key)
        response = sg.send(message)
        status = getattr(response, "status_code", 0)
        if 200 <= status < 300:
            logger.info("SendGrid accepted lead email (status=%s, subject=%r)", status, subject)
        else:
            logger.warning("SendGrid responded non-2xx (status=%s, subject=%r)", status, subject)
        return status
    except Exception as exc:  # noqa: BLE001 — never bubble up
        logger.exception("SendGrid send failed: %s", exc)
        return 0


# ──────────────────────────────────────────────────────────
# Public helpers
# ──────────────────────────────────────────────────────────
INTEREST_LABELS = {
    "bill_savings": "Lower my electric bill",
    "solar": "Solar panels (rooftop or ground)",
    "battery": "Battery backup / energy storage",
    "generator": "Kohler standby generator",
    "electrical": "Electrical / panel upgrade",
    "diagnostic": "Diagnose / repair existing system",
    "general": "Not sure yet — exploring",
}
TIMELINE_LABELS = {
    "asap": "As soon as possible (0–30 days)",
    "1-3_months": "Within 1–3 months",
    "3-6_months": "3–6 months out",
    "6-12_months": "6–12 months out",
    "exploring": "Just researching for now",
}


def _calc_extra(calculator_results: Any) -> str:
    if not calculator_results:
        return ""
    items = []
    try:
        if isinstance(calculator_results, dict):
            iterable = [calculator_results]
        else:
            iterable = list(calculator_results)
        for r in iterable:
            if not isinstance(r, dict):
                continue
            items.append(
                '<li style="margin:0 0 8px;padding:10px 12px;background:#f5f5f0;'
                'border-left:3px solid ' + BRAND_AMBER + ';">'
                '<div style="font-family:monospace;font-size:11px;color:#7a5a00;'
                'text-transform:uppercase;letter-spacing:.05em;">'
                f'{_esc(r.get("label") or r.get("tool") or "Calculator")}</div>'
                f'<div style="font-size:14px;color:#1a1a1a;margin-top:4px;">'
                f'{_esc(r.get("summary") or "")}</div></li>'
            )
    except Exception:
        return ""
    if not items:
        return ""
    return (
        '<div style="margin-top:18px;">'
        '<div style="font-family:monospace;font-size:11px;letter-spacing:.18em;'
        f'color:{BRAND_GREEN};text-transform:uppercase;margin-bottom:8px;">— Calculator estimates attached</div>'
        '<ul style="list-style:none;padding:0;margin:0;">' + "".join(items) + "</ul></div>"
    )


def notify_new_residential_lead(lead: dict) -> int:
    services = []
    if lead.get("services_solar_panels"):
        services.append("Solar panels")
    if lead.get("services_battery_backup"):
        services.append("Battery backup")
    if lead.get("services_electrical_panel"):
        services.append("Electrical / panel upgrade")

    rows = "".join([
        _row("Name", lead.get("name")),
        _row("Email", lead.get("email")),
        _row("Phone", lead.get("phone")),
        _row("Address", lead.get("address")),
        _row("Primary interest", INTEREST_LABELS.get(lead.get("interest"), lead.get("interest"))),
        _row("Avg. monthly bill", f"${lead.get('monthly_bill')}" if lead.get("monthly_bill") else None),
        _row("Timeline", TIMELINE_LABELS.get(lead.get("timeline"), lead.get("timeline"))),
        _row("Owns home 5+ yrs", "Yes" if lead.get("owns_home_5yr_plus") else None),
        _row("Services wanted", ", ".join(services) if services else None),
        _row("Message", lead.get("message")),
        _row("Source", lead.get("source")),
    ])

    html_body = _wrap(
        title=f"New lead — {lead.get('name', 'Unknown')}",
        kicker="Residential intake",
        table_rows=rows,
        extra=_calc_extra(lead.get("calculator_results")),
    )

    plain_lines = [
        "New residential lead from accuteksolar.com",
        f"Name: {lead.get('name')}",
        f"Email: {lead.get('email')}",
        f"Phone: {lead.get('phone') or '—'}",
        f"Interest: {INTEREST_LABELS.get(lead.get('interest'), lead.get('interest'))}",
        f"Monthly bill: ${lead.get('monthly_bill') or '—'}",
        f"Timeline: {TIMELINE_LABELS.get(lead.get('timeline'), lead.get('timeline') or '—')}",
        f"Message: {lead.get('message') or '—'}",
    ]
    return _send(
        subject=f"New lead: {lead.get('name', 'Unknown')} ({INTEREST_LABELS.get(lead.get('interest'), 'general')})",
        html_body=html_body,
        plain_body="\n".join(plain_lines),
        reply_to=lead.get("email"),
    )


def notify_new_commercial_lead(lead: dict, attachment: Optional[dict] = None) -> int:
    rows = "".join([
        _row("Name", lead.get("name")),
        _row("Email", lead.get("email")),
        _row("Phone", lead.get("phone")),
        _row("Facility size", lead.get("facility_size")),
        _row("Facility type", lead.get("facility_type")),
        _row("Critical loads", lead.get("critical_loads")),
        _row("Existing brand", lead.get("existing_brand")),
        _row("Timeline", lead.get("timeline")),
        _row("Address", lead.get("address")),
        _row("Notes", lead.get("notes")),
        _row(
            "Site plan attached",
            attachment.get("filename") if attachment else None,
        ),
    ])
    html_body = _wrap(
        title=f"Commercial intake — {lead.get('name', 'Unknown')}",
        kicker="Commercial intake",
        table_rows=rows,
    )
    plain = (
        "New commercial intake from accuteksolar.com\n"
        f"Name: {lead.get('name')}\nEmail: {lead.get('email')}\nPhone: {lead.get('phone') or '—'}\n"
        f"Facility: {lead.get('facility_size') or '—'} {lead.get('facility_type') or ''}\n"
        f"Timeline: {lead.get('timeline') or '—'}\n"
        f"Notes: {lead.get('notes') or '—'}\n"
    )
    return _send(
        subject=f"New COMMERCIAL intake: {lead.get('name', 'Unknown')}",
        html_body=html_body,
        plain_body=plain,
        reply_to=lead.get("email"),
        attachment=attachment,
    )
