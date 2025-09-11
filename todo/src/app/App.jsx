//import { useState } from 'react';
import '../App.css';
import AddTodoInputbox from '../components/addTodoInputbox';
import TodoList from '../components/todoList';
import CompletedTodoList from '../components/completedTodoList';
import Sidebar from '../components/sidebar';

function App() {

  return (
    <div className="main-container">
      <aside>
        <Sidebar/>
      </aside>
      <main className='todo-content'>
        <div className='todo-content-inner'>
          <section className="active" >
            <TodoList />
          </section>
          <section className='controls'>
            <AddTodoInputbox />
          </section>
          <section className='done'>
            <CompletedTodoList />
          </section>
        </div>
      </main>
    </div>
  )
}

export default App
