//import { useState } from 'react';
import '../App.css';
import AddTodoInputbox from '../components/addTodoInputbox';
import TodoList from '../components/todoList';
import CompletedTodoList from '../components/completedTodoList';

function App() {

  return (
    <div>
      <section className="active" >
        <TodoList />
      </section>
      <section className='controls'>
        <AddTodoInputbox />
      </section>
      <section className='completed'>
        <CompletedTodoList />
      </section>
    </div>
  )
}

export default App
