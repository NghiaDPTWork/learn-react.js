/*
  Lấy props trong function component
*/
const TodoNew = ({ addNewTodo }) => {
  // console.log("Check Props in TodoNew: ", props);
  addNewTodo("Sample Todo Item", "This is a sample todo item.");
  return (
    <div>
      <div className="todo-new">
        <input type="text" placeholder="Add a new task..." />
        <button>Add Todo</button>
      </div>
    </div>
  );
};

export default TodoNew;
