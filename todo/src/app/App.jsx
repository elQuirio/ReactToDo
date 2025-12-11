//import { useState } from 'react';
import '../App.css';
import AddTodoInputbox from '../components/addTodoInputbox';
import TodoList from '../components/todoList';
import CompletedTodoList from '../components/completedTodoList';
import Sidebar from '../components/sidebar';
import { useEffect, useState } from "react";
import { selectIsLogged, selectloginUserPending } from '../selectors/authSelector';
import { selectIsLightMode } from '../selectors/preferencesSelector';
import { useSelector, useDispatch } from "react-redux";
import LoginForm  from '../components/loginForm';
import { checkLogin } from '../thunks/authThunks';

function App() {
  let body = '';
  const [showLoader, setShowLoader] = useState(true);
  const isLogged = useSelector(selectIsLogged);
  const isLightMode = useSelector(selectIsLightMode);
  const isLoginUserLoading = useSelector(selectloginUserPending);
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

  useEffect(() => {dispatch(checkLogin())}, [dispatch]);
  
  useEffect(() => {
    if (isLightMode === false) {
      document.body.classList.remove("light");
      localStorage.setItem('isLightMode', 'false');
    } else {
      document.body.classList.add("light");
      localStorage.setItem('isLightMode', 'true');
    }
  }, [isLightMode]);

  useEffect(() => {
    const t = setTimeout(() => {
      setShowLoader(false);
    }, 200);
    return () => clearTimeout(t);
  }, []);

  if (isLoginUserLoading || showLoader) {
    body = (<div className='loader-container'><div className='spinner'></div></div>)
  } else if (isLogged) {
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
