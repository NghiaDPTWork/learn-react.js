import "./TodoContent.css";
import PropTypes from "prop-types";

const TodoContent = ({ todoList = [], handleDelete }) => {
  return (
    <div className="todo-item">
      {todoList.map((item) => {
        const { id, name } = item;
        return (
          <div key={id} className="todo-item-wrapper">
            <div className="todo-item-content">{name}</div>
            <div className="todo-item-actions">
              <button onClick={() => handleDelete(id)} className="btn-delete">
                Delete
              </button>
            </div>
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

export default TodoContent;
