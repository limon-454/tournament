const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();
app.use(cors());

const uri = "mongodb+srv://limon99k:MZPPTPSy8qnpl169@cluster0.zsdwthr.mongodb.net/tournament?retryWrites=true&w=majority";
const client = new MongoClient(uri);

async function connectDB() {
  try {
    await client.connect();
    const db = client.db("tournament");
    const matches = db.collection("matches");

    app.get("/matches", async (req, res) => {
      const data = await matches.find().toArray();
      res.json(data);
    });

    app.get("/", (req, res) => {
      res.send("API is running!");
    });

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

  } catch (err) {
    console.error(err);
  }
}
connectDB();
