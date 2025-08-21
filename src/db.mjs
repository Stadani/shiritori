import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas");
    return client.db("shiritori"); // choose DB name
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
  }
}


export default connectDB;

