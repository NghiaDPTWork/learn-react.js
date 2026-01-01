const TodoFooter = ({ todoList, ...props }) => {
  return (
    <div className="todo-footer">
      <span>
        <b>{todoList.length}</b> items left
      </span>
      <button>Clear Completed</button>
    </div>
  );
};

export default TodoFooter;
