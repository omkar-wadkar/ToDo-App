import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
});

const User = mongoose.model("User", userSchema);

const todoSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    priority: String,
    completed: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Todo = mongoose.model("Todo", todoSchema);

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

app.get("/", (req, res) => {
  res.send("<h1>Todo API is running</h1>");
});

app.post("/api/auth/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  await User.create({
    name,
    email,
    password: hashedPassword,
  });

  res.json({ message: "User registered successfully" });
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user)
    return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  res.json({ token });
});

app.post("/api/todos", authMiddleware, async (req, res) => {
  const todo = await Todo.create({
    ...req.body,
    user: req.userId,
  });

  res.status(201).json(todo);
});

app.get("/api/todos", authMiddleware, async (req, res) => {
  const todos = await Todo.find({ user: req.userId }).sort({
    createdAt: -1,
  });

  res.json(todos);
});

app.put("/api/todos/:id", authMiddleware, async (req, res) => {
  const updatedTodo = await Todo.findOneAndUpdate(
    { _id: req.params.id, user: req.userId },
    { $set: req.body },
    { new: true }
  );

  res.json(updatedTodo);
});

app.delete("/api/todos/:id", authMiddleware, async (req, res) => {
  await Todo.findOneAndDelete({
    _id: req.params.id,
    user: req.userId,
  });

  res.json({ message: "Todo deleted successfully" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
