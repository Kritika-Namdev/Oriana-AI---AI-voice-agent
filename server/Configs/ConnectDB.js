// in this we are connecting the database
// using mongoose

import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("db connected")
    }catch(error){
        console.log("db error",error)
        throw error
    }
}

export default connectDB
