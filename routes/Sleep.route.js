const express = require("express");
const { sleep } = require("../models/Sleep.model");

const SleepRoute = express.Router();
SleepRoute.use(express.json());

SleepRoute.get("/", (req, res) => {
  res.send("Sleep Route");
});

SleepRoute.post("/detail", async (req, res) => {
  const { userId, struggle_hours, wake_time, sleep_time, total_sleep } = req.body;
  console.log(req.body)
  // Check if all required fields are present in the request body
  if (!userId || !struggle_hours || !wake_time || !sleep_time || !total_sleep) {
    return res.send({ status: "fail", error: "Missing required fields" });
  }

  try {
    const data = new sleep({ userId, struggle_hours, wake_time, sleep_time, total_sleep });
    await data.save();
    return res.status(200).json({ status: "success", data });
  } catch (error) {
    res.status(500).json({ status: "fail", error: error.message });
  }
});

module.exports = {
  SleepRoute
};
