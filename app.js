const express = require("express");
const cors = require("cors");
const app = express();
const port = 3200;

app.use(express.json());
app.use(cors());

const Menranking = require("./models/cricketInfo");
const MensRanking = require("./models/cricketInfo");
require("./db/conn");

app.get("/", (req, res) => {
  res.send("<h1>Hello, how are you?</h1>");
});

app.get("/getmendata", async (req, res) => {
  try {
    const getmen = await Menranking.find({});
    res.status(200).send(getmen);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/getmendata/:ranking", async (req, res) => {
  const ranking = req.params.ranking;
  try {
    const menData = await Menranking.findOne({ ranking: ranking });
    if (!menData) {
      return res.status(400).send({ error: "Player not found" });
    }
    res.status(201).json(menData);
  } catch (e) {
    console.log(e);
  }
});
// app.post("/menranking", async (req, res) => {
//   try {
//     const addingmenRecord = new Menranking(req.body);
//     const insertData = await addingmenRecord.save();
//     console.log("Created Menranking instance:", insertData);
//     res.status(201).send(insertData);
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });
app.post("/menranking", async (req, res) => {
  try {
    const insertData = await Menranking.create(req.body);
    console.log("Created Menranking instance:", insertData);
    res.status(201).send(insertData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//delete data from backend
app.delete("/mens/:ranking", async (req, res) => {
  const ranking = req.params.ranking;
  try {
    const deletedRecord = await Menranking.findOneAndDelete({ ranking });
    if (!deletedRecord) {
      return res.status(400).send({ error: "Player not found" });
    }
    res.status(200).json(deletedRecord);
  } catch (error) {}
});
app.listen(port, () => {
  console.log(`Server is listening at port number ${port}`);
});
