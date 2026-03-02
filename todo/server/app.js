import express from 'express';
import cors from 'cors';
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import { clearCookies } from './utils/helpers.js';

import { readTodos, writeTodo, clearTodos, getNewPosition, sortTodos, getMaxUserId, getPreferencesByUserID, patchPreferencesByUserId, manualResortTodos, getUserByEmail, saveNewUser, registerNewUser, getUserByUserId, writeGetSortedTodos, getTodosByUserId, markAllTodosStatusByUserId } from './db.js';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: 'http://localhost:5173', methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
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
    return clearCookies(res).status(409).json({data: {isLogged:false}, message: "Email already registered!"});
  }

  const hashedPwd = await bcrypt.hash(password, 10);
  const userId = crypto.randomUUID();
  //const savedUser = saveNewUser({email, password: hashedPwd, userId: userId});

  const savedUser = registerNewUser({email, password: hashedPwd, userId: userId});

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
    return clearCookies(res).status(401).json({message: "User not authenticated!"});
  }
  const user = getUserByUserId(userId);
  if (!user) {
    return clearCookies(res).status(401).json({message: "User not authenticated!"});
  }
  req.user = user;
  next();
};

app.use('/api/todos', requireAuth);
app.use('/api/preferences', requireAuth);

///////////////////////////////////////// TODOS ///////////////////////////////////////////

// GET
app.get("/api/todos", (req, res) => {
  const userId = req.user.userId; // posso fare una funzione getter
  const userTodos = getTodosByUserId(userId);
  return res.status(200).send({data: userTodos});
});

// PATCH
app.patch("/api/todos/resort", (req, res) => {
  console.log('resorting');
  const sortDirection = req.body.sortDirection;
  const sortBy = req.body.sortBy;
  const userId = req.user.userId;

  if (!sortDirection || !sortBy) {
    return res.status(400).json({message: "Missing sorting criteria"});
  }
  try {
    const todos = sortTodos(sortDirection, sortBy, userId);
    return res.status(200).send({data: todos});

  } catch (err) {
      console.log(err);
      return res.status(500).json({message: err ?? "Error sorting todos"})
    }
});

// PATCH
app.patch("/api/todos/reorder", (req, res) => {
  const userId = req.user.userId;
  const { fromId, toId } = req.body;
  if (!fromId || !toId) {
    return res.status(400).json({message: 'Missing from/to id'});
  }

  try{
    const sortedTodos = manualResortTodos(fromId, toId, userId);
    return res.status(200).json({data: sortedTodos});
  } catch (err) {
    return res.status(500).json({message: "Error reordering todos"});
  }
});


//PATCH
app.patch("/api/todos/mark-all/:status", (req, res) => {
  const { status } = req.params;
  const userId = req.user.userId;

  if (!status) {
    return res.status(400).json({message: "Missing status"});
  }
  try {
    const updatedTodos = markAllTodosStatusByUserId(userId, status);
    return res.status(200).json({data: updatedTodos});

  } catch (err) {
    console.log(err);
    return res.status(500).json({message: "Error saving todo"});
  }
});


// POST
app.post("/api/todos", (req, res) => {
  const userId = req.user.userId;
  const todo = { userId, ...req.body};
  todo.position = getNewPosition(userId);
  try {
    const todos = writeGetSortedTodos(todo, userId);
    return res.status(201).json({data: todos});
  } catch (err) {
    console.log(err);
    return res.status(500).json({message: "Error saving todo"});
  }
});


// DELETE
app.delete("/api/todos", (req, res) => {
  const userId = req.user.userId;
  const status = req.query.status;
  if (!status) {
    return res.status(400).json({message: "Missing status"})
  }
  try {
    const todos = clearTodos(userId, status);
    return res.status(200).json({data: todos});
  } catch (err) {
    console.log(err);
    return res.status(500).json({message: "Error clearing todos"});
  }
});

// PATCH
app.patch("/api/todos/:id", (req, res) => {
  const userId = req.user.userId;
  const todoId = req.params.id;
  const todo = {userId, ...req.body, id: todoId};
  
  if (!todoId) return res.status(400).json({message: 'Missing todo Id'});
  try {
    const todos = writeGetSortedTodos(todo, userId);
    return res.status(200).json({data: todos});
  }
  catch (err) {
    console.log(err);
    return res.status(500).json({message: "Error saving todo"});
  }
});


///////////////////////////////////////// PREFERENCES ///////////////////////////////////////////

// aggiungere try/catch
app.patch('/api/preferences', (req, res) => {
  try {
    const userId = req.user.userId;
    const preferences = patchPreferencesByUserId(userId, req.body);
    return res.json({data: preferences});
  } catch(err) {
    return res.status(500).json({message: "Error saving preferences"});
  }
});

app.get('/api/preferences', (req, res) => {
  try {
    const userId = req.user.userId;
    const preferences = getPreferencesByUserID(userId);
    return res.json({data: preferences});
  } catch (err) {
    return res.status(500).json({message: 'Error fetching preferences'});
  }
});


app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

