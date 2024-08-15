import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { FaShoppingCart, FaSignOutAlt, FaUser } from "react-icons/fa";
import "./Header.scss";
import logo from "../assets/logo.png";

const Header = () => {
  const { state } = useContext(CartContext);
  const [total, setTotal] = useState(0);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const nav = useNavigate();
  // Tính tổng số lượng sản phẩm
  useEffect(() => {
    if (state.products) {
      const totalQuantity = state.products.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      setTotal(totalQuantity);
    }
  }, [state.products]);

  // Xử lý sự kiện đăng xuất
  const handleLogout = () => {
    if (confirm("Bạn muốn đăng xuất không ?")) {
      localStorage.removeItem("user");
    }
    nav("/");
  };

  return (
    <header className="header">
      <div className="float-start logo ">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="nav justify-content-center px-4">
        <div className="menu">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/shop">Shop</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>
        <div className="cart1 float-end">
          {user && user.email ? (
            <>
              <li className="user-icon">
                <FaUser />
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2"
                >
                  <FaSignOutAlt className="text-xl " />
                  <span>Logout</span>
                </button>
              </li>
              <li className="cart-icon">
                <Link to="/cart" className="">
                  <FaShoppingCart /> <span>{total}</span>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register" className="bg-dark text-white register1">
                  Register
                </Link>
              </li>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
