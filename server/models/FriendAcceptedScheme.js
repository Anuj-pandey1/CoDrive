import mongoose from "mongoose";

const FriendAcceptedSchema = new mongoose.Schema({
  user_id: {
    type: String,
  },
  friends: {
    type: [
      {
        user_id_friend: {
          type: String,
        },
      },
    ],
  },
});

const friendAccepted = mongoose.model("FriendAccepted", FriendAcceptedSchema);
export default friendAccepted;
