//import { useState } from 'react';
import '../App.css';
import AddTodoInputbox from '../components/addTodoInputbox';
import TodoList from '../components/todoList';

function App() {

  return (
    <div>
      <TodoList />
      <AddTodoInputbox />
    </div>
  )
}

export default App
