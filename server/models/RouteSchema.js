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

// const location_formSchema = new mongoose.Schema(
//   {
//     userid: {
//       type: String,
//       required: true,
//     },
//     data: {
//       travel_type: {
//         type: String,
//       },
//       start: {
//         lat: {
//           type: String,
//         },
//         lon: {
//           type: String,
//         },
//       },
//       destination: {
//         lat: {
//           type: String,
//         },
//         lon: {
//           type: String,
//         },
//       },
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// const location_form = mongoose.model("Location_form", location_formSchema);
// export default location_form;
