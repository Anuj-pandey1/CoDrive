import express from "express";
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

export default router;
