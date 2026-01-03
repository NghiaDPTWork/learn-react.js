import "./HeaderTodo.css";

const HeaderTodo = ({ ...props }) => {
  return (
    <header {...props}>
      <h1>Todo App</h1>
    </header>
  );
};

export default HeaderTodo;
