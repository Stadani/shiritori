import { Router } from "express";
import connectDB from '../db.mjs';

const router = Router();


router.get("/words", async (req, res) => {
  try {
    const db = await connectDB();
    const words = await db.collection("shiritori").find({}).limit(1).toArray();
    res.json(words);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;