import express from "express";
import Thread from "../models/Thread.js";
import getGeminiAIAPIResponse from "../utils/geminiai.js";

const router = express.Router();

//test
router.post("/test", async (req, res) => {
  try {
    const thread = new Thread({
      threadId: "abc",
      title: "testing new thread 2",
    });

    const response = await thread.save();
    res.send(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to save in DB" });
  }
});

//get all threads
router.get("/thread", async (req, res) => {
  try {
    const threads = await Thread.find({}).sort({ updatedAt: -1 });
    //descending order of updatedAt..most recent one on top
    res.json(threads);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "failed to fetch threads" });
  }
});

//particular thread
router.get("/thread/:threadId", async (req, res) => {
  let { threadId } = req.params;
  try {
    const thread = await Thread.findOne({ threadId });
    if (!thread) {
      res.status(404).json({ error: "Thread is not found" });
    }
    res.json(thread.messages);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "failed to fetch chat" });
  }
});

//delete thread
router.delete("/thread/:threadId", async (req, res) => {
  let { threadId } = req.params;
  try {
    const deletedThread = await Thread.findOneAndDelete({ threadId });
    if (!deletedThread) {
      res.status(404).json({ error: "Thread could not be deleted" });
    }
    res.status(200).json({ success: "Thread deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "failed to fetch chat" });
  }
});

//chat route
router.post("/chat", async (req, res) => {
  let { threadId, message } = req.body;
  if (!threadId || !message) {
    res.status(400).json({ error: "missing required fileds" });
  }
  try {
    let thread = await Thread.findOne({ threadId });
    if (!thread) {
      //create new thread in db
      thread = new Thread({
        threadId,
        title: message,
        messages: [{ role: "user", content: message }],
      });
    } else {
      thread.messages.push({ role: "user", content: message });
    }

    const assistantReply = await getGeminiAIAPIResponse(message);
    thread.messages.push({ role: "model", content: assistantReply });
    thread.updatedAt = new Date();
    await thread.save();
    res.json({ reply: assistantReply });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
