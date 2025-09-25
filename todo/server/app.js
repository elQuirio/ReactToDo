import express from 'express';
import cors from 'cors';
import { readTodos, writeTodos, clearTodos, getNewPosition, sortTodos } from './db.js';


const app = express();
app.use(express.json());
app.use(cors({origin: 'http://localhost:5173',methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false,
}));


// GET
app.get("/api/todos", (req, res) => {
  const todos = readTodos();
  res.status(200).send(todos);
});

// PATCH
app.patch("/api/todos", (req, res) => {
  const direction = req.query.sortDirection;
  if (direction) {
    if (direction != 'asc' && direction != 'desc') {
      return res.status(400).json({error: "Sort direction must be 'asc' or 'desc'"});
    }
    try {
      const todos = sortTodos(direction);
      return res.status(200).send(todos);
    } catch (err) {
      return res.status(500).json({error: "Error sorting json"})
    }
  } 
  else { 
    const todo = req.body;
    try {
      writeTodos(todo);
      return res.status(200).json(todo);
    } 
    catch (err) {
      return res.status(500).json({ error: "Error saving todo" })
    }
  }
});



//capire se possibile accorpare e semplificare
app.patch("/api/todos/mark-all-as-completed", (req, res) => {
  const todos = readTodos();
  const updatedTodos = todos.map((t) => {
    if (t.status !== 'completed') {
      return { ...t, status: 'completed', updatedAt: Date.now() };
    } else {
      return t;
    }
  });

  try {
    updatedTodos.forEach((t) => writeTodos(t));
    res.status(200).json(readTodos());
  } catch (err) {
    res.status(500).json({ error: "Error saving todo" })
  }
});

app.patch("/api/todos/mark-all-as-active", (req, res) => {
  const todos = readTodos();
  const updatedTodos = todos.map(t => {
    if (t.status !== "active") {
      return {...t, status: 'active', updatedAt: Date.now()}
    } else {
      return t;
    }
  });
  try {
    updatedTodos.forEach((t) => writeTodos(t));
    res.status(200).json(readTodos());
  } catch {
    res.status(500).json({error: "Error saving todo"});
  }
});


// POST
app.post("/api/todos", (req, res) => {
  const todo = req.body;
  todo.position = getNewPosition();
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