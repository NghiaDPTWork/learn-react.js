import Footer from "./components/layout/Footer/Footer";
import Header from "./components/layout/Header/Header";
import { Outlet } from "react-router-dom";

function App() {
  // Hàm edit

  return (
    <>
      <Header />
      {/*
         Ta định nghĩa Outlet ở đây nha
         Dùng để định nghĩa vị trí render content của con
       */}
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
