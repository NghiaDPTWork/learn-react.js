/*
  Lấy props trong function component
*/
const TodoNew = ({ addNewTodo }) => {
  // addNewTodo("Sample Todo Item", "This is a sample todo item.");
  const handleClick = () => {
    alert("Button Clicked!");
  };

  // const handleOnChange = (event) => {
  //    Mở cái console develope của trình duyệt để xem kết quả
  //   console.log("Input Changed: ", event);
  //    Event ở đâu ra ?
  //    Được React tự động truyền vào hàm xử lý sự kiện (nhận từ HTML)
  //    Thì sẽ thấy Event > Target > value là giá trị hiện tại của input
  //   console.log("Input Changed: ", event.target.value);
  // };

  const handleOnChange = (value) => {
    console.log("Input Changed: ", value);
  };
  return (
    <div>
      <div className="todo-new">
        <input
          type="text"
          placeholder="Add a new task..."
          // Run đi rồi mở console lên xem kết quả
          onChange={() => handleOnChange(event.target.value)}
        />
        <button
          style={{ cursor: "pointer" }}
          /*
              - Tại sao không viết trực tiếp là onClick={handleClick} ?
                => Vẫn đc nhưng nó sẽ không truyền đc tham số cho hàm addNewTodo.
                Ví dụ như hàm addNewTodo cần tham số name và content.
                Vì hàm addNewTodo cần hai tham số (name, content) để hoạt động đúng.
                Nếu viết trực tiếp như vậy, hàm sẽ không có giá trị cho các tham số này khi nút được nhấn.
                Do đó, ta cần một hàm trung gian (ở đây là hàm ẩn danh) để gọi addNewTodo với các giá trị cụ thể.

              - Tại sao không viết là onClick={handleClick()} ?
                Vì viết như vậy sẽ gọi hàm handleClick ngay lập tức khi component được render,
                thay vì khi nút được nhấn. Điều này sẽ không đúng với mục đích của sự kiện onClick.
                Vì vậy, ta sử dụng một hàm ẩn danh để đảm bảo rằng handleClick chỉ được gọi khi nút được nhấn.
            */
          onClick={handleClick}
        >
          Add Todo
        </button>
      </div>
    </div>
  );
};

export default TodoNew;
