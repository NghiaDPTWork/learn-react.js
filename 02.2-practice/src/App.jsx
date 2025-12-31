import "./components/practice/todo/todo.css";
import TodoContent from "./components/practice/todo/TodoContent";
import TodoNew from "./components/practice/todo/TodoNew";
import TodoFooter from "./components/practice/todo/TodoFooter";
import reactLogo from "./assets/react.svg";

const App = () => {
  return (
    <div className="todo-container">
      <div className="todo-title">Todo List</div>

      <TodoNew />

      <TodoContent />

      <div className="todo-img">
        <img src={reactLogo} alt="React Logo" />
      </div>

      <TodoFooter />
    </div>
  );
};

export default App;
