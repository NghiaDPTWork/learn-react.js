import "./components/practice/todo/todo.css";
import TodoContent from "./components/practice/todo/TodoContent";
import TodoNew from "./components/practice/todo/TodoNew";
import TodoFooter from "./components/practice/todo/TodoFooter";
import reactLogo from "./assets/react.svg";
import { useState } from "react";

const App = () => {
  const [todoList, setTodoList] = useState([
    { id: 1, name: "Learning React Design Pattern" },
    { id: 2, name: "Taking a walk" },
    { id: 3, name: "Cooking dinner" },
    { id: 4, name: "Meditation" },
  ]);

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
    // Không nên viết như sau
    // todoList.push(newTodo);
    // setTodoList(todoList);
    // Vì làm như vậy là mình trực tiếp
    // thay đổi giá trị của state cũ
    // React sẽ không nhận biết được sự
    // thay đổi này và không re-render UI
  };

  return (
    <div className="todo-container">
      <div className="todo-title">Todo List</div>
      <TodoNew addNewTodo={addNewTodo} />
      <TodoContent todoList={todoList} />
      <div className="todo-logo">
        <img src={reactLogo} alt="React Logo" />
      </div>
      <TodoFooter />
    </div>
  );
};

export default App;
