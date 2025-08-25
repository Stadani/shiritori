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

router.post("/getNextWord", async (req, res) => {
  try {
    const userWord = req.body.word; // converted to kana
    const lastKana = userWord[userWord.length - 1]; // last character

    const db = await connectDB();

    const isNoun = await db.collection("shiritori").findOne({
      "kana.0.text": userWord,
      sense: { $elemMatch: { partOfSpeech: "n" } }
    });

    // if (!!isNoun) { 
    //   // TODO: return error if not noun
    //   return;
    // }

    const nextWord = await db.collection("shiritori").findOne({
      "kana.0.text": { $regex: `^${lastKana}` }
    });

    res.json({ nextWord: nextWord?.kana[0].text || null, isNoun: !!isNoun });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});


export default router;