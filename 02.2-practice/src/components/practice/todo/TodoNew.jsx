import { useState } from "react";

const TodoNew = ({ addNewTodo }) => {
  /* 
      State : Trạng thái (Data)
      Được sử dụng để lưu trữ data tạm thời trong component
      Khi state thay đổi => UI sẽ tự động re-render
      useSate hook
      Kỹ thuật destrucuring array
      Cú pháp: const [tên_state, hàm_cập_nhật_state] = useState(giá_trị_ban_đầu);
  */
  const [valueInput, setValueInput] = useState("Initial Value");

  // fire : Khai hỏa (Trigger)
  const handleClick = () => {
    addNewTodo("Todo Item", valueInput);
  };

  // Mình đã lấy được ô input
  const handleOnChange = (value) => {
    setValueInput(value);
  };

  return (
    <div>
      <div className="todo-new">
        <input
          type="text"
          placeholder="Add a new task..."
          onChange={() => handleOnChange(event.target.value)}
        />
        <button style={{ cursor: "pointer" }} onClick={handleClick}>
          Add Todo
        </button>
      </div>
      <div style={{ color: "black" }}>My text input = {valueInput}</div>
    </div>
  );
};

export default TodoNew;
