import express from 'express';
import Connection from './database/db.js'
import dotenv from 'dotenv';
import cors from 'cors';
import conversationRouter from './routes/conversations.js'
import messageRouter from './routes/messages.js'
import userRoute from './routes/users.js'
const app=express();
dotenv.config();
const PORT=8000;
const username=process.env.DB_USERNAME;
const password=process.env.DB_PASSWORD;
app.listen(PORT, () => console.log("server is running succesfully"));
Connection(username,password);
app.use(cors());
app.use(express.json());
app.use("/conversations",conversationRouter);
app.use("/messages",messageRouter);
app.use("/users",userRoute);



