import mongoose from 'mongoose';

const Connection = async()=>{
    const URL = 'mongodb+srv://root:root@hack.fkhswmn.mongodb.net/?retryWrites=true&w=majority';
    
    try{
        await mongoose.connect(URL,{useUnifiedTopology: true, useNewUrlParser: true})
        console.log('Successfully connected');
    }
    catch(err){
        console.log('Error while connecting to database',err);
    }
}

export default Connection;