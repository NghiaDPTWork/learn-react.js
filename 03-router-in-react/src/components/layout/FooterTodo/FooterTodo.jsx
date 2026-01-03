import "./FooterTodo.css";

const FooterTodo = ({ todoList }) => {
  return (
    <footer>
      <div className="footer-content">
        <p>
          Total left: <b>{todoList.length}</b>
        </p>
        <button>Clear all todoList</button>
      </div>
    </footer>
  );
};

export default FooterTodo;
