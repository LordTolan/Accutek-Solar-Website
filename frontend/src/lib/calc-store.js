// Tiny localStorage-backed store for calculator results,
// so /tools → /contact can hand off numbers without a backend hop.
import { logger } from "@/lib/logger";

const KEY = "accutek_calc_results";

export function saveCalcResult(toolId, label, summary, raw) {
  try {
    const all = readAll();
    all[toolId] = {
      tool: toolId,
      label,
      summary, // human-readable one-liner
      raw,     // structured numbers
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem(KEY, JSON.stringify(all));
    window.dispatchEvent(new Event("accutek-calc-updated"));
  } catch (err) {
    logger.warn("calc-store: saveCalcResult failed", err);
  }
}

export function readAll() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch (err) {
    logger.warn("calc-store: readAll parse failed", err);
    return {};
  }
}

export function clearAll() {
  try {
    localStorage.removeItem(KEY);
    window.dispatchEvent(new Event("accutek-calc-updated"));
  } catch (err) {
    logger.warn("calc-store: clearAll failed", err);
  }
}

export function removeOne(toolId) {
  try {
    const all = readAll();
    delete all[toolId];
    localStorage.setItem(KEY, JSON.stringify(all));
    window.dispatchEvent(new Event("accutek-calc-updated"));
  } catch (err) {
    logger.warn("calc-store: removeOne failed", err);
  }
}
