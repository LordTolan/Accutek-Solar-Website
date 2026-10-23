import assert from "node:assert/strict";
import test from "node:test";
import {
  DONE_TEXT,
  TOURS,
  assertTourCopy,
  chooseStepElements,
  clearTourMemory,
  readTourSeen,
  arrowCue,
  overlapArea,
  placeSunny,
  stepAnnouncement,
  cookieMarksTourDone,
  formatTourDoneCookie,
  isTourRootInReach,
  TOUR_DONE_COOKIE,
  TOUR_DONE_MAX_AGE,
  tourDoneToken,
  tourForceMode,
  tourStorageKey,
  unionRect,
  writeTourSeen,
} from "./sunnyTour";

test("the offer explains the tour in plain words before the visitor chooses", () => {
  assert.equal(
    TOURS.utility.offer,
    "Hi, I'm Sunny! I'll walk you through this calculator step by step so you can see how your power bill adds up over time and what solar could change."
  );
  assert.equal(
    TOURS.savings.offer,
    "Hi, I'm Sunny! I'll walk you through this calculator step by step so you can set your electric bill and see what a solar estimate includes."
  );
  assert.notEqual(TOURS.utility.offer, TOURS.savings.offer);
  for (const tour of Object.values(TOURS)) {
    assert.equal(tour.offer.includes("$"), false);
    assert.doesNotThrow(() => assertTourCopy(tour.offer));
    assert.ok(tour.offer.split(/(?<=[.!])\s+/).length <= 2);
  }
});

test("tour copy never states a price or a dollar figure", () => {
  assert.throws(() => assertTourCopy("A system costs $18,000"));
  assert.throws(() => assertTourCopy("You will save 217,306 over time"));
  assert.throws(() => assertTourCopy("Here is how pricing works"));
  for (const tour of Object.values(TOURS)) {
    for (const step of tour.steps) {
      assert.doesNotThrow(() => assertTourCopy(step.label));
      assert.doesNotThrow(() => assertTourCopy(step.bubble));
      assert.equal(step.label.includes("$"), false);
      assert.equal(step.bubble.includes("$"), false);
      assert.equal(/\b\d+\s*(yr|yrs|kW)\b/i.test(step.bubble), false);
      if (step.alternateBubble) {
        assert.doesNotThrow(() => assertTourCopy(step.alternateBubble));
        assert.equal(step.alternateBubble.includes("$"), false);
      }
    }
  }
});

test("each calculator page remembers a dismissal in the cookie and in localStorage", () => {
  assert.notEqual(TOURS.utility.storageKey, TOURS.savings.storageKey);
  assert.equal(tourStorageKey("utility", "/"), "accutek.sunnyTour.utility.choice:/");
  assert.equal(tourStorageKey("utility", "/backup-power/"), "accutek.sunnyTour.utility.choice:/backup-power");
  assert.notEqual(tourStorageKey("utility", "/"), tourStorageKey("utility", "/backup-power/"));
  assert.equal(tourStorageKey("savings", "/tools/calculator/"), "accutek.sunnyTour.savings.choice");
  assert.equal(tourDoneToken("utility", "/backup-power/"), "utility:/backup-power");
  assert.equal(tourDoneToken("savings", "/tools/calculator"), "savings");
  const memory = new Map<string, string>();
  const storage = {
    getItem: (key: string) => memory.get(key) ?? null,
    setItem: (key: string, value: string) => {
      memory.set(key, value);
    },
  };
  clearTourMemory();
  assert.equal(readTourSeen("utility", storage, "/", ""), false);
  memory.set("accutek.sunnyTour.utility:/", "1");
  assert.equal(readTourSeen("utility", storage, "/", ""), true);
  assert.equal(readTourSeen("utility", storage, "/backup-power", ""), false);
  memory.delete("accutek.sunnyTour.utility:/");
  let header = "";
  writeTourSeen("utility", storage, "/", (assignment) => {
    header = assignment.split(";")[0];
  });
  assert.equal(readTourSeen("utility", storage, "/", header), true);
  assert.equal(readTourSeen("utility", storage, "/backup-power", header), false);
  assert.equal(memory.get("accutek.sunnyTour.utility.choice:/"), "1");
  const assignment = formatTourDoneCookie(header, "savings", "/tools/calculator/");
  assert.match(assignment, new RegExp(`^${TOUR_DONE_COOKIE}=`));
  assert.match(assignment, /Max-Age=31536000/);
  assert.equal(TOUR_DONE_MAX_AGE, 60 * 60 * 24 * 365);
  assert.match(assignment, /Path=\//);
  assert.match(assignment, /SameSite=Lax/);
  assert.equal(assignment.includes("$"), false);
  const saved = assignment.split(";")[0];
  assert.equal(cookieMarksTourDone(saved, "savings", "/tools/calculator"), true);
  assert.equal(cookieMarksTourDone(saved, "utility", "/"), true);
  assert.equal(cookieMarksTourDone(saved, "utility", "/backup-power"), false);
  memory.clear();
  assert.equal(readTourSeen("savings", storage, "/tools/calculator", saved), true);
  assert.equal(readTourSeen("utility", storage, "/backup-power", saved), false);
});

test("a tall calculator section is in reach once its top is on screen", () => {
  assert.equal(isTourRootInReach({ top: 180, bottom: 2100, height: 1920 }, 800), true);
  assert.equal(isTourRootInReach({ top: 1045, bottom: 2900, height: 1855 }, 900), false);
  assert.equal(isTourRootInReach({ top: -40, bottom: 20, height: 1800 }, 800), false);
});

test("utility tour ends on the in-page buttons, not the sticky bar", () => {
  assert.equal(TOURS.utility.steps.length, 5);
  const calculator = TOURS.utility.steps[3];
  const quote = TOURS.utility.steps[4];
  assert.equal(calculator.key, "calculator");
  assert.equal(
    calculator.bubble,
    "Want to see what solar could save you? Tap here to try our solar savings calculator."
  );
  assert.equal(quote.key, "quote");
  assert.equal(quote.bubble, "Want your real numbers? Tap here for a free quote and a site visit.");
  assert.equal(quote.preferFallback, undefined);
  assert.equal(quote.fallbacks, undefined);
  assert.equal(calculator.preferFallback, undefined);
  assert.match(stepAnnouncement(4, 5, quote.bubble), /^Step 5 of 5\./);
  assert.throws(() => assertTourCopy("Solar could save you $18,000"));
});

test("mobile Free Quote wins when it is visible; desktop falls back to the in-page button", () => {
  const sticky = { id: "sticky" };
  const page = { id: "page" };
  const visible = new Set([sticky, page]);
  assert.deepEqual(
    chooseStepElements([page], [sticky], true, (el) => visible.has(el)).map((el) => el.id),
    ["sticky"]
  );
  assert.deepEqual(
    chooseStepElements([page], [sticky], true, (el) => el === page).map((el) => el.id),
    ["page"]
  );
  const boxA = { id: "a" };
  const boxB = { id: "b" };
  const hidden = { id: "hidden" };
  assert.deepEqual(
    chooseStepElements([boxA, boxB, hidden], [], false, (el) => el !== hidden).map((el) => el.id),
    ["a", "b"]
  );
});

test("Sunny parks beside a target in the gap that does not cover text", () => {
  const home = { left: 310, top: 760, width: 70, height: 70 };
  const viewport = { width: 400, height: 844 };
  const slider = { left: 40, top: 220, width: 320, height: 64 };
  const paragraph = { left: 40, top: 140, width: 320, height: 48 };
  const placed = placeSunny({
    home,
    target: slider,
    viewport,
    obstacles: [paragraph],
    blocked: [],
    minTop: 64,
    maxBottom: 760,
    prefer: "below",
  });
  assert.ok(placed);
  assert.equal(placed.side, "below");
  assert.ok(placed.box.top >= slider.top + slider.height - 1);
  assert.equal(overlapArea(placed.box, slider), 0);
  assert.equal(overlapArea(placed.box, paragraph), 0);
  assert.ok(placed.box.left >= 8);
  assert.ok(placed.box.left + placed.box.width <= 392);

  const number = { left: 48, top: 320, width: 180, height: 56 };
  const heading = { left: 48, top: 270, width: 300, height: 28 };
  const boxes = { left: 48, top: 400, width: 300, height: 72 };
  const beside = placeSunny({
    home,
    target: number,
    viewport,
    obstacles: [heading, number, boxes],
    blocked: [],
    minTop: 64,
    maxBottom: 760,
    prefer: "right",
  });
  assert.ok(beside);
  assert.equal(beside.side, "right");
  assert.equal(overlapArea(beside.box, number), 0);
  assert.equal(overlapArea(beside.box, heading), 0);
  assert.equal(overlapArea(beside.box, boxes), 0);

  const blockedBelow = { left: 48, top: 300, width: 200, height: 40 };
  const openRight = placeSunny({
    home,
    target: blockedBelow,
    viewport,
    obstacles: [{ left: 48, top: 348, width: 240, height: 80 }],
    blocked: [],
    minTop: 64,
    prefer: "below",
  });
  assert.ok(openRight);
  assert.equal(overlapArea(openRight.box, blockedBelow), 0);
  assert.equal(overlapArea(openRight.box, { left: 48, top: 348, width: 240, height: 80 }), 0);
  assert.ok(["left", "right", "above"].includes(openRight.side));
});

test("the quote button keeps Sunny fully on screen and off the label", () => {
  const home = { left: 310, top: 700, width: 70, height: 70 };
  const button = { left: 206, top: 792, width: 178, height: 44 };
  const call = { left: 16, top: 792, width: 178, height: 44 };
  const controls = { left: 12, top: 728, width: 230, height: 44 };
  const yearLabel = { left: 330, top: 690, width: 58, height: 16 };
  const placed = placeSunny({
    home,
    target: button,
    viewport: { width: 400, height: 844 },
    obstacles: [yearLabel],
    blocked: [button, call, controls],
    minTop: 64,
    maxBottom: 728,
    prefer: "above",
  });
  assert.ok(placed);
  assert.equal(overlapArea(placed.box, button), 0);
  assert.equal(overlapArea(placed.box, call), 0);
  assert.equal(overlapArea(placed.box, controls), 0);
  assert.equal(overlapArea(placed.box, yearLabel), 0);
  assert.ok(placed.box.top >= 64);
  assert.ok(placed.box.top + placed.box.height <= 728);
  assert.ok(placed.box.left >= 8);
  assert.ok(placed.box.left + placed.box.width <= 392);
  const center = placed.box.left + placed.box.width / 2;
  assert.ok(center > button.left - 8 && center < button.left + button.width + 8);

  const arrow = arrowCue(placed.box, button, [yearLabel, controls, call, button]);
  if (arrow) {
    const glyph = { left: arrow.x - 9, top: arrow.y - 9, width: 18, height: 18 };
    assert.equal(overlapArea(glyph, yearLabel), 0);
    assert.equal(overlapArea(glyph, button), 0);
  }
});

test("a full-width target keeps Sunny in the gap above it", () => {
  const home = { left: 300, top: 740, width: 72, height: 72 };
  const boxes = { left: 49, top: 617, width: 302, height: 98 };
  const number = { left: 49, top: 452, width: 206, height: 65 };
  const figure = { left: 246, top: 670, width: 51, height: 27 };
  const placed = placeSunny({
    home,
    target: boxes,
    viewport: { width: 400, height: 844 },
    obstacles: [number, figure],
    blocked: [],
    minTop: 80,
    maxBottom: 716,
    prefer: "above",
  });
  assert.ok(placed);
  assert.equal(overlapArea(placed.box, boxes), 0);
  assert.equal(overlapArea(placed.box, number), 0);
  assert.equal(overlapArea(placed.box, figure), 0);
  assert.ok(placed.box.top + placed.box.height <= boxes.top);
});

test("the speech bubble sits beside Sunny and off the target", () => {
  const home = { left: 320, top: 760, width: 72, height: 72 };
  const target = { left: 40, top: 220, width: 180, height: 48 };
  const placed = placeSunny({
    home,
    target,
    viewport: { width: 400, height: 844 },
    obstacles: [{ left: 40, top: 160, width: 200, height: 28 }],
    blocked: [],
    minTop: 64,
    maxBottom: 760,
    prefer: "right",
    bubbleSize: { width: 180, height: 64 },
  });
  assert.ok(placed?.bubble);
  assert.equal(overlapArea(placed.bubble.box, target), 0);
  assert.equal(overlapArea(placed.bubble.box, placed.box), 0);
  assert.equal(overlapArea(placed.bubble.box, { left: 40, top: 160, width: 200, height: 28 }), 0);
  assert.ok(placed.bubble.box.left >= 8);
  assert.ok(placed.bubble.box.left + placed.bubble.box.width <= 392);
  const gapX = Math.max(
    0,
    Math.max(placed.box.left - (placed.bubble.box.left + placed.bubble.box.width), placed.bubble.box.left - (placed.box.left + placed.box.width))
  );
  const gapY = Math.max(
    0,
    Math.max(placed.box.top - (placed.bubble.box.top + placed.bubble.box.height), placed.bubble.box.top - (placed.box.top + placed.box.height))
  );
  assert.ok(Math.hypot(gapX, gapY) < 40);
});

test("two boxes share one highlight area", () => {
  const union = unionRect([
    { left: 10, top: 40, width: 80, height: 50 },
    { left: 100, top: 40, width: 80, height: 60 },
  ]);
  assert.deepEqual(union, { left: 10, top: 40, width: 170, height: 60 });
});

test("query flag can offer again or jump straight into the tour", () => {
  assert.equal(tourForceMode("?sunnyTour=1"), "offer");
  assert.equal(tourForceMode("?sunnyTour=replay"), "replay");
  assert.equal(tourForceMode(""), null);
  assert.equal(DONE_TEXT.includes("$"), false);
});
