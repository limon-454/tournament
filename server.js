const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let db, matchCol;

async function connectDB() {
  try {
    await client.connect();
    db = client.db("tournament");
    matchCol = db.collection("matches");
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB error:", err);
  }
}
connectDB();

app.get("/", (req, res) => {
  res.send("🚀 Server is running!");
});

app.get("/matches", async (req, res) => {
  const data = await matchCol.find().toArray();
  res.json(data);
});

app.post("/matches", async (req, res) => {
  const match = req.body;
  const result = await matchCol.insertOne(match);
  res.json(result);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
