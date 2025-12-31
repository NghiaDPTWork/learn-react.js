import "./components/practice/todo/todo.css";
import TodoContent from "./components/practice/todo/TodoContent";
import TodoNew from "./components/practice/todo/TodoNew";
import TodoFooter from "./components/practice/todo/TodoFooter";
import reactLogo from "./assets/react.svg";

const App = () => {
  const content = "Learn React.js by building projects!";
  // const content1 = "This is some additional data.";
  const age = 18;
  const data = {
    name: "John Doe",
    age: 30,
    city: "New York",
  };

  const addNewTodo = (name, content) => {
    alert(`${name}: ${content}`);
  };
  return (
    // Để dùng được JS code trong JSX thì ta phải có {}

    <div className="todo-container">
      <div className="todo-title">Todo List</div>
      <TodoNew
        addNewTodo={addNewTodo}
        //
      />
      <TodoContent
        /* 
        Ta cần phải hiểu vì sao lại truyền như vậy và truyền để làm gì ?
          Mục đích: Để giao tiếp dữ liệu giữa các Component.
          Giải thích: Trong React, dữ liệu thường chảy một chiều từ trên xuống dưới (từ Cha xuống Con).
          Component cha (nơi chứa đoạn code này) đang nắm giữ dữ liệu.
          Component con (TodoContent) có nhiệm vụ hiển thị dữ liệu đó lên màn hình.
          Hành động "truyền như vậy" chính là việc Cha đưa dữ liệu cho Con để con có nguyên liệu mà xử lý/hiển thị.
        Vì sao có dấu {} bao quanh content ?
          Lý do: Để báo hiệu cho React biết: "Chỗ này là biến JavaScript, không phải văn bản thường".
          Giải thích:
          Trong JSX (ngôn ngữ bạn viết giao diện React), mọi thứ bạn 
          gõ bình thường đều được hiểu là chuỗi văn bản (String) hoặc thẻ HTML.
          Cặp ngoặc nhọn {} giống như một cánh cổng dịch chuyển. 
          Khi trình duyệt đọc đến {...}, nó hiểu rằng phải dừng việc đọc HTML lại và 
          chạy đoạn code JavaScript bên trong.
        Vì sao dùng dấu = mà không phải :
          Lý do: Vì đây là cú pháp của Attributes (Thuộc tính HTML), không phải cú pháp thuộc tính của Object.
          Giải thích:
            JSX mô phỏng lại cách viết của HTML. Trong HTML, khi bạn gán thuộc tính, bạn luôn dùng dấu bằng (ví dụ: <div class="box">).
            Dấu hai chấm : chỉ dùng khi bạn đang khai báo một Object trong JavaScript (ví dụ: const obj = { key: value }).
            Vì dòng code <TodoContent ... /> đang giả lập một thẻ HTML, nên nó phải tuân theo quy tắc dùng dấu = của HTML.
        Liệu content bên ngoài khác gì với content bên trong ?
          content bên trái (bên ngoài, trước dấu =): Là TÊN CÁI NHÃN (Prop Name).
            Đây là cái tên mà Component con (TodoContent) quy định. Nó giống như cái tên dán trên thùng hàng. 
            Bạn không được tự ý đổi tên này nếu bên trong component con đã code sẵn là nhận biến tên content.
          content bên phải (bên trong dấu {}): Là GIÁ TRỊ THỰC TẾ (Variable Value).
            Đây là biến chứa dữ liệu bạn đang có ở component cha. Bạn đặt tên biến này là gì cũng được (myItem, textData...), 
            miễn là bạn truyền đúng biến đó vào trong ngoặc nhọn.
        */
        content={content}
        // content={content1}
        age={age}
        data={data}
      />
      <div className="todo-img">
        <img src={reactLogo} alt="React Logo" />
      </div>
      <TodoFooter />
    </div>
  );
};

export default App;
