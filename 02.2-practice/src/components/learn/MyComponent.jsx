/*
  React component về bản chất là JS functional 

  Vậy sự khác biệt là gì ?
    - Tên phải là UpperCase (cái này là quy ước thôi)
    - Trả về JSX (giống HTML nhưng có 1 số khác biệt nhỏ)
      + class -> className
      + for -> htmlFor
      + style={{ color: "red", fontSize: "14px" }} (javascript)(object)
    - Sử dụng được Hooks (useState, useEffect, ...)
    - Chỉ trả về những thứ 
        - Trong () của return
        - 1 tag duy nhất dùng Fragment (mảnh vỡ) or div
    - Vậy thì dùng div hay Fragment ?
      + div: thêm 1 thẻ div vào trong DOM (có thể ảnh hưởng đến CSS, layout)
      + Fragment: không thêm thẻ gì vào trong DOM (chỉ là mảnh vỡ vô hình)
      => Tùy theo layout mà bạn chọn div hay Fragment
      để chia giao diện
    - Dùng dấu {} để nhúng biểu thức JS vào trong JSX
      Đối vs Boolean - Null - Undefined sẽ không hiển thị gì cả
      Đối vs Number - String sẽ hiển thị ra giao diện
      Đối vs Object - Array sẽ báo lỗi 
      (trừ khi map qua array để hiển thị từng phần tử)
*/
import "./style.css";

const MyComponent = () => {
  const name = "ReactJS";
  const age = 5;
  const isAdult = age >= 18;
  const info = { city: "HCM", country: "VN" };
  return (
    <>
      <h2 style={{ color: "hotpink", fontSize: "14px" }}>
        This is my component of {name} - Age: {age} -{" "}
        {isAdult ? "Adult" : "Not Adult"} - {JSON.stringify(info)}
      </h2>
      <p className="child">Welcome to learning React!</p>
    </>
  );
};

export default MyComponent;
