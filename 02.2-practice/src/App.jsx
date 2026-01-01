import "./components/practice/todo/todo.css";
import TodoContent from "./components/practice/todo/TodoContent";
import TodoNew from "./components/practice/todo/TodoNew";
import TodoFooter from "./components/practice/todo/TodoFooter";
import reactLogo from "./assets/react.svg";
import { useState } from "react";

const App = () => {
  const [todoList, setTodoList] = useState([]);

  // Hàm này chưa thực sự tối ưu
  const randomIntFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const addNewTodo = (name) => {
    const newTodo = {
      id: randomIntFromInterval(todoList.length, 1000),
      name: `${name}`,
    };
    alert("New Todo Added: " + name);
    // Kỹ thuật Rest Operator
    setTodoList([...todoList, newTodo]);
  };

  return (
    <div className="todo-container">
      <div className="todo-title">Todo List</div>
      <TodoNew addNewTodo={addNewTodo} />

      {/* Cách 1 */}

      {/* {todoList.length === 0 && (
        <div className="todo-logo">
          <img src={reactLogo} alt="React Logo" />
        </div>
      )}

      <TodoContent todoList={todoList} /> */}

      {/* Cách 2 */}
      {todoList.length === 0 ? (
        <div className="todo-logo">
          <img src={reactLogo} alt="React Logo" />
        </div>
      ) : (
        <TodoContent todoList={todoList} />
      )}

      <TodoFooter />
    </div>
  );
};

export default App;
