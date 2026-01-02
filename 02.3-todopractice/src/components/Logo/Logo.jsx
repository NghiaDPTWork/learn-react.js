import logo from "../../assets/logo.jpg";
import "./Logo.css";

const Logo = ({ ...props }) => {
  return (
    <div className="logo-container">
      <img src={logo} alt="Todo Logo" />
    </div>
  );
};

export default Logo;
