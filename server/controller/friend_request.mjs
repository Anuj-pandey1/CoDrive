import express from "express";
import Friend from "../model/FriendSchema.js";
import Route from "../model/RouteSchema.js";
import FriendAccepted from "../model/FriendAcceptedScheme.js";

const router = express.Router();

router.get("/userid/:friend_userid", (req, res) => {
  let dummy_userid = "1234";
  const name = req.params.friend_userid;
  //add in else if if we are searching for the same user and chaange
  const query = { user_id: name };
  const query1 = { user_id: dummy_userid, friends: { user_id_friend: name } };
  let nodata = false;
  FriendAccepted.findOne(query1, (err, data) => {
    if (err) {
      console.log("Error retrieving data", err);
      res.sendStatus(500);
    } else if (!data) {
    } else {
      nodata = true;
    }
  });
  if (dummy_userid === name) nodata = true;
  Route.findOne(query, (err, data) => {
    if (err) {
      console.log("Error retrieving data", err);
      res.sendStatus(500);
    } else if (!data || nodata === true) {
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
  let dummy_userid = "1234";
  const options = {
    upsert: true,
  };
  console.log(req.body.id);
  let filter = { user_id: dummy_userid };
  let update = { $push: { friends: { user_id_friend: req.body.id } } };
  //   Friend.findOneAndUpdate({ _id: req.body._id }, { status: "accepted" })
  //     .then(() => {})
  //     .catch((err) => {
  //       res.status(500).send("Error updating friends");
  //     });

  Friend.deleteOne({ _id: req.body._id }, function (err) {
    if (err) {
      console.error(err);
      res.status(500).send("Error deleting document");
    } else {
    }
  });
  FriendAccepted.findOneAndUpdate(filter, update, options)
    .then(() => {
      res.send("friend added");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error updating friends");
    });
});

router.get("/getFriends", (req, res) => {
  let dummy_userid = "1234";

  const query = {
    user_id: dummy_userid,
  };
  FriendAccepted.findOne(query, (err, data) => {
    if (err) {
      console.log("Error retrieving data", err);
      res.sendStatus(500);
    } else if (!data) {
      console.log("no data");
      res.status(404).send({ data_exist: false });
    } else {
      res.send(data);
    }
  });
});

router.post("/removeFriend", (req, res) => {
  let dummy_userid = "1234";
  let filter = { user_id: dummy_userid };
  let update = { $pull: { friends: { _id: req.body.id } } };
  const options = {
    upsert: true,
  };
  FriendAccepted.findOneAndUpdate(filter, update, options)
    .then(() => {
      res.send("friend added");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error updating friends");
    });
});

export default router;
