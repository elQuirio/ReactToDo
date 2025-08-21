import express from 'express';
import cors from 'cors';
import { db, readTodos, writeTodos } from './db.js';


const app = express();
app.use(express.json());
app.use(cors({origin: 'http://localhost:5173',methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false,
}));


app.get("/api/todos", (req, res) => {
  const todos = readTodos();
  res.send(todos);
});

app.post("/api/todos", (req, res) => {
  const todo = req.body;
  try {
    writeTodos(todo);
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ error: "Error saving todo" })
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});