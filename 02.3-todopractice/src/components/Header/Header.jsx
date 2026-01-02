import "./Header.css";

const Header = ({ ...props }) => {
  return (
    <header {...props}>
      <h1>Todo App</h1>
    </header>
  );
};

export default Header;
