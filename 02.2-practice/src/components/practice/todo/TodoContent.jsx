/*
  Để nhận props trong function component,
  ta truyền props vào tham số của hàm

  => Ta rút ra rằng 
     + Cái gì mà cha muốn truyền lại cho con => props
     + Cái gì mà thay đổi theo thời gian thực => state
*/

const TodoContent = ({ todoList, ...props }) => {
  console.log("Props received in TodoContent: ", { todoList, ...props });
  return (
    <div className="todo-content">
      {todoList.map((item, index) => {
        const todo = item;
        return (
          <div className="todo-item">
            <div key={index} className="todo-row">
              {todo.id} - {todo.name}
            </div>
            <button className="btn-delete">Delete</button>
          </div>
        );
      })}
    </div>
  );
};

export default TodoContent;
