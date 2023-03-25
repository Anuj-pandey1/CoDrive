import mongoose from "mongoose";

const PoolRequestSchema=new mongoose.Schema({
    sender_id :{
        type: String
    },
    reciever_id :{
        type: String
    },
    
    route_id :{
        type: String
    },
    waypoints : [{
        lat : String,
        lng : String
         }],
    
    seats :{
        type: String
    },
    static :{
        type: String
    },
    time :{
        type: String
    },
    misc :{
        type: String
    }

});

const PoolRequest=mongoose.model('PoolRequest',PoolRequestSchema);
export default PoolRequest;