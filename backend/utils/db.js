import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONG_URI); 
  // Connected
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
}
export default connectDB;