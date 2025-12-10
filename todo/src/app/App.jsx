//import { useState } from 'react';
import '../App.css';
import AddTodoInputbox from '../components/addTodoInputbox';
import TodoList from '../components/todoList';
import CompletedTodoList from '../components/completedTodoList';
import Sidebar from '../components/sidebar';
import { useEffect } from "react";
import { selectIsLogged } from '../selectors/authSelector';
import { selectIsLightMode } from '../selectors/preferencesSelector';
import { useSelector, useDispatch } from "react-redux";
import LoginForm  from '../components/loginForm';
import { checkLogin } from '../thunks/authThunks';

function App() {
  let body = '';
  const isLogged = useSelector(selectIsLogged);
  const isLightMode = useSelector(selectIsLightMode);
  const dispatch = useDispatch();

  //drag and drop prevented by default
  useEffect(() => {
    const prevent = (e) => e.preventDefault();

    window.addEventListener("dragover", prevent);
    window.addEventListener("drop", prevent);

    return () => {
      window.removeEventListener("dragover", prevent);
      window.removeEventListener("drop", prevent);
    };
  }, []);

  useEffect(() => {dispatch(checkLogin())}, [])

  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add("light");
    } else {
      document.body.classList.remove("light");
    }
  }, [isLightMode]);

  if (isLogged) {
    body = (<div className="main-container">
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
            </div>)
  } else {
    body = (<div className="main-container"><LoginForm/></div>)

  }

  return body
}

export default App
