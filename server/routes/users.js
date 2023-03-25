import express from 'express'
import User from '../models/User.js'
const userRouter = express.Router();
userRouter.post("/", async (req, res) => {
    console.log(req.body.name, req.body.password);
    const newUser = new User({
       name:req.body.name,
       email:req.body.email,
       password:req.body.password

    })
    try {
        const x = await newUser.save();
        res.status(200).json(x);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }

})
userRouter.get("/:userId", async (req, res) => {
    try {
        
        const x=req.params.userId
        console.log(typeof x)
        const newUser = await User.findOne({_id : x});
        console.log(newUser);
        res.status(200).json(newUser);
    }
    catch (err) {
        res.status(504).json(err);
    }

})
export default userRouter;