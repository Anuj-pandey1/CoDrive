import mongoose from "mongoose";

const RouteSchema = new mongoose.Schema({
  user_id: {
    type: String,
  },
  travel_type: {
    type: String,
  },
  waypoints: [
    {
      lat: String,
      lng: String,
    },
  ],

  seats: {
    type: String,
  },
  static: {
    type: String,
  },
  time: {
    type: String,
  },
  public_service: {
    type: String,
  },
  misc: {
    type: String,
  },
});

const route = mongoose.model("Route", RouteSchema);
export default route;
