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

  // Hàm add
  const addNewTodo = (name) => {
    const newTodo = {
      id: randomIntFromInterval(todoList.length, 1000),
      name: `${name}`,
    };
    alert("New Todo Added: " + name);
    // Kỹ thuật Rest Operator
    setTodoList([...todoList, newTodo]);
  };

  // Hàm Delete
  /*
      Mô tả hướng làm của hàm ha:
      1. Là khi người bấm vào nút Delete -> Thì ta sẽ phải biết được
         cái id của thằng todo cần xóa
        -> Để biết khi nào người dùng bấm vào nút Delete
            thì phải lắng nghe sự kiện onClick trên nút Delete
        -> Khi người dùng bấm vào nút Delete thì ta sẽ gọi hàm
              truyền vào id của thằng todo cần xóa
          => Viết hàm này trong Component nha
      2. Dựa vào id đó, ta sẽ lọc ra những thằng không có id trùng với
         id cần xóa
        => Viết hàm lọc trong App.jsx nha
      3. Cuối cùng ta sẽ set lại state todoList với mảng đã lọc ở bước 2
        => Viết trong App.jsx luôn nha 
        (vì state todoList nằm trong App.jsx)
  */
  const handleDelete = (id) => {
    const filteredTodoList = todoList.filter((item) => item.id !== id);
    setTodoList(filteredTodoList);
  };

  return (
    <div className="todo-container">
      <div className="todo-title">Todo List</div>

      <TodoNew addNewTodo={addNewTodo} />

      {todoList.length === 0 ? (
        <div className="todo-logo">
          <img src={reactLogo} alt="React Logo" />
        </div>
      ) : (
        <TodoContent handleDelete={handleDelete} todoList={todoList} />
      )}

      <TodoFooter todoList={todoList} />
    </div>
  );
};

export default App;
