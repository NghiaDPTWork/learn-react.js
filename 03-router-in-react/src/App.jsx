import { useState } from "react";
import TodoInput from "./components/Content/TodoInput";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Logo from "./components/Logo/Logo";
import TodoContent from "./components/Content/TodoContent";

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
      <div className="container">
        <Header />

        <TodoInput handleAddTodo={handleAddTodo} />
        <TodoContent todoList={todoList} handleDelete={handleDelete} />

        {todoList.length === 0 && <Logo />}

        <Footer todoList={todoList} />
      </div>
    </>
  );
}

export default App;
