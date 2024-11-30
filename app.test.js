const request = require("supertest");
const app = require("./app");
const { calculateMean, calculateMedian, calculateMode } = require("./helpers");

describe("Helper Functions", () => {
  test("calculateMean", () => {
    expect(calculateMean([1, 2, 3])).toEqual(2);
    expect(calculateMean([])).toEqual(0);
  });

  test("calculateMedian", () => {
    expect(calculateMedian([1, 2, 3])).toEqual(2);
    expect(calculateMedian([1, 2, 3, 4])).toEqual(2.5);
  });

  test("calculateMode", () => {
    expect(calculateMode([1, 2, 2, 3])).toEqual(2);
    expect(calculateMode([1, 1, 2, 2, 3])).toEqual([1, 2]);
  });
});

describe("API Routes", () => {
  test("GET /mean", async () => {
    const res = await request(app).get("/mean?nums=1,2,3");
    expect(res.body).toEqual({ operation: "mean", value: 2 });
  });

  test("GET /median", async () => {
    const res = await request(app).get("/median?nums=1,3,2");
    expect(res.body).toEqual({ operation: "median", value: 2 });
  });

  test("GET /mode", async () => {
    const res = await request(app).get("/mode?nums=1,2,2,3");
    expect(res.body).toEqual({ operation: "mode", value: 2 });
  });

  test("Handles invalid number", async () => {
    const res = await request(app).get("/mean?nums=1,foo,3");
    expect(res.status).toEqual(400);
    expect(res.body.error).toEqual("foo is not a number.");
  });

  test("Handles missing nums", async () => {
    const res = await request(app).get("/mean");
    expect(res.status).toEqual(400);
    expect(res.body.error).toEqual("nums are required.");
  });
});
