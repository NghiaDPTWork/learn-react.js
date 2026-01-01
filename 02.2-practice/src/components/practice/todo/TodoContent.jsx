import PropTypes from "prop-types";

const TodoContent = ({ todoList, handleDelete, ...props }) => {
  return (
    <div className="todo-content">
      {todoList.map((todo, index) => {
        return (
          <div key={todo.id} className="todo-item">
            <div className="todo-row">
              {todo.id} - {todo.name}
            </div>
            <button
              onClick={() => handleDelete(todo.id)}
              className="btn-delete"
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

TodoContent.propTypes = {
  todoList: PropTypes.array,
  handleDelete: PropTypes.func,
};

TodoContent.defaultProps = {
  todoList: [],
  handleDelete: () => {},
};

export default TodoContent;
