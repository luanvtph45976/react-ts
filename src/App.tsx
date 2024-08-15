import { Route, Routes } from "react-router-dom";
import "./App.css";
import AuthForm from "./components/AuthForm";
import Home from "./pages/Home";
import Dashboard from "./pages/admin/Dashboard";
import ProductForm from "./pages/admin/ProductForm";
import ProductDetail from "./pages/ProductDetail";
import ClientLayout from "./components/ClientLayout";
import AdminLayout from "./components/AdminLayout";
import Cart from "./pages/Cart";
import User from "./pages/admin/User";

function App() {
  return (
    <>
      <Routes>
        {/* Client */}
        <Route path="/" element={<ClientLayout />}>
          <Route index element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} />
        </Route>

        {/* Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/admin/product-add" element={<ProductForm />} />
          <Route path="/admin/product-edit/:id" element={<ProductForm />} />
          <Route path="/admin/users" element={<User />} />
        </Route>

        <Route path="/register" element={<AuthForm />} />
        <Route path="/login" element={<AuthForm isLogin />} />
      </Routes>
    </>
  );
}

export default App;
