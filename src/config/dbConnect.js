import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const dbConnect = async () =>{
    try{

        const connect = await mongoose.connect(process.env.MONGODB_STRING);
        console.log(`Database connected!`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
    
}

export default dbConnect;