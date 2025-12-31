/*
  Để nhận props trong function component,
  ta truyền props vào tham số của hàm
*/

const TodoContent = (props) => {
  console.log("Check Props: ", props);
  /* 
    Kết quả: {
              content: "Learn React.js by building projects!",
              age: 18,
              data: {…}
            }
    
    => Chúng ta đã nhận được props được truyền từ component cha (App.jsx)
    => và được truyền dưới dạng một object tổng. 
    Trong đó, object này sẽ có các cặp key-value tương ứng với
      -> content : "Learn React.js by building projects!",
        Key: content
        Value: "Learn React.js by building projects!"
  */
  return (
    <div className="todo-content">
      <div className="todo-item"> My age is a {props.age} </div>
      <div className="todo-item">Learning React Design Pattern</div>
      <div className="todo-item">CSS Styling Practice</div>
    </div>
  );
};

export default TodoContent;
