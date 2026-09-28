import mongoose from "mongoose";
export const db = async () => {
  try{
    //connection create krna hai
    await mongoose.connect(process.env.MONGO_URL)
    console.log("database connected")
  }
  catch(err){
    console.log(err.message);
    process.exit(1)
  }
}