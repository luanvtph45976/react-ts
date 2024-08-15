import { Link, Outlet } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBox,
  FaTags,
  FaUserCircle,
  FaCog,
  FaShoppingCart,
} from "react-icons/fa";
import { useState } from "react";

const AdminLayout = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/"; // Chuyển hướng tới trang đăng nhập sau khi đăng xuất
  };

  if (!user || user.role !== "admin") {
    return <h1 className="text-center">Bạn không có quyền vào trang này</h1>;
  }

  return (
    <div className="container-fluid">
      <header className="admin-header d-flex justify-content-between align-items-center">
        <h1>Hello Admin</h1>
        <div className="admin-avatar">
          <FaUserCircle size={30} onClick={() => setIsMenuOpen(!isMenuOpen)} />
          {isMenuOpen && (
            <div className="admin-menu">
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </header>
      <div className="row ">
        <nav className="col-md-2 sidebar justify-content-center items-center space-between ">
          <div className="nav flex-column hover:bg-dark ">
            <ul className="ul1 nav flex-column hover:bg-dark ">
              <li className="nav-item hover:bg-primary">
                <Link to="/admin/dashboard" className="nav-link">
                  <FaTachometerAlt className="me-2" /> Dashboard
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin" className="nav-link">
                  <FaBox className="me-2" /> Products
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/categories" className="nav-link">
                  <FaTags className="me-2" /> Categories
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/users" className="nav-link">
                  <FaUserCircle className="me-2" /> Users
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/admin/orders" className="nav-link">
                  <FaShoppingCart className="me-2" /> Orders
                </Link>
              </li>
              <li>
                <Link to="/admin/settings" className="nav-link">
                  <FaCog className="me-2" /> Settings
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <main className="col-md-10 content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
