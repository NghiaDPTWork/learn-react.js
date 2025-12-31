import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

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

const App = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <MyComponent />
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};

export default App;
