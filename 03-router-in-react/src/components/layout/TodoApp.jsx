import { useState } from "react";
import TodoContent from "../common/Content/TodoContent";
import TodoInput from "../common/Content/TodoInput";
import Logo from "../common/Logo/Logo";
import FooterTodo from "./FooterTodo/FooterTodo";
import HeaderTodo from "./HeaderTodo/HeaderTodo";

//
const TodoApp = () => {
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

  return (
    <div className="container">
      <HeaderTodo />
      <TodoInput handleAddTodo={handleAddTodo} />
      <TodoContent todoList={todoList} handleDelete={handleDelete} />
      {todoList.length === 0 && <Logo />}
      <FooterTodo todoList={todoList} />
    </div>
  );
};

export default TodoApp;
