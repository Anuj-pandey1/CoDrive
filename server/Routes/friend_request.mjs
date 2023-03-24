import express from "express";
import Friend from "../models/FriendSchema.js";
import Route from "../models/RouteSchema.js";

const router = express.Router();

router.get("/:friend_userid", (req, res) => {
  const name = req.params.friend_userid;
  const query = { user_id: name };
  Route.findOne(query, (err, data) => {
    if (err) {
      console.log("Error retrieving data", err);
      res.sendStatus(500);
    } else if (!data) {
      console.log("No data found");
      res.status(404).send({ data_exist: false });
    } else {
      res.send(data);
    }
  });
});

router.post("/sendRequest", async (req, res) => {
  let reqdata = req.body;
  let dummy_userid = "1234";
  const friend = new Friend({
    user_id: dummy_userid,
    user_id_friend: reqdata.user_id,
  });
  try {
    const savedData = await friend.save();
    res.json(savedData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
