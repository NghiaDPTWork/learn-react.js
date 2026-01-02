# 📝 Todo App - Documentation Chi Tiết

## 📋 Mục Lục

1. [Tổng Quan Dự Án](#tổng-quan-dự-án)
2. [Cấu Trúc Thư Mục](#cấu-trúc-thư-mục)
3. [Kiến Trúc Ứng Dụng](#kiến-trúc-ứng-dụng)
4. [Flow Hoạt Động Chi Tiết](#flow-hoạt-động-chi-tiết)
5. [Hướng Dẫn Từng Component](#hướng-dẫn-từng-component)
6. [State Management](#state-management)
7. [Styling Guide](#styling-guide)
8. [Các Tính Năng Chính](#các-tính-năng-chính)

---

## Tổng Quan Dự Án

### Giới Thiệu

Todo App là một ứng dụng quản lý công việc đơn giản được xây dựng bằng React. Ứng dụng cho phép người dùng:

- ✅ Thêm công việc mới
- ❌ Xóa công việc
- 📊 Xem số lượng công việc còn lại
- 🖼️ Hiển thị logo khi danh sách trống

### Công Nghệ Sử Dụng

- **React 18+** - Library chính
- **Vite** - Build tool
- **CSS** - Styling thuần túy (không dùng framework)
- **PropTypes** - Type checking cho props

---

## Cấu Trúc Thư Mục

```
02.3-todopractice/
├── src/
│   ├── components/
│   │   ├── Header/
│   │   │   ├── Header.jsx
│   │   │   └── Header.css
│   │   ├── Content/
│   │   │   ├── TodoInput.jsx
│   │   │   ├── TodoInput.css
│   │   │   ├── TodoContent.jsx
│   │   │   └── TodoContent.css
│   │   ├── Footer/
│   │   │   ├── Footer.jsx
│   │   │   └── Footer.css
│   │   └── Logo/
│   │       ├── Logo.jsx
│   │       └── Logo.css
│   ├── assets/
│   │   └── logo.jpg
│   ├── App.jsx          # Component chính
│   ├── index.css        # Global styles
│   ├── main.jsx         # Entry point
│   └── docs.md          # File này
```

### Nguyên Tắc Tổ Chức

- **Component-based**: Mỗi component có folder riêng
- **Co-location**: CSS đặt cùng với component
- **Single Responsibility**: Mỗi component chỉ làm 1 nhiệm vụ

---

## Kiến Trúc Ứng Dụng

### Sơ Đồ Component Tree

```
App (Root)
├── Container
│   ├── Header
│   ├── TodoInput
│   ├── TodoContent
│   │   └── TodoItem (multiple)
│   ├── Logo (conditional)
│   └── Footer
```

### Data Flow (Luồng Dữ Liệu)

```
┌─────────────────────────────────────────────┐
│           App Component (State)              │
│  - todoList: []                             │
│  - handleAddTodo()                          │
│  - handleDelete()                           │
└────────┬──────────────────────┬─────────────┘
         │                      │
         ▼                      ▼
┌────────────────┐    ┌──────────────────┐
│  TodoInput     │    │  TodoContent     │
│  (nhận props)  │    │  (nhận props)    │
└────────────────┘    └──────────────────┘
```

---

## Flow Hoạt Động Chi Tiết

### 1️⃣ Khởi Động Ứng Dụng

**Entry Point: `main.jsx`**

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

**Giải thích:**

- `ReactDOM.createRoot()` tạo root để render React
- `StrictMode` bật chế độ kiểm tra nghiêm ngặt trong development
- Import `index.css` để load global styles

---

### 2️⃣ Component Chính: `App.jsx`

**Code đầy đủ với giải thích:**

```javascript
import { useState } from "react";
import TodoInput from "./components/Content/TodoInput";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Logo from "./components/Logo/Logo";
import TodoContent from "./components/Content/TodoContent";

function App() {
  // 📌 STATE: Lưu trữ danh sách todo
  const [todoList, setTodoList] = useState([]);

  /* 
    todoList có cấu trúc:
    [
      { id: 1234, name: "Học React" },
      { id: 5678, name: "Làm bài tập" }
    ]
  */

  // 📌 FUNCTION 1: Thêm todo mới
  const handleAddTodo = (name) => {
    // Validation: Kiểm tra input có rỗng không
    if (!name || name.trim() === "") {
      alert("Please enter a todo!");
      return; // Dừng hàm nếu input rỗng
    }

    // Tạo object todo mới
    const newTodo = {
      id: randomIntValue(1, 9999), // Random ID
      name: name, // Tên todo
    };

    // Hiển thị thông báo
    alert(`New to-do : ${name} has been added!`);

    // Cập nhật state: Thêm todo mới vào cuối mảng
    setTodoList([...todoList, newTodo]);
    // ...todoList: Spread operator - giữ nguyên các phần tử cũ
    // newTodo: Thêm phần tử mới
  };

  // 📌 HELPER FUNCTION: Tạo số ngẫu nhiên
  const randomIntValue = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  // 📌 FUNCTION 2: Xóa todo
  const handleDelete = (id) => {
    // Filter: Giữ lại tất cả items NGOẠI TRỪ item có id trùng khớp
    const newTodoList = todoList.filter((item) => item.id !== id);

    // Cập nhật state với danh sách mới
    setTodoList(newTodoList);
  };

  // 📌 JSX: Render UI
  return (
    <>
      <div className="container">
        {/* Header: Tiêu đề ứng dụng */}
        <Header />

        {/* TodoInput: Form nhập todo */}
        <TodoInput handleAddTodo={handleAddTodo} />

        {/* TodoContent: Hiển thị danh sách todo */}
        <TodoContent todoList={todoList} handleDelete={handleDelete} />

        {/* Logo: Chỉ hiển thị khi todoList rỗng */}
        {todoList.length === 0 && <Logo />}

        {/* Footer: Hiển thị số lượng todo */}
        <Footer todoList={todoList} />
      </div>
    </>
  );
}

export default App;
```

**Các khái niệm quan trọng:**

1. **State (`useState`)**

   - Lưu trữ data có thể thay đổi
   - Khi state thay đổi → Component re-render

2. **Props Drilling**

   - Truyền dữ liệu từ parent → child
   - `handleAddTodo` truyền cho `TodoInput`
   - `todoList` và `handleDelete` truyền cho `TodoContent`

3. **Conditional Rendering**
   - `{todoList.length === 0 && <Logo />}`
   - Chỉ render Logo khi điều kiện đúng

---

### 3️⃣ TodoInput Component - Nhập Dữ Liệu

**File: `components/Content/TodoInput.jsx`**

```javascript
import { useState } from "react";
import "./TodoInput.css";

const TodoInput = ({ handleAddTodo }) => {
  // 📌 LOCAL STATE: Lưu giá trị input
  const [inputValue, setInputValue] = useState("");

  /* 
    LÝ DO dùng local state:
    - Input cần cập nhật real-time khi user gõ
    - Chỉ gửi lên App khi user click Add
    - Đây là "Controlled Component" pattern
  */

  // 📌 HANDLER 1: Khi click nút Add
  const handleClick = () => {
    console.log("Adding:", inputValue);

    // Gọi function từ App (qua props)
    handleAddTodo(inputValue);

    // Reset input về rỗng
    setInputValue("");
  };

  // 📌 HANDLER 2: Khi input thay đổi
  const handleChange = (value) => {
    console.log("Input changed:", value);

    // Cập nhật state với giá trị mới
    setInputValue(value);
  };

  return (
    <div className="todo-input-container">
      <div className="todo-input-wrapper">
        {/* Controlled Input */}
        <input
          type="text"
          placeholder="Enter todo..."
          value={inputValue} // Giá trị từ state
          onChange={(event) => handleChange(event.target.value)}
          // event.target.value: Lấy giá trị hiện tại của input
        />

        <button onClick={handleClick}>Add</button>
      </div>
    </div>
  );
};

export default TodoInput;
```

**Flow khi user nhập và thêm todo:**

```
1. User gõ "Học React"
   → onChange event fired
   → handleChange("Học React")
   → setInputValue("Học React")
   → Component re-render với input value = "Học React"

2. User click nút "Add"
   → onClick event fired
   → handleClick()
   → handleAddTodo("Học React") // Gọi hàm từ App
   → setInputValue("") // Reset input
   → Component re-render với input rỗng
```

**Controlled Component Pattern:**

```javascript
// ❌ UNCONTROLLED (Không khuyến khích)
<input type="text" />

// ✅ CONTROLLED (Best practice)
<input
  type="text"
  value={inputValue}           // React quản lý value
  onChange={(e) => setInputValue(e.target.value)}
/>
```

---

### 4️⃣ TodoContent Component - Hiển thị Danh Sách

**File: `components/Content/TodoContent.jsx`**

```javascript
import "./TodoContent.css";
import PropTypes from "prop-types";

const TodoContent = ({ todoList = [], handleDelete }) => {
  // todoList = [] : Default parameter nếu không truyền props

  return (
    <div className="todo-item">
      {/* MAP: Render danh sách todo */}
      {todoList.map((item) => {
        // Destructuring: Lấy id và name từ object
        const { id, name } = item;

        return (
          // KEY: Unique identifier cho React
          <div key={id} className="todo-item-wrapper">
            {/* Hiển thị tên todo */}
            <div className="todo-item-content">{name}</div>

            {/* Nút Delete */}
            <div className="todo-item-actions">
              <button onClick={() => handleDelete(id)} className="btn-delete">
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// 📌 PROPTYPES: Kiểm tra kiểu dữ liệu props
TodoContent.propTypes = {
  todoList: PropTypes.array, // Phải là array
  handleDelete: PropTypes.func, // Phải là function
};

export default TodoContent;
```

**Giải thích chi tiết:**

1. **Array.map()**: Biến đổi mảng thành JSX elements

   ```javascript
   // Input: todoList = [
   //   { id: 1, name: "Học React" },
   //   { id: 2, name: "Làm bài tập" }
   // ]

   // Output:
   // <div key={1}>...</div>
   // <div key={2}>...</div>
   ```

2. **Key Prop**:

   - React dùng key để identify elements
   - Giúp optimize re-rendering
   - **Phải unique** trong list

3. **Event Handler với Parameter**:

   ```javascript
   // ❌ SAI - Hàm được gọi ngay lập tức
   onClick={handleDelete(id)}

   // ✅ ĐÚNG - Tạo arrow function
   onClick={() => handleDelete(id)}
   ```

---

### 5️⃣ Header Component

**File: `components/Header/Header.jsx`**

```javascript
import "./Header.css";

const Header = ({ ...props }) => {
  // ...props: Rest parameter - nhận tất cả props khác

  return (
    <header {...props}>
      {/* Spread props vào header element */}
      <h1>Todo App</h1>
    </header>
  );
};

export default Header;
```

**CSS: `components/Header/Header.css`**

```css
/* Header Component Styles */
header {
  background: #28a745; /* Màu xanh lá */
  padding: 20px; /* Khoảng cách trong */
  text-align: center; /* Căn giữa */
  border-bottom: 3px solid #1e7e34; /* Viền dưới */
}

header h1 {
  font-size: 32px;
  font-weight: normal;
  color: white;
  margin: 0;
}
```

---

### 6️⃣ Footer Component

**File: `components/Footer/Footer.jsx`**

```javascript
import "./Footer.css";

const Footer = ({ todoList }) => {
  return (
    <footer>
      <div className="footer-content">
        <p>
          Total left: <b>{todoList.length}</b>
          {/* todoList.length: Số lượng phần tử trong mảng */}
        </p>

        <button>Clear all todoList</button>
        {/* TODO: Chức năng này chưa implement */}
      </div>
    </footer>
  );
};

export default Footer;
```

**CSS: `components/Footer/Footer.css`**

```css
/* Footer Component Styles */
footer {
  margin-top: 20px;
  padding: 20px;
  background: #f8f9fa;
  border-top: 3px solid #dee2e6; /* Viền trên */
}

.footer-content {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}
```

---

### 7️⃣ Logo Component

**File: `components/Logo/Logo.jsx`**

```javascript
import logo from "../../assets/logo.jpg";
import "./Logo.css";

const Logo = ({ ...props }) => {
  return (
    <div className="logo-container">
      {/* Import image từ assets */}
      <img src={logo} alt="Todo Logo" />
    </div>
  );
};

export default Logo;
```

**Conditional Rendering trong App:**

```javascript
{
  todoList.length === 0 && <Logo />;
}

// Giải thích:
// - Nếu todoList.length === 0 → true → render <Logo />
// - Nếu todoList.length > 0 → false → không render
```

---

## State Management

### Lifting State Up Pattern

```
┌──────────────────────────────────┐
│       App (State Owner)          │
│  const [todoList, setTodoList]   │
└───────┬──────────────┬───────────┘
        │              │
        │ (1)          │ (2)
        ▼              ▼
   TodoInput      TodoContent
   - Thêm todo    - Hiển thị
   - Gọi          - Xóa todo
     handleAdd      - Gọi handleDelete
```

**Tại sao state ở App?**

1. **Nhiều components cần access** todoList
2. **TodoInput** cần thêm vào todoList
3. **TodoContent** cần hiển thị và xóa
4. **Footer** cần đếm số lượng
5. **Conditional** cần check độ dài

### State Update Patterns

**1. Thêm phần tử:**

```javascript
// Immutable update
setTodoList([...todoList, newTodo]);

// Tương đương:
const newArray = todoList.concat(newTodo);
setTodoList(newArray);
```

**2. Xóa phần tử:**

```javascript
// Filter ra id cần xóa
setTodoList(todoList.filter((item) => item.id !== id));
```

**3. Sửa phần tử (Chưa implement):**

```javascript
// Map và thay đổi item cần sửa
setTodoList(
  todoList.map((item) => (item.id === id ? { ...item, name: newName } : item))
);
```

---

## Styling Guide

### Global Styles (`index.css`)

```css
/* 1. Reset CSS */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box; /* Padding không làm tăng width */
}

/* 2. Body Styles */
body {
  font-family: Arial, Helvetica, sans-serif;
  background: #f5f5f5;
  color: #333;
  line-height: 1.6;
}

/* 3. Root Container */
#root {
  min-height: 100vh; /* Chiều cao tối thiểu = viewport */
}

/* 4. Container (Khung chính) */
.container {
  max-width: 800px; /* Giới hạn độ rộng */
  margin: 20px auto; /* Center horizontal */
  padding: 0;
  border: 2px solid #ddd; /* Viền khung */
  border-radius: 8px; /* Bo góc */
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Bóng đổ */
  overflow: hidden; /* Clip nội dung tràn */
}

/* 5. Button Base Styles */
button {
  font-family: inherit;
  cursor: pointer;
  border: none;
  outline: none;
  transition: all 0.2s ease; /* Animation mượt */
}

button:active {
  transform: scale(0.98); /* Hiệu ứng nhấn */
}
```

### Component-Specific Styles

**TodoInput Styles:**

```css
.todo-input-container {
  max-width: 600px;
  margin: 30px auto;
  padding: 0 20px;
}

.todo-input-wrapper {
  display: flex; /* Flexbox layout */
  gap: 8px; /* Khoảng cách giữa input và button */
  margin-bottom: 20px;
}

.todo-input-wrapper input {
  flex: 1; /* Chiếm hết không gian còn lại */
  padding: 10px 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.todo-input-wrapper input:focus {
  border-color: #28a745; /* Đổi màu khi focus */
}
```

**TodoContent Styles:**

```css
.todo-item {
  padding: 0 20px;
  margin-bottom: 30px;
}

.todo-item-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 15px;
  background: white;
  border: 1px solid #ddd;
  border-bottom: none; /* Loại bỏ border-bottom giữa các items */
}

/* Border cho item đầu tiên */
.todo-item-wrapper:first-child {
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

/* Border cho item cuối cùng */
.todo-item-wrapper:last-child {
  border-bottom: 1px solid #ddd; /* Thêm lại border-bottom */
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}
```

---

## Các Tính Năng Chính

### 1. Thêm Todo

**Flow hoàn chỉnh:**

```
User gõ "Học React" vào input
    ↓
onChange event → setInputValue("Học React")
    ↓
User click "Add"
    ↓
onClick → handleClick()
    ↓
handleAddTodo("Học React") // Từ props
    ↓
(Trong App.jsx)
    ↓
Validation: Check rỗng
    ↓
Tạo newTodo = { id: random, name: "Học React" }
    ↓
setTodoList([...todoList, newTodo])
    ↓
App re-render
    ↓
TodoContent nhận todoList mới → re-render
    ↓
Hiển thị todo mới trong danh sách
```

### 2. Xóa Todo

**Flow hoàn chỉnh:**

```
User click "Delete" trên item có id = 123
    ↓
onClick={() => handleDelete(123)}
    ↓
(Trong App.jsx)
    ↓
Filter: todoList.filter(item => item.id !== 123)
    ↓
setTodoList(newTodoList) // Không có item id=123
    ↓
App re-render
    ↓
TodoContent nhận todoList mới → re-render
    ↓
Item đã bị loại khỏi danh sách
```

### 3. Hiển thị Logo

**Conditional Logic:**

```javascript
{
  todoList.length === 0 && <Logo />;
}

// Khi nào hiển thị?
// - App khởi động (todoList = [])
// - Xóa hết tất cả todos
// - Clear all (chưa implement)

// Khi nào ẩn?
// - Có ít nhất 1 todo trong list
```

### 4. Đếm Số Lượng

**Implementation:**

```javascript
<p>
  Total left: <b>{todoList.length}</b>
</p>

// Cập nhật real-time
// - Thêm todo → length tăng
// - Xóa todo → length giảm
```

---

## Advanced Concepts

### 1. Re-rendering

**Khi nào component re-render?**

- State thay đổi (`useState`)
- Props thay đổi
- Parent component re-render

**Example:**

```javascript
// Khi setTodoList được gọi
setTodoList([...todoList, newTodo])

// ↓ Trigger re-render chain:
App → TodoContent → TodoItems (all)
App → Footer (vì todoList props thay đổi)
```

### 2. Immutability

**Tại sao không mutate state?**

```javascript
// ❌ WRONG - Mutate trực tiếp
todoList.push(newTodo);
setTodoList(todoList); // React KHÔNG detect thay đổi

// ✅ CORRECT - Tạo array mới
setTodoList([...todoList, newTodo]);
```

**Nguyên tắc:**

- Luôn tạo **bản sao mới** khi update
- Dùng spread operator, filter, map
- Không dùng push, pop, splice trực tiếp

### 3. Event Handling

**Các pattern phổ biến:**

```javascript
// 1. Inline arrow function
onClick={() => handleDelete(id)}

// 2. Event object
onChange={(event) => setInputValue(event.target.value)}

// 3. Function reference (không có params)
onClick={handleClick}
```

### 4. Props Validation

```javascript
import PropTypes from "prop-types";

TodoContent.propTypes = {
  todoList: PropTypes.array.isRequired, // Bắt buộc
  handleDelete: PropTypes.func, // Optional
};

// Benefits:
// - Type safety
// - Documentation
// - Runtime warnings
```

---

## Best Practices Áp Dụng

### ✅ Do's

1. **Component Naming**: PascalCase (TodoInput, not todoInput)
2. **File Organization**: Một component một folder
3. **CSS Co-location**: CSS cùng folder với component
4. **Controlled Components**: Dùng value + onChange cho input
5. **Immutable Updates**: Luôn tạo object/array mới
6. **Key Props**: Dùng unique ID, không dùng index
7. **PropTypes**: Validate props cho reusable components

### ❌ Don'ts

1. **Không mutate state trực tiếp**
2. **Không dùng index làm key**
3. **Không quên dependency array** (sẽ học useEffect)
4. **Không inline style** quá nhiều (dùng CSS)
5. **Không đặt state không cần thiết**

---

## Debugging Tips

### Console.log Placement

```javascript
const handleAddTodo = (name) => {
  console.log("1. Input received:", name);

  if (!name || name.trim() === "") {
    console.log("2. Validation failed!");
    return;
  }

  const newTodo = { id: randomIntValue(1, 9999), name };
  console.log("3. New todo created:", newTodo);

  setTodoList([...todoList, newTodo]);
  console.log("4. Updated todoList:", [...todoList, newTodo]);
};
```

### React DevTools

1. Install React DevTools extension
2. Inspect Components tab
3. Xem state và props của mỗi component
4. Track re-renders

---

## Kết Luận

### Điểm Chính Cần Nhớ

1. **Props Flow**: Từ parent xuống child (one-way data flow)
2. **State Lifting**: Đặt state ở component cha chung
3. **Immutability**: Không mutate state trực tiếp
4. **Component Composition**: Chia nhỏ UI thành components
5. **Event Handlers**: Truyền function qua props để con gọi lại

### Roadmap Mở Rộng

Các tính năng có thể thêm:

- [ ] Edit todo (update name)
- [ ] Clear all todos
- [ ] Toggle todo (mark completed)
- [ ] Filter (all/active/completed)
- [ ] LocalStorage persistence
- [ ] Search functionality
- [ ] Due dates
- [ ] Priority levels

---

## Tài Liệu Tham Khảo

- [React Official Docs](https://react.dev)
- [JavaScript Array Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
- [React PropTypes](https://react.dev/reference/react/Component#static-proptypes)

---

**📅 Created**: 2026-01-02  
**👨‍💻 Author**: Todo App Practice Project  
**📝 Version**: 1.0
