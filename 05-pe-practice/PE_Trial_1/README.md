# Hướng dẫn thực hiện PE FER202

---

## Task 1: Khởi tạo và Chuẩn bị (0.5 điểm)

Dưới đây là các bước quy trình thực hiện để hoàn thành các yêu cầu của Task 1.

### 1️⃣ Khởi tạo dự án React

Mở **Terminal** tại thư mục làm bài và thực hiện:

- **Tạo Project:** (Thay `se194670` bằng MSSV của bạn)
  ```bash
  npm create vite@latest se194670 -- --template react
  ```
- **Cài đặt thư viện:**
  ```bash
  cd se194670
  npm install axios react-router-dom bootstrap react-bootstrap formik yup
  ```

### 2️⃣ Thiết lập MockAPI

1.  Truy cập **[mockapi.io](https://mockapi.io/)**.
2.  Tạo Resource mới với tên là **Mã số sinh viên** của bạn.
3.  **Khai báo Schema:** Đảm bảo chính xác từng chữ cái:
    - `lessonTitle` (String)
    - `lessonImage` (String)
    - `level` (String)
    - `isCompleted` (Boolean)
    - `estimatedTime` (Number)

### 3️⃣ Nhập dữ liệu mẫu (Supply Data)

1.  Mở file `topic/jlpt_lessons.json` được cung cấp.
2.  **Copy** toàn bộ nội dung trong file đó.
3.  Trên giao diện MockAPI, nhấn vào nút **Data** (biểu tượng dữ liệu), **Paste** nội dung vào và nhấn **Update**.

### 4️⃣ Cấu hình biến môi trường (.env)

Tại thư mục gốc của dự án, tạo file `.env` và nhập:

```env
VITE_API_URL=https://[LINK_API_CUA_BAN]/[TEN_RESOURCE]
```

> #
>
> # 🚨 LƯU Ý
>
> ### 🛑 QUY ĐỊNH VỀ FILE .ENV
>
> **Bắt buộc** phải sử dụng file `.env` để lưu URL API.
> **Nếu code trực tiếp link vào bài làm sẽ bị 0 ĐIỂM (INVALID WORK).**

---

## Task 2: Giao diện và Điều hướng (4.0 điểm)

Task này tập trung vào việc tạo các trang và kết nối chúng bằng menu điều hướng.

### 1️⃣ Cấu trúc điều hướng (Routing)

Để cài đặt hệ thống chuyển trang, chúng ta thực hiện các bước sau:

#### Bước 1: Tạo các trang (Pages) cơ bản

Tạo các file tại thư mục `src/pages/` để làm đích đến cho các Route:

- `Home.jsx`: Trang chủ hiển thị bài học chưa xong.
- `AllLessons.jsx`: Trang danh sách tất cả bài học.
- `CompletedLessons.jsx`: Trang danh sách bài học đã hoàn thành.

#### Bước 2: Cấu hình Route trong `App.jsx`

Sử dụng các component từ thư viện `react-router` để định nghĩa URL:

```javascript
import { Routes, Route } from "react-router";
// Import các trang vừa tạo
import Home from "./pages/Home";
import AllLessons from "./pages/AllLessons";
import CompletedLessons from "./pages/CompletedLessons";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/se194670/all-lessons" element={<AllLessons />} />
      <Route
        path="/se194670/completed-lessons"
        element={<CompletedLessons />}
      />
    </Routes>
  );
}
```

#### Bước 3: Đảm bảo `BrowserRouter` đã bao bọc ứng dụng

Kiểm tra file `src/main.jsx`, component `<App />` phải nằm bên trong `<BrowserRouter>`:

```javascript
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
```

### 2️⃣ Tạo Navbar (Thanh điều hướng)

Sử dụng **React-Bootstrap** để tạo menu điều hướng chuẩn:

#### Bước 1: Tạo component `MyNavbar.jsx`

Tạo file tại `src/components/MyNavbar.jsx`:

- Sử dụng `<Navbar>`, `<Container>`, `<Nav>`.
- **Quan trọng:** Sử dụng thuộc tính `as={Link}` và `to="..."` để tích hợp `react-router` vào Bootstrap Nav.

```javascript
import { Link } from "react-router";
import { Navbar, Container, Nav } from "react-bootstrap";

const MyNavbar = () => (
  <Navbar bg="light" expand="lg">
    <Container>
      <Navbar.Brand as={Link} to="/">
        Lesson App
      </Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link as={Link} to="/">
          Home
        </Nav.Link>
        <Nav.Link as={Link} to="/se194670/all-lessons">
          All Lessons
        </Nav.Link>
        <Nav.Link as={Link} to="/se194670/completed-lessons">
          Completed Lessons
        </Nav.Link>
      </Nav>
    </Container>
  </Navbar>
);
```

#### Bước 2: Hiển thị Navbar trong `App.jsx`

Import và đặt `<MyNavbar />` nằm ngoài `<Routes>` để nó luôn hiển thị ở mọi trang.

```javascript
import MyNavbar from "./components/MyNavbar";

function App() {
  return (
    <div className="App">
      <MyNavbar />
      <Routes>{/* ... các Route ... */}</Routes>
    </div>
  );
}
```

### 3️⃣ Trang Home (Hiển thị chưa hoàn thành)

Đây là trang mặc định khi truy cập ứng dụng.

- **Logic:**
  1. Gọi API lấy danh sách bài học.
  2. Lọc danh sách: `item.isCompleted === false`.
- **Giao diện:** Sử dụng **Grid (Row/Col)** và **Card**. Mỗi thẻ bài hiển thị: Hình ảnh, Tiêu đề, Cấp độ, Thời gian.
- **Sự kiện:** Click vào ảnh sẽ chuyển hướng sang trang chi tiết.

### 4️⃣ Trang All Lessons (Danh sách đầy đủ)

- **Đường dẫn:** `/[mssv]/all-lessons`
- **Giao diện:** Hiển thị dạng **Danh sách (List)** hoặc **Bảng (Table)**.
- **Yêu cầu:** Sắp xếp tự động theo `id` giảm dần. Có biểu tượng/nút **Edit** và **Delete**.

### 5️⃣ Trang Completed Lessons (Bài tập đã xong)

- **Đường dẫn:** `/[mssv]/completed-lessons`
- **Logic:** Chỉ hiển thị các bài học có `isCompleted === true`.
- **Giao diện:** Tương tự trang All Lessons, hiển thị Hình ảnh, Tiêu đề, Cấp độ.
- **Yêu cầu:** Sắp xếp theo `id` giảm dần.

---

> [!TIP]
> Hãy tạo thư mục `src/pages` để chứa các tệp giao diện chính và `src/components` để chứa Navbar.
