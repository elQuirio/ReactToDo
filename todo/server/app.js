import express from 'express';
import cors from 'cors';
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import { clearCookies } from './utils/helpers.js';

import { readTodos, writeTodo, clearTodos, getNewPosition, sortTodos, getMaxUserId, getPreferencesByUserID, patchPreferencesByUserId, manualResortTodos, getUserByEmail, saveNewUser, getUserByUserId } from './db.js';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: 'http://localhost:5173',methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

///////////////////////////////////////// LOGIN / REGISTRATION ///////////////////////////////////////////

app.post('/api/auth/register', async (req, res) => {
  const {email, password, confirmPassword} = req.body;
  
  if (!email || !password || !confirmPassword) {
    return clearCookies(res).status(400).json({data: {isLogged:false}, message: "Missing user, password or confirmPassword!"});
  }
  if (password !== confirmPassword) {
    return clearCookies(res).status(400).json({data: {isLogged:false}, message: "Password does not matches confirmPassword!"});
  }
  
  const userExists = getUserByEmail(email);
  
  if (userExists) {
    console.log("User exists");
    return clearCookies(res).status(409).json({data: {isLogged:false}, message: "Email already registered!"});
  }

  const hashedPwd = await bcrypt.hash(password, 10);
  const userId = crypto.randomUUID();
  const savedUser = saveNewUser({email, password: hashedPwd, userId: userId});

  if (savedUser) {
    return res.cookie("userId", userId, { httpOnly: true, sameSite: "Lax", secure: false, maxAge: 365*24*60*60*1000 }).status(201).json({data: savedUser});
  } else {
    return clearCookies(res).status(500).json({data: {isLogged:false}, message: "Internal error saving user!"});
  }
});


app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return clearCookies(res).status(400).json({message: "User or password missing!"});
    }

    const existingUser = getUserByEmail(email);

    if (existingUser) {
      const isMatch = await bcrypt.compare(password, existingUser.password);
      return isMatch ? res.cookie("userId", existingUser.userId, { httpOnly: true, sameSite: "Lax", secure: false, maxAge: 365*24*60*60*1000 }).status(200).json({data: {isLogged: true, email: email}}) : clearCookies(res).status(401).json({data:{isLogged: false}, message: "Password is wrong"});
    } else {
      return clearCookies(res).status(404).json({data:{isLogged: false}, message: "User does not exists!"});
    }
  } catch(e) {
    return clearCookies(res).status(500).json({data:{isLogged:false}, message: "Internal server error!"});
  }
});


app.get('/api/auth/checkAuth', (req, res) => {
  const userId = req.cookies.userId;
  
  if (!userId) {
    return clearCookies(res).status(200).json({data: {isLogged: false}, message: "Missing user id!"});
  }

  const userData = getUserByUserId(userId);

  if(!userData) {
    return clearCookies(res).status(200).json({data: { isLogged: false}, message: "User not found!"});
  }

  return res.status(200).json({data: {isLogged: true, userId: userId, email: userData.email}});
});


app.post('/api/auth/logout', (req,res) => {
  return clearCookies(res).status(200).json({data:{isLogged:false}, message: 'User logged out'});
});


/////////////////////////////////////// MIDDLEWARE ////////////////////////////////////////

function requireAuth(req, res, next) {
  const userId = req.cookies.userId;
  if (!userId) {
    return clearCookies(res).status(401).json({message: "User not authenticated!"})
  }
  const user = getUserByUserId(userId);
  if (!user) {
    return clearCookies(res).status(401).json({message: "User not authenticated!"});
  }
  req.user = user;
  next()
};

app.use('/api/todos', requireAuth);
app.use('/api/preferences', requireAuth);

///////////////////////////////////////// TODOS ///////////////////////////////////////////

// GET
app.get("/api/todos", (req, res) => {
  const userId = req.user.userId; // posso fare una funzione getter
  const todos = readTodos(userId);
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
    const userId = req.user.userId;
    const todo = {userId, ...req.body};
    try {
      writeTodo(todo); //capire se posso passare userId come parametro senza dover ricostruire il todo
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
  const userId = req.user.userId;
  const todo = { userId, ...req.body};
  todo.position = getNewPosition(userId); //modificare con logica per user id
  try {
    writeTodo(todo);
    return res.status(201).json(todo);
  } catch (err) {
    return res.status(500).json({ error: "Error saving todo" })
  }
});


// DELETE
app.delete("/api/todos", (req, res) => {
  const status = req.query.status;
  const todos = clearTodos(status);
  return res.status(200).json(todos);
});



///////////////////////////////////////// PREFERENCES ///////////////////////////////////////////

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

