# 📘 Note kiến thức ReactJS

## Chapter 5: Component & JSX

---

### **#28 - Component**

**1. Định nghĩa:**

- **Component** là một khối code độc lập (block of code).
- **Công thức:** `Component = HTML + CSS + Javascript`.
- **Mục đích chính:** Giúp chia nhỏ giao diện (UI) thành các phần nhỏ để quản lý và **tái sử dụng (Reusability)**.

**2. Các bước tạo 1 Component:**

- **Bước 1: Định nghĩa Function**

  - Sử dụng Arrow Function (hoặc Function Declaration).
  - ⚠️ **Quy tắc bắt buộc:** Tên Component phải viết hoa chữ cái đầu (**PascalCase**).
    - ✅ Đúng: `MyComponent`, `Header`, `Footer`.
    - ❌ Sai: `myComponent`, `header` (React sẽ hiểu nhầm đây là thẻ HTML thường).

- **Bước 2: Return về JSX (Giao diện)**

  - Để biến một hàm JS bình thường thành Component, nó phải trả về mã JSX (giao diện HTML).

  ```javascript
  const MyComponent = () => {
    return (
      <div>
        <h1>Xin chào React</h1>
      </div>
    );
  };
  ```

- **Bước 3: Sử dụng Component**
  - Dùng như một thẻ HTML custom ở nơi khác.
  - Cú pháp: `<MyComponent />` hoặc `<MyComponent></MyComponent>`.

---

### **#29 - Import & Export Component**

**Mục đích:** Chia tách code ra nhiều file để dễ quản lý, sau đó "xuất" (Export) từ file này và "nhập" (Import) vào file kia để sử dụng.

Có 2 cách Export chính:

**1. Default Export (Mặc định)**

- Mỗi file chỉ được có **1** `export default`.
- Khi import có thể đặt tên tùy ý.
  - _File Component:_ `export default MyComponent;`
  - _File dùng:_ `import TenGiCungDuoc from './MyComponent';`

**2. Named Export (Theo tên)**

- Một file có thể export nhiều thứ.
- Khi import bắt buộc phải dùng dấu ngoặc nhọn `{}` và **đúng tên**.
  - _File Component:_ `export const MyComponent = ...`
  - _File dùng:_ `import { MyComponent } from './MyComponent';`

---

### **#30 - JSX (JavaScript XML)**

**Định nghĩa:** JSX là cú pháp mở rộng cho phép viết code giống HTML ngay bên trong file JavaScript.

**Các quy tắc cốt lõi:**

1.  **Single Root (Một cha duy nhất):**
    - JSX bắt buộc phải được bao bọc bởi 1 thẻ cha cao nhất.
2.  **Fragment (`<React.Fragment>` hoặc `<>... </>`):**
    - Giúp gom nhóm các phần tử con mà không sinh ra thẻ `div` thừa trong DOM (tránh vỡ layout).
3.  **Attribute (Thuộc tính):**
    - Phải chuyển đổi sang camelCase:
      - `class` $\rightarrow$ `className`
      - `for` $\rightarrow$ `htmlFor`
      - `tabindex` $\rightarrow$ `tabIndex`
4.  **Inline Style:**
    - Không dùng chuỗi (string) như HTML. Phải dùng **Object**.
    - Thuộc tính CSS có dấu gạch ngang đổi sang camelCase (`background-color` $\rightarrow$ `backgroundColor`).
    - _Ví dụ:_ `style={{ color: "red", backgroundColor: "black" }}`

---

### **#31 - Cách sử dụng biến số với JSX**

**Nguyên tắc:** Sử dụng cặp dấu ngoặc nhọn `{ }` để viết code JavaScript (biến, hàm, biểu thức) bên trong HTML.

**Xử lý các kiểu dữ liệu (Data Types):**

1.  **String / Number:**
    - Hiển thị trực tiếp lên giao diện.
    - _Ví dụ:_ `<h1>{name}</h1>` (với name = "Eric") $\rightarrow$ Hiện "Eric".
2.  **Boolean / Null / Undefined:**
    - **Không hiển thị** gì cả (React tự động bỏ qua).
    - _Ứng dụng:_ Rất hữu ích để ẩn/hiện element (Conditional Rendering).
3.  **Array:**
    - React sẽ hiển thị nối tiếp các phần tử trong mảng.
4.  **Object:**
    - ❌ **Lỗi:** Không thể render trực tiếp cả Object (`<div>{myObj}</div>` $\rightarrow$ Error).
    - ✅ **Cách sửa:**
      - Truy cập thuộc tính cụ thể: `{myObj.name}`.
      - Dùng `JSON.stringify(myObj)` để chuyển object thành chuỗi (thường dùng để debug/test xem dữ liệu).

---

### **#32 - Nested Component & Quan hệ Cha-Con**

**1. Khái niệm:**

- **Nested (Lồng nhau):** Component này nằm trong Component kia.
- **Quan hệ Cha-Con:** Component chứa gọi là Cha (Parent), Component được gọi là Con (Child).
- _Ví dụ:_ Trong `App` gọi `<Header />`. `App` là cha, `Header` là con.

**2. React Developer Tools:**

- Extension bắt buộc phải cài trên Chrome/Edge.
- Giúp soi (inspect) cây Component, xem props, state và cấu trúc lồng nhau mà DevTools mặc định của trình duyệt không thấy được.

**3. Giải thích file `main.tsx` (hoặc `index.js`):**

Đây là **cửa ngõ (entry point)** của ứng dụng React (thường thấy trong dự án Vite/Create-react-app).

```javascript
// Import thư viện React và ReactDOM
import React from "react";
import ReactDOM from "react-dom/client";

// Import Component chính (thường là App) và file CSS toàn cục
import App from "./App.tsx";
import "./index.css";

// 1. Tìm thẻ div có id="root" bên trong file index.html
// 2. Tạo một "root" của React tại đó
ReactDOM.createRoot(document.getElementById("root")).render(
  // 3. Render chế độ StrictMode (giúp cảnh báo lỗi tiềm ẩn khi dev)
  <React.StrictMode>
    {/* 4. Nhúng Component App vào - Đây là Component cha to nhất */}
    <App />
  </React.StrictMode>
);
```
