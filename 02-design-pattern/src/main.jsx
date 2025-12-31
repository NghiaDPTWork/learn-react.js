import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  /*
    Với React.StrictMode, các thành phần con sẽ được kiểm tra kỹ lưỡng hơn (render 2 lần)
    trong quá trình phát triển. Điều này giúp phát hiện các vấn đề tiềm ẩn trong ứng dụng của bạn.
    Lưu ý: Chỉ sử dụng StrictMode trong môi trường phát triển, không sử dụng trong môi trường sản xuất.
  */
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
