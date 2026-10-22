import assert from "node:assert/strict";
import test from "node:test";
import {
  DONE_TEXT,
  OFFER_TEXT,
  TOURS,
  assertTourCopy,
  chooseStepElements,
  clearTourMemory,
  labelForResolvedStep,
  readTourSeen,
  stepAnnouncement,
  sunnyOffset,
  tourForceMode,
  unionRect,
  writeTourSeen,
} from "./sunnyTour";

test("tour copy never states a price or a dollar figure", () => {
  assert.equal(OFFER_TEXT.includes("$"), false);
  assert.doesNotThrow(() => assertTourCopy(OFFER_TEXT));
  assert.throws(() => assertTourCopy("A system costs $18,000"));
  assert.throws(() => assertTourCopy("You will save 217,306 over time"));
  assert.throws(() => assertTourCopy("Here is how pricing works"));
  for (const tour of Object.values(TOURS)) {
    for (const step of tour.steps) {
      assert.doesNotThrow(() => assertTourCopy(step.label));
      assert.equal(step.label.includes("$"), false);
    }
  }
});

test("each calculator has its own once-per-visitor flag", () => {
  assert.notEqual(TOURS.utility.storageKey, TOURS.savings.storageKey);
  const memory = new Map<string, string>();
  const storage = {
    getItem: (key: string) => memory.get(key) ?? null,
    setItem: (key: string, value: string) => {
      memory.set(key, value);
    },
  };
  clearTourMemory();
  assert.equal(readTourSeen("utility", storage), false);
  writeTourSeen("utility", storage);
  assert.equal(readTourSeen("utility", storage), true);
  assert.equal(readTourSeen("savings", storage), false);
  assert.equal(memory.get(TOURS.savings.storageKey), undefined);
});

test("quote step keeps the Free Quote wording only for that button", () => {
  const step = TOURS.utility.steps[3];
  assert.equal(labelForResolvedStep(step, "sticky-quote"), "Tap Free Quote for your real numbers.");
  assert.equal(
    labelForResolvedStep(step, "projection-cta-primary"),
    "Tap the quote button for your real numbers."
  );
  assert.match(stepAnnouncement(3, 4, step.label), /^Step 4 of 4\./);
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

test("Sunny parks above a wide target, beside a slider, and outside a short number", () => {
  const home = { left: 300, top: 700, width: 70, height: 70 };
  const wide = { left: 20, top: 400, width: 300, height: 48 };
  const above = sunnyOffset(home, wide, { width: 390, height: 844 }, 72, "above");
  const aboveLeft = home.left + above.x;
  const aboveTop = home.top + above.y;
  assert.ok(aboveTop >= 72);
  assert.ok(aboveLeft > wide.left && aboveLeft + home.width < wide.left + wide.width);
  assert.ok(aboveTop + home.height < wide.top + 24);

  const start = sunnyOffset(home, wide, { width: 390, height: 844 }, 72, "start");
  assert.ok(home.left + start.x < wide.left + 40);

  const narrow = { left: 40, top: 300, width: 120, height: 48 };
  const corner = sunnyOffset(home, narrow, { width: 390, height: 844 }, 72, "corner");
  const cornerLeft = home.left + corner.x;
  const cornerTop = home.top + corner.y;
  assert.ok(cornerLeft + home.width > narrow.left + narrow.width - 8);
  assert.ok(cornerTop + home.height <= narrow.top + 20);

  const clamped = sunnyOffset(
    home,
    { left: 360, top: 4, width: 40, height: 20 },
    { width: 390, height: 844 },
    72,
    "above"
  );
  assert.equal(home.left + clamped.x, 390 - 70 - 8);
  assert.equal(home.top + clamped.y, 72);
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
