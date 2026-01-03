# 📘 Note kiến thức ReactJS

## Chapter 4: Hello World với React

---

### **#22 - Vì sao không cần cài Live Server?**

Lý do chính là vì React sở hữu cơ chế **Hot Reloading** (cụ thể là **HMR - Hot Module Replacement**).

- **Định nghĩa:** Đây là tính năng cho phép lập trình viên thấy ngay kết quả thay đổi code mà **không cần khởi động lại toàn bộ ứng dụng**. Nó giúp giữ nguyên trạng thái (state) hiện tại của ứng dụng.
- **Lợi ích:** Cực kỳ hữu ích khi tùy chỉnh giao diện (UI) hoặc debug nhanh.

**⚙️ Cách hoạt động:**

1.  Khi sửa code, tính năng này sẽ "tiêm" phiên bản code mới vào ứng dụng đang chạy.
2.  Thay vì tải lại toàn bộ trang, nó chỉ cập nhật đúng các module (thành phần) bị thay đổi $\rightarrow$ Tiết kiệm thời gian.

> **💡 Kiến thức đi làm:**
>
> - Luôn quản lý code và thao tác với **Git**.
> - **BTS (Behind the Scenes):** Code React sau khi biên dịch sẽ được nhúng vào bên trong thẻ `<div id="root"></div>`.

---

### **#24 - Trình duyệt, Compiler & Component**

**1. Trình duyệt & Compiler**
Về cơ bản, trình duyệt (Browser) chỉ hiểu được 3 ngôn ngữ: **HTML, CSS, JavaScript**.
Các Framework/Library (như React) đều cần **Compiler** để dịch code về 1 trong 3 ngôn ngữ trên.

- **Vite (Hiện đại):** Có trình compiler riêng. Chuyển đổi `JSX` $\rightarrow$ `JS` (Nhanh, tối ưu).
- **React-scripts (Cũ):** Dùng Babel. Chuyển đổi `JSX` $\rightarrow$ `JS` (Chậm hơn).

**2. React Component vs JS Function**
React Component về bản chất vẫn là **JavaScript Function**, nhưng có sự khác biệt:

- **Naming:** Tên bắt buộc phải viết hoa chữ cái đầu (**PascalCase**). _VD: `Header`, `App`_.
- **Return:** Phải trả về **JSX**.
  - `class` $\rightarrow$ đổi thành `className`.
  - `for` $\rightarrow$ đổi thành `htmlFor`.
  - `style` $\rightarrow$ nhận vào một **Object**. _VD: `style={{ color: "red" }}`_.
- **Hooks:** Sử dụng được `useState`, `useEffect`...

**3. Quy tắc Return (Fragment vs Div)**
Component chỉ được trả về **1 thẻ cha duy nhất**.

- **`<div>`**: Thêm 1 thẻ div thật vào DOM. (Có thể ảnh hưởng layout/CSS).
- **`Fragment` (`<>...</>`):** Không thêm thẻ nào vào DOM (chỉ là mảnh vỡ vô hình).
  - $\rightarrow$ _Tùy layout mà chọn div hay Fragment._

**4. Biểu thức JS `{}` trong JSX**

- **Boolean / Null / Undefined:** Không hiển thị.
- **Number / String:** Hiển thị bình thường.
- **Object / Array:** Báo lỗi (Trừ khi map qua array).

---

### **#25 - Cơ chế hoạt động của React với Browser**

**1. Môi trường Dev (Development)**

- Lệnh: `npm run dev`
- Quy trình: Compiler (Vite) dịch code $\rightarrow$ Lưu vào **Memory (RAM)**.
- _Đặc điểm:_ Nhanh, Hot Reloading hoạt động tốt.

**2. Môi trường Prod (Production)**

- Lệnh: `npm run build`
- Kết quả: Tạo thư mục `dist` (code đã nén/minify).
- Lệnh xem thử: `npm run preview`.

**3. SPA - Single Page Application**

- Trong thư mục `dist` chỉ có duy nhất **một file `index.html`** bao trọn dự án.

---

### **#26 - React là CSR hay SSR?**

Phân biệt các mô hình Rendering:

- **CSR (Client Side Rendering):**
  - HTML render trên trình duyệt bằng JS.
  - **Đặc điểm:** Không reload lại trang khi chuyển hướng.
- **SSR (Server Side Rendering):**
  - HTML render sẵn từ Server.
  - **Đặc điểm:** Tải lần đầu nhanh hơn, nhưng chuyển trang thường reload (cần cấu hình thêm để thành SPA).
- **ISR (Incremental Static Regeneration):** _(Chưa có nội dung)_
- **SSG (Static Site Generation):** _(Chưa có nội dung)_
