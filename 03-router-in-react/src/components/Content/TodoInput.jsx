import { useState } from "react";
import "./TodoInput.css";

const TodoInput = ({ handleAddTodo }) => {
  /*

    Giờ muốn add được thì
    1. Nghe sự kiện cái nút
    2. Lấy giá trị trong ô input
    3. Gọi hàm handleAddTodo và truyền giá trị input vào

  */
  const [inputValue, setInputValue] = useState("");

  const handleClick = () => {
    console.log(inputValue);
    handleAddTodo(inputValue);
    setInputValue("");
  };

  const handleChange = (value) => {
    console.log(value);
    setInputValue(value);
  };

  return (
    <div className="todo-input-container">
      <div className="todo-input-wrapper">
        <input
          type="text"
          placeholder="Enter todo..."
          value={inputValue}
          onChange={(event) => handleChange(event.target.value)}
        />
        <button onClick={handleClick}>Add</button>
      </div>
    </div>
  );
};

export default TodoInput;
