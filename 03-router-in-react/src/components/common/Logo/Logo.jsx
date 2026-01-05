import "./Logo.css";
import logo from "../../../assets/react.svg";

const Logo = ({ ...props }) => {
  return (
    <div className="logo-container">
      <img src={logo} alt="Todo Logo" />
    </div>
  );
};

export default Logo;
