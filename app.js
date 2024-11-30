const express = require("express");
const { calculateMean, calculateMedian, calculateMode } = require("./helpers");

const app = express();

function parseNums(numsStr) {
  if (!numsStr) throw new Error("nums are required.");
  const nums = numsStr.split(",").map(num => {
    const parsed = Number(num);
    if (isNaN(parsed)) {
      throw new Error(`${num} is not a number.`);
    }
    return parsed;
  });
  return nums;
}

app.get("/mean", (req, res) => {
  try {
    const nums = parseNums(req.query.nums);
    const mean = calculateMean(nums);
    return res.json({ operation: "mean", value: mean });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

app.get("/median", (req, res) => {
  try {
    const nums = parseNums(req.query.nums);
    const median = calculateMedian(nums);
    return res.json({ operation: "median", value: median });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

app.get("/mode", (req, res) => {
  try {
    const nums = parseNums(req.query.nums);
    const mode = calculateMode(nums);
    return res.json({ operation: "mode", value: mode });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

app.listen(3000, () => {
  console.log("App running on port 3000");
});

module.exports = app;
