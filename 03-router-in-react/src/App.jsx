import { useState } from "react";
import TodoInput from "./components/Content/TodoInput";
import Footer from "./components/layout/Footer/Footer";
import Header from "./components/layout/Header/Header";
import Logo from "./components/Logo/Logo";
import TodoContent from "./components/Content/TodoContent";
import HeaderTodo from "./components/layout/HeaderTodo/HeaderTodo";
import FooterTodo from "./components/layout/FooterTodo/FooterTodo";
import { Outlet } from "react-router-dom";

function App() {
  const [todoList, setTodoList] = useState([]);

  // Hàm add - mà add thì cần id và name
  const handleAddTodo = (name) => {
    if (!name || name.trim() === "") {
      alert("Please enter a todo!");
      return;
    }
    const newTodo = {
      id: randomIntValue(1, 9999),
      name: name,
    };
    alert(`New to-do : ${name} has been added!`);
    setTodoList([...todoList, newTodo]);
  };

  const randomIntValue = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  // Hàm delete
  const handleDelete = (id) => {
    const newTodoList = todoList.filter((item) => item.id !== id);
    setTodoList(newTodoList);
  };

  // Hàm edit

  return (
    <>
      <Header />
      {/*
         Ta định nghĩa Outlet ở đây nha
         Dùng để định nghĩa vị trí render content của con
       */}
      <Outlet />

      <div className="container">
        <HeaderTodo />
        <TodoInput handleAddTodo={handleAddTodo} />
        <TodoContent todoList={todoList} handleDelete={handleDelete} />
        {todoList.length === 0 && <Logo />}
        <FooterTodo todoList={todoList} />
      </div>

      <Footer />
    </>
  );
}

export default App;
