/*
  Để nhận props trong function component,
  ta truyền props vào tham số của hàm

  => Ta rút ra rằng 
     + Cái gì mà cha muốn truyền lại cho con => props
     + Cái gì mà thay đổi theo thời gian thực => state
*/
import PropTypes from "prop-types";

const TodoContent = ({ todoList, ...props }) => {
  console.log("Props received in TodoContent: ", { todoList, ...props });

  return (
    <div className="todo-content">
      {todoList.map((item, index) => {
        const todo = item;
        return (
          /*
            GIẢI THÍCH KỸ THUẬT (ACADEMIC/TECHNICAL):

            1. Vì sao phải đặt key? (Reconciliation Strategy)
               => React sử dụng thuật toán "Diffing" để so sánh Virtual DOM cũ và mới.
                  Prop `key` giúp React định danh duy nhất (identity) cho từng component trong một list.
                  Việc này giúp tối ưu hiệu năng (chỉ render lại node thay đổi) và đảm bảo tính đúng đắn 
                  của Component State khi DOM tree được cập nhật.

            2. Tại sao không nên dùng index làm key? (Unstable Identity)
               => Index không gắn liền với dữ liệu (data-bound) mà gắn với thứ tự mảng.
                  Khi danh sách bị thay đổi (thêm, xóa, sort) ở đầu hoặc giữa, index của các phần tử sẽ bị trượt (shift).
                  React so sánh key cũ (index 0) với key mới (index 0) và lầm tưởng là cùng một component instance.
                  Hậu quả: Dữ liệu props thay đổi nhưng local state (ví dụ: text trong input) vẫn giữ nguyên của component cũ -> Bug nghiêm trọng về UI/UX.

            3. Nếu không có id thì phải làm sao? (Unique Identifier Generation)
               => Cần tạo ra một UUID/GUID ổn định.
                  - Best practice: ID nên được tạo từ Backend hoặc Database.
                  - Client-side: Dùng thư viện như `uuid` hoặc `crypto.randomUUID()`.
                  - Fallback: Hash nội dung object (nếu nội dung là unique và immutable).

            4. Vì sao key lại được đặt ở đây mà không phải ở lớp con? (Diffing Context)
               => Key phải nằm ở "top-level element" bên trong hàm map.
                  React cần key để phân biệt các node anh em (siblings) ngay tại mảng được trả về.
                  Nếu đặt key ở thẻ con, React không thể truy cập key đó ở cấp độ danh sách để thực hiện thuật toán Diffing.

            5. Map là gì? Tại sao dùng map? (Functional Programming & Declarative)
               => Trong React, chúng ta render theo cơ chế Declarative (khai báo).
                  Hàm `.map()` là một Higher-order function giúp biến đổi (transform) một mảng dữ liệu (Model) 
                  thành một mảng các React Elements (View).
                  `.map()` trả về một mảng mới (new array reference), điều này khớp với yêu cầu của JSX expression.

            6. Tại sao không dùng forEach? (Return Value & Side Effects)
               => `.forEach()` chỉ dùng để thực thi side-effect (duyệt qua từng phần tử) và luôn trả về `undefined`.
                  JSX `{ }` mong đợi một giá trị (expression) trả về là React Node hoặc mảng Node để render.
                  Vì `forEach` trả về `undefined`, React sẽ không hiển thị gì cả. Muốn dùng forEach, bạn phải tạo biến 
                  mảng phụ rồi push thủ công -> code rườm rà (Imperative style), không đúng chuẩn React.

            7. Vậy key là để cho Dev dùng hay cho React dùng?
                => Key là để React sử dụng trong quá trình Reconciliation.
          */

          // Cái div này dùng bọc lại để chia layout cho dễ nha !!!
          <div key={todo.id} className="todo-item">
            <div className="todo-row">
              {todo.id} - {todo.name}
            </div>
            <button className="btn-delete">Delete</button>
          </div>
        );
      })}
    </div>
  );
};

TodoContent.propTypes = {
  todoList: PropTypes.array,
};

export default TodoContent;
