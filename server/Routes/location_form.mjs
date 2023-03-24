import express from "express";
import Route from "../models/RouteSchema.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("hey location");
});

router.post("/", async (req, res) => {
  let reqdata = req.body;
  let dummy_userid = "1234";
  let wp = [
    { lat: reqdata.start.lat, lng: reqdata.start.lon },
    { lat: reqdata.destination.lat, lng: reqdata.destination.lon },
  ];
  const route = new Route({
    userid: dummy_userid,
    travel_type: reqdata.travel_type,
    waypoints: wp,
    seats: "",
    static: "",
    time: "",
    public_service: "",
    misc: "",
  });
  try {
    const savedData = await route.save();
    res.json(savedData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
