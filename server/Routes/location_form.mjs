import express from "express";
import Location_form from "../models/location_form_schema.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("hey location");
});

router.post("/", async (req, res) => {
  let reqdata = req.body;
  let dummy_userid = "1234";
  const location_form = new Location_form({
    userid: dummy_userid,
    data: {
      travel_type: reqdata.travel_type,
      start: { lat: reqdata.start.lat, lon: reqdata.start.lon },
      destination: {
        lat: reqdata.destination.lat,
        lon: reqdata.destination.lon,
      },
    },
  });
  try {
    const savedData = await location_form.save();
    res.json(savedData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
