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

Mục tiêu: Hiển thị danh sách các bài học chưa xong dưới dạng lưới (Grid).

#### Bước 1: Thiết lập State và gọi API

Sử dụng `useState` để lưu danh sách và `useEffect` để gọi API khi trang vừa load:

```javascript
const [lessons, setLessons] = useState([]);
const API_URL = import.meta.env.VITE_API_URL;

useEffect(() => {
  axios.get(API_URL).then((res) => {
    // LỌC: Chỉ lấy các bài học có isCompleted là false
    const uncompleted = res.data.filter((item) => !item.isCompleted);
    setLessons(uncompleted);
  });
}, []);
```

#### Bước 2: Hiển thị giao diện Grid (Thẻ bài)

Sử dụng các component `Row`, `Col`, `Card` của **React-Bootstrap**:

- `Row xs={1} md={3}`: Hiển thị 1 cột trên mobile, 3 cột trên máy tính.
- `Card.Img`: Hiển thị hình ảnh bài học.
- `Card.Title`: Hiển thị tiêu đề.

#### Bước 3: Di chuyển đến trang Chi tiết

Sử dụng `useNavigate` của `react-router` để chuyển trang khi click vào ảnh:

```javascript
const navigate = useNavigate();
// Trong Card.Img:
onClick={() => navigate(`/se194670/lessons/${lesson.id}`)}
```

### 4️⃣ Trang All Lessons (Danh sách đầy đủ)

Mục tiêu: Hiển thị toàn bộ danh sách bài học bằng bảng (Table) và tự động sắp xếp.

#### Bước 1: Gọi API và Sắp xếp dữ liệu

Dữ liệu cần được sắp xếp theo `id` giảm dần sau khi lấy từ API:

```javascript
useEffect(() => {
  axios.get(API_URL).then((res) => {
    // SẮP XẾP: b.id - a.id để đưa ID lớn lên đầu
    const sorted = res.data.sort((a, b) => b.id - a.id);
    setLessons(sorted);
  });
}, []);
```

#### Bước 2: Hiển thị bảng dữ liệu (Table)

Sử dụng component `Table` của **React-Bootstrap**:

- `striped bordered hover`: Các thuộc tính giúp bảng đẹp và dễ nhìn hơn.
- Mỗi hàng (`tr`) cần có các cột: ID, Title, Level, Time và Actions.

#### Bước 3: Thêm nút chức năng (Edit/Delete)

- Tạo các `<Button>` hoặc biểu tượng cho cột Actions.
- **Lưu ý quan trọng:** Sử dụng `e.stopPropagation()` để khi nhấn vào nút Sửa/Xóa, ứng dụng không bị chuyển hướng nhầm sang trang Chi tiết.

#### Bước 4: Điều hướng chi tiết

- Khi click vào bất kỳ cột thông tin nào trong hàng (trừ cột Actions), gọi `navigate` đến đường dẫn `/se194670/lessons/${lesson.id}`.

### 5️⃣ Trang Completed Lessons (Bài tập đã xong)

Mục tiêu: Hiển thị danh sách các bài học đã hoàn thành (`isCompleted === true`).

#### Bước 1: Lọc và Sắp xếp dữ liệu

Tương tự trang All Lessons, nhưng cần thêm bước lọc dữ liệu:

```javascript
useEffect(() => {
  axios.get(API_URL).then((res) => {
    // 1. LỌC: Chỉ lấy các bài học có isCompleted là true
    const completed = res.data.filter((item) => item.isCompleted);
    // 2. SẮP XẾP: Giảm dần theo id
    const sorted = completed.sort((a, b) => b.id - a.id);
    setLessons(sorted);
  });
}, []);
```

#### Bước 2: Hiển thị giao diện List/Table

Theo yêu cầu đề bài, hiển thị: **lessonTitle**, **level**, và **lessonImage**.

- Sử dụng `Table` để trình bày gọn gàng.
- Hiển thị hình ảnh bằng thẻ `<img>` với kích thước thu nhỏ.

#### Bước 3: Điều hướng

Click vào bất kỳ dòng nào trên bảng để chuyển hướng sang trang chi tiết bài học.

---

## Task 3: Chức năng Chi tiết, Thêm, Sửa, Xóa (4.5 điểm)

Task này yêu cầu xử lý dữ liệu phức tạp hơn và quản lý form với Validation.

### 1️⃣ Trang Chi tiết Bài học (Lesson Detail)

Mục tiêu: Hiển thị toàn bộ thông tin của một bài học cụ thể dựa trên ID từ URL.

#### Bước 1: Khai báo tham số ID

Sử dụng hook `useParams` từ `react-router` để nhận giá trị ID:

```javascript
import { useParams } from "react-router";
const { id } = useParams();
```

#### Bước 2: Gọi API lấy chi tiết

Sử dụng `axios` để lấy dữ liệu đúng của bài học đó:

```javascript
useEffect(() => {
  axios.get(`${API_URL}/${id}`).then((res) => setLesson(res.data));
}, [id]);
```

#### Bước 3: Định dạng số (Number Formatting)

Đề bài yêu cầu `estimatedTime` phải có dấu phẩy ngăn cách. Sử dụng hàm:

```javascript
{
  lesson.estimatedTime?.toLocaleString();
}
minutes;
```

#### Bước 4: Thiết kế giao diện

- Sử dụng `Card` của Bootstrap để gom nhóm thông tin.
- Hiển thị đầy đủ: Ảnh lớn, Tiêu đề, Badge (Completed/In Progress), Level, và Thời gian.

### 2️⃣ Thêm bài học mới (Add Lesson)

Tạo form nhập liệu với các ràng buộc chặt chẽ.

- **Thư viện:** **Formik** (quản lý form) và **Yup** (kiểm tra lỗi - Validation).
- **Các quy tắc (Validation Rules):**
  - Tất cả các trường là bắt buộc (`.required()`).
  - `lessonTitle`: Phải có ít nhất 2 từ (Dùng Regex hoặc kiểm tra khoảng trắng).
  - `lessonImage`: Phải là định dạng URL hợp lệ (`.url()`).
  - `estimatedTime`: Phải là số (`.number()`).
  - `level`: Chọn từ danh sách (N1 -> N5).

### 3️⃣ Xóa bài học (Delete)

Thực hiện tại trang All Lessons.

1.  **Xác nhận:** Sử dụng `window.confirm("Bạn có chắc chắn muốn xóa không?")`.
2.  **Gọi API:** Chạy lệnh `axios.delete(`${API_URL}/${id}`)`.
3.  **Thông báo:** Sau khi thành công, hiển thị `alert("Xóa thành công!")` và tải lại danh sách bài học.

### 4️⃣ Cập nhật bài học (Update Lesson)

Tương tự form Thêm nhưng cần lấy dữ liệu cũ đổ vào form.

1.  **Lấy dữ liệu:** Khi click "Edit", gọi API lấy thông tin bài học theo ID.
2.  **Khởi tạo Form:** Đưa dữ liệu vừa lấy vào `initialValues` của Formik.
3.  **Gọi API Updata:** Sử dụng `axios.put(...)` để lưu các thay đổi.

---

> [!IMPORTANT]
> Hãy luôn kiểm tra Console Log để đảm bảo các yêu cầu API (GET, POST, PUT, DELETE) hoạt động chính xác.
