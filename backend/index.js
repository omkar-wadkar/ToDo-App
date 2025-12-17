import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const todoSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    priority: String,
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);

app.post("/api/todos", async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get("/api/todos", async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete("/api/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await Todo.findByIdAndDelete(id);

    res.json({ message: "Todo deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put("/api/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
