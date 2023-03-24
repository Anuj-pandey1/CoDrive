import mongoose from "mongoose";

const FriendSchema = new mongoose.Schema({
  user_id: {
    type: String,
  },
  user_id_friend: {
    type: String,
  },
});

const friend = mongoose.model("Friend", FriendSchema);
export default friend;
