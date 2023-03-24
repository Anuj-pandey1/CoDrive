import express, { urlencoded } from "express";
import Connection from "./Database/db.js";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();

dotenv.config();

// const username = process.env.DB_USERNAME;
// const password = process.env.DB_PASSWORD;

const PORT = 8100;

app.use(cors()); // use to make req between diff port address
app.use(bodyParser({ extended: true })); // parse response to js obj
app.use(urlencoded({ extended: true })); // decode url if encoded
// app.use('/api',router)

//importing routes
import location_formRoute from "./Routes/location_form.mjs";

//using routes
app.use("/location_form", location_formRoute);

Connection();

app.listen(PORT, () => console.log("Listening at post PORT 8100"));
