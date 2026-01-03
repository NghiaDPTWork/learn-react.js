import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          My App
        </Link>
        <ul className="navbar-menu">
          <li>
            <Link to="/">Home</Link>
          </li>
          {/* 
            Việc sử dụng thẻ <a> như này là sẽ làm performance giảm 
            => Buộc phải reload trang đó là cơ chế của HTML
            Để tránh tình trạng này thì REACT đã sinh ra một khái niệm 
            là Client Side Routing (CSR) -> là kỹ thuật định tuyến (chuyển trang) 
            được xử lý hoàn toàn bằng JavaScript ngay trong trình 
            duyệt của người dùng, không cần tải lại toàn bộ trang từ máy chủ

            Và nó cho mình component tên là Link => tránh reload trang 
            => 1 trong các yếu tố gọi là SPA (Single Page Application)
           */}
          <li>
            {/* <a href="/users">Users</a> */}
            <Link to="/users">Users</Link>
          </li>
          <li>
            <Link to="/product">Product</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
