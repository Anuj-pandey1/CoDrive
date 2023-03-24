import mongoose from "mongoose";

const location_formSchema = new mongoose.Schema(
  {
    userid: {
      type: String,
      required: true,
    },
    data: {
      travel_type: {
        type: String,
      },
      start: {
        lat: {
          type: String,
        },
        lon: {
          type: String,
        },
      },
      destination: {
        lat: {
          type: String,
        },
        lon: {
          type: String,
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

const location_form = mongoose.model("Location_form", location_formSchema);
export default location_form;
