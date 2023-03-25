import express from 'express'
import Conversation from '../models/Conversation.js'
const conversationRouter = express.Router();
//new conversation
conversationRouter.post("/", async (req, res) => {
    console.log(req.body.senderId, req.body.receiverId)
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId]

    })
    try{
     const savedConversation=await newConversation.save();
     res.status(200).json(savedConversation);
    }
    catch(err){
      res.status(500).json(err);
    }

})
conversationRouter.get("/:userId",async(req,res)=>{
    try{
     const conversation=await Conversation.find({
        members:{ $in:[req.params.userId]}
     })
     res.status(200).json(conversation);
    }
    catch (err) {
        res.status(500).json(err);
    }

})
export default conversationRouter;
