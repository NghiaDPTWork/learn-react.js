import "./Navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-brand">
          My App
        </NavLink>
        <ul className="navbar-menu">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          {/* 
            Việc sử dụng thẻ <a> như này là sẽ làm performance giảm 
            => Buộc phải reload trang đó là cơ chế của HTML
            Để tránh tình trạng này thì REACT đã sinh ra một khái niệm 
            là Client Side Routing (CSR) -> là kỹ thuật định tuyến (chuyển trang) 
            được xử lý hoàn toàn bằng JavaScript ngay trong trình 
            duyệt của người dùng, không cần tải lại toàn bộ trang từ máy chủ

            Và nó cho mình component tên là NavLink => tránh reload trang 
            => 1 trong các yếu tố gọi là SPA (Single Page Application)

            NavLink về bản chất là giống link tuy nhiên nó sẽ tự động thêm class
            active vào các ptu trong navbar nếu ấn 
            vào thì có hiệu ứng => tránh thêm thủ công
           */}
          <li>
            {/* <a href="/users">Users</a> */}
            <NavLink to="/users">Users</NavLink>
          </li>
          <li>
            <NavLink to="/product">Product</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/register">Register</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
