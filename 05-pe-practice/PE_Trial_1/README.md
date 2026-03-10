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
