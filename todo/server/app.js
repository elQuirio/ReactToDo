import express from 'express';
import cors from 'cors';
import { readTodos, writeTodos, clearTodos } from './db.js';


const app = express();
app.use(express.json());
app.use(cors({origin: 'http://localhost:5173',methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false,
}));


// GET
app.get("/api/todos", (req, res) => {
  const todos = readTodos();
  res.send(todos);
});

// PATCH
app.patch("/api/todos", (req, res) => {
  const todo = req.body;
  try {
    writeTodos(todo);
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ error: "Error saving todo" })
  }
});


// POST
app.post("/api/todos", (req, res) => {
  const todo = req.body;
  try {
    writeTodos(todo);
    res.status(201).json(todo);
  } catch (err) {
    res.status(500).json({ error: "Error saving todo" })
  }
});


// DELETE
app.delete("/api/todos", (req, res) => {
  //if no status is provided deletes all todos
  const status = req.query.status;
  const todos = clearTodos(status);
  res.status(200).json(todos);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});