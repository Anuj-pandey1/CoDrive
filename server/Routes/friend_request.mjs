import express from "express";
import Friend from "../models/FriendSchema.js";
import Route from "../models/RouteSchema.js";

const router = express.Router();

router.get("/userid/:friend_userid", (req, res) => {
  const name = req.params.friend_userid;
  //add in else if if we are searching for the same user and chaange the
  const query = { user_id: name };
  Route.findOne(query, (err, data) => {
    if (err) {
      console.log("Error retrieving data", err);
      res.sendStatus(500);
    } else if (!data) {
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
    status: "pending",
  });
  try {
    const savedData = await friend.save();
    res.json(savedData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/pendingRequests", (req, res) => {
  let dummy_userid = "1234";
  const query = { user_id_friend: dummy_userid, status: "pending" };
  Friend.find(query, (err, data) => {
    if (err) {
      console.log("Error retrieving data", err);
      res.sendStatus(500);
    } else if (!data) {
      res.status(404).send({ data_exist: false });
    } else {
      res.send(data);
    }
  });
});

router.post("/acceptRequest", (req, res) => {
  let filter = { _id: req.body.id };
  let update = { status: "accepted" };
  Friend.findOneAndUpdate(filter, update)
    .then(() => {
      res.send("friend request updated");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error updating friend request");
    });
});

export default router;
