import express, { urlencoded } from "express";
import Connection from "./Database/db.js";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import route from "./routes/route.js";

const app = express();

dotenv.config();

// const username = process.env.DB_USERNAME;
// const password = process.env.DB_PASSWORD;

const PORT = 8000;

app.use(cors()); // use to make req between diff port address
app.use(bodyParser({ extended: true })); // parse response to js obj
app.use(urlencoded({ extended: true })); // decode url if encoded

//importing routes
import location_formRoute from "./controller/location_form.mjs";
import friend_requestRoute from "./controller/friend_request.mjs";

//using routes
app.use("/location_form", location_formRoute);
app.use("/friend_request", friend_requestRoute);
app.use("/", route);

// app.get("/", (req, res) => {
// });
Connection();

app.listen(PORT, () => console.log("Listening at post PORT 8000"));
