const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/votingDB");

// MongoDB schema
const VoterSchema = new mongoose.Schema({
  name: String,
  qrToken: String,
  hasVoted: { type: Boolean, default: false }
});

const Voter = mongoose.model("Voter", VoterSchema);

// QR verification
app.post("/verify-qr", async (req, res) => {
  const voter = await Voter.findOne({ qrToken: req.body.qrToken });

  if (!voter || voter.hasVoted) {
    return res.status(403).json({ message: "Invalid QR or already used" });
  }

  res.json({ verified: true });
});

// Forward vote to Django
app.post("/cast-vote", async (req, res) => {
  const response = await axios.post(
    "http://localhost:8000/api/vote/",
    req.body
  );
  res.json(response.data);
});

app.listen(5000, () => {
  console.log("Express server running on port 5000");
});