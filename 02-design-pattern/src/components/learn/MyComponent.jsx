/*
  React component về bản chất là JS functional 

  Vậy sự khác biệt là gì ?
    - Tên phải là UpperCase (cái này là quy ước thôi)
    - Trả về JSX (giống HTML nhưng có 1 số khác biệt nhỏ)
      + class -> className
      + for -> htmlFor
      + style={{ color: "red", fontSize: "14px" }} (object)
    - Sử dụng được Hooks (useState, useEffect, ...)
    - Chỉ trả về những thứ trong () của return

*/

const MyComponent = () => {
  return (
    <>
      <h2>This is my component</h2>
      <p>Welcome to learning React!</p>
    </>
  );
};

export default MyComponent;
