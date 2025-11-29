import express from 'express';
import cors from 'cors';
import bcrypt from "bcrypt";

import { readTodos, writeTodo, clearTodos, getNewPosition, sortTodos, getMaxUserId, getPreferencesByUserID, patchPreferencesByUserId, manualResortTodos, getUserByEmail, saveNewUser, getUserByUserId } from './db.js';


const app = express();
app.use(express.json());
app.use(cors({origin: 'http://localhost:5173',methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

///////////////////////////////////////// TODOS ///////////////////////////////////////////

// GET
app.get("/api/todos", (req, res) => {
  const todos = readTodos();
  return res.status(200).send(todos);
});

// PATCH
app.patch("/api/todos", (req, res) => {
  const sortDirection = req.body.sortDirection;
  const sortBy = req.body.sortBy;
  if (sortDirection || sortBy) {
    if (sortDirection != 'asc' && sortDirection != 'desc') {
      return res.status(400).json({error: "Sort direction must be 'asc' or 'desc'"});
    }
    try {
      const todos = sortTodos(sortDirection, sortBy);
      return res.status(200).send(todos);
    } catch (err) {
      return res.status(500).json({error: "Error sorting json"})
    }
  } 
  else {
    const todo = req.body;
    try {
      writeTodo(todo);
      return res.status(200).json(todo);
    } 
    catch (err) {
      return res.status(500).json({ error: "Error saving todo" })
    }
  }
});


app.patch("/api/todos/reorder", (req, res) => {
  try{
    const { fromId, toId } = req.body;
    const sortedTodos = manualResortTodos(fromId, toId);
    return res.status(200).json(sortedTodos);
  } catch (e) {
    return res.status(500).json({error: "Error sorting todos"});
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
    updatedTodos.forEach((t) => writeTodo(t));
    return res.status(200).json(readTodos());
  } catch (err) {
    return res.status(500).json({ error: "Error saving todo" })
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
    updatedTodos.forEach((t) => writeTodo(t));
    return res.status(200).json(readTodos());
  } catch {
    return res.status(500).json({error: "Error saving todo"});
  }
});


// POST
app.post("/api/todos", (req, res) => {
  const todo = req.body;
  todo.position = getNewPosition();
  try {
    writeTodo(todo);
    return res.status(201).json(todo);
  } catch (err) {
    return res.status(500).json({ error: "Error saving todo" })
  }
});


// DELETE
app.delete("/api/todos", (req, res) => {
  //if no status is provided deletes all todos
  const status = req.query.status;
  const todos = clearTodos(status);
  return res.status(200).json(todos);
});



///////////////////////////////////////// PREFERENCES ///////////////////////////////////////////

// middleware per gestire id nei cookie
import cookieParser from "cookie-parser";

// passare a id uuid
app.use(cookieParser());
app.use(express.json());


// aggiungere try/catch
app.patch('/api/preferences', (req, res) => {
  const preferences = patchPreferencesByUserId(req.cookies.userId, req.body);
  return res.json(preferences);
});

app.get('/api/preferences', (req, res) => {
  const userId = req.cookies.userId;
  if (!userId) {
    return res.status(401).json({error: 'Not authenticated'});
  } else {
    const preferences = getPreferencesByUserID(userId);
    return res.json(preferences);
  } 
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});




///////////////////////////////////////// LOGIN / REGISTRATION ///////////////////////////////////////////

app.post('/api/auth/register', async (req, res) => {
  const {email, password, confirmPassword} = req.body;
  
  if (!email || !password || !confirmPassword) {
    return res.status(400).json({error: "Missing user, password or confirmPassword!"});
  }
  if (password !== confirmPassword) {
    return res.status(400).json({error: "Password does not matches confirmPassword!"});
  }
  
  const userExists = getUserByEmail(email);
  
  if (userExists) {
    console.log("User exists");
    return res.status(409).json({error: "Email already registered!"});
  }

  const hashedPwd = await bcrypt.hash(password, 10);
  const userId = crypto.randomUUID();
  const savedUser = saveNewUser({email, password: hashedPwd, userId: userId});

  if (savedUser) {
    return res.cookie("userId", userId, { httpOnly: true, sameSite: "Lax", secure: false, maxAge: 365*24*60*60*1000 }).status(201).json({savedUser});
  } else {
    return res.status(500).json({error: "Internal error saving user!"});
  }
});


app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({error: "User or password missing!"});
    }

    const existingUser = getUserByEmail(email);

    if (existingUser) {
      const isMatch = await bcrypt.compare(password, existingUser.password);
      return isMatch ? res.cookie("userId", existingUser.userId, { httpOnly: true, sameSite: "Lax", secure: false, maxAge: 365*24*60*60*1000 }).status(200).json({email: email}) : res.status(401).json({error: "Password is wrong"});
    } else {
      return res.status(404).json({error:"User does not exists!"});
    }
  } catch(e) {
    return res.status(500).json({error: "Internal server error!"});
  }
});


app.get('/api/auth/checkAuth', (req, res) => {
  const userId = req.cookies.userId;
  
  if (!userId) {
    return res.status(200).json({isLogged: false});
  }

  const userData = getUserByUserId(userId);

  if(!userData) {
    return res.status(200).json({isLogged: false});
  }

  return res.status(200).json({isLogged: true, userId: userId, email: userData.email });
});