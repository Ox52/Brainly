import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let isConnected = false;
let connectionPromise: Promise<typeof mongoose> | null = null;

export const connectDB = async () => {
  if (isConnected) {
    return;
  }

  if (!process.env.MONGO_URL) {
    throw new Error("MONGO_URL is not set");
  }

  try {
    if (!connectionPromise) {
      connectionPromise = mongoose.connect(process.env.MONGO_URL);
    }

    await connectionPromise;
    isConnected = true;
    console.log("DB connected");
  } catch (error) {
    connectionPromise = null;
    console.error("Mongo DB connection failed!", error);
    throw error;
  }
};