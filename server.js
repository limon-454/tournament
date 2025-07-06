const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;  // Vercel Environment Variable থেকে নিতে হবে
const client = new MongoClient(uri);

let db;

client.connect()
  .then(() => {
    db = client.db("tournament");  // আপনার MongoDB ডাটাবেসের নাম
    console.log("MongoDB connected");
  })
  .catch(err => {
    console.error("MongoDB connection error:", err);
  });

// Root route
app.get("/", (req, res) => {
  res.send("Server is working!");
});

// Matches API route
app.get("/matches", async (req, res) => {
  try {
    const matches = await db.collection("matches").find().toArray();
    res.json(matches);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch matches" });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
