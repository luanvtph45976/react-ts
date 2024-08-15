import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { state } = useContext(CartContext);
  console.log(state.products);
  const totalQuantity = state.products.reduce(
    (acc, item) => acc + item.quantity,
    0
  );
  const totalPrice = state.products
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  const handleCheckout = () => {
    // Logic để xử lý thanh toán
    alert("Thanh toán thành công!");
  };

  return (
    <div>
      <h1>Giỏ hàng, Tổng sản phẩm: {totalQuantity}</h1>
      <h2>Tổng số tiền: {totalPrice} VND</h2>

      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          {state.products.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>{item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-right mt-4">
        <Link
          className="btn btn-primary"
          to="/checkout"
          onClick={handleCheckout}
        >
          Thanh Toán
        </Link>
      </div>
    </div>
  );
};

export default Cart;
