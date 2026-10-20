const test = require("node:test");
const assert = require("node:assert/strict");
const { validateReservation, localDate } = require(process.env.BLINI_VALIDATION_MODULE);
const valid = { date: "2030-06-02", time: "18:00", guests: "2", requests: "" };
test("accepts an example future reservation", () => assert.deepEqual(validateReservation(valid, "2030-06-01"), {}));
test("rejects missing, impossible, same-day and past dates", () => {
  for (const date of ["", "2030-02-30", "2030-06-01", "2029-06-01", "bad-date"]) {
    assert.ok(validateReservation({ ...valid, date }, "2030-06-01").date, date);
  }
});
test("accepts leap day and rejects a non-leap-year February 29", () => {
  assert.equal(validateReservation({ ...valid, date: "2032-02-29" }, "2032-01-01").date, undefined);
  assert.ok(validateReservation({ ...valid, date: "2031-02-29" }, "2031-01-01").date);
});
test("rejects non-demo times, invalid party sizes and oversized requests", () => {
  for (const guests of ["0", "9", "-1", "2.5", "01", ""]) assert.ok(validateReservation({ ...valid, guests }, "2030-06-01").guests);
  assert.ok(validateReservation({ ...valid, time: "04:00" }, "2030-06-01").time);
  assert.ok(validateReservation({ ...valid, requests: "x".repeat(301) }, "2030-06-01").requests);
});
test("uses local calendar dates without UTC shifting", () => assert.equal(localDate(new Date(2030, 5, 2, 0, 1)), "2030-06-02"));
