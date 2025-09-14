import OpenAI from "openai";
import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import chatRoutes from "./routes/chat.js";

const app = express();
const port = process.env.PORT||8080;

app.use(express.json());
app.use(cors());

app.use("/api", chatRoutes);

app.listen(port, (req, res) => {
  console.log(`Server is running on port ${port}`);
  connectDB();
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONOGODB_URL);
    console.log("Connected with DB");
  } catch (err) {
    console.log("Failed to Connect with DB", err);
  }
};
