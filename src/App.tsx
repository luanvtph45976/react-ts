import { useEffect, useState } from "react";

import Admin from "./pages/admin/Admin";
import api from "./apis";
import { Product } from "./interfaces/Product";
import ProductForm from "./pages/admin/ProductForm";
import { Route, Routes } from "react-router-dom";

function App() {
  const [products, setProduct] = useState<Product[]>([]);
  useEffect(() => {
    (async () => {
      const { data } = await api.get("/products");
      setProduct(data);
    })();
  }, []);
  const removeProduct = async (id: number) => {
    if (confirm("ban co chac muon xoa khong")) {
      await api.delete(`/products/${id}`);
      const newData = products.filter((item) => item.id !== id);
      setProduct(newData);
    }
  };
  const handleProduct = async (data: Partial<Product>) => {
    try {
      if (data.id) {
        // logic cho edit product
        await api.patch(`/products/${data.id}`, data);
        const newData = await api.get("/products");
        setProduct(newData.data);
      } else {
        // logic cho add product
        const res = await api.post("/products", data);
        if (res.data) {
          setProduct([...products, res.data]);
        } else {
          console.error("Invalid response from server");
        }
      }
    } catch (error) {
      console.error("Error handling product:", error);
    }
  };
  return (
    <>
      <Routes>
        <Admin products={products} removeProduct={removeProduct} />
        <Route
          path="/admin/product-add"
          element={
            <ProductForm handleProduct={handleProduct} products={products} />
          }
        />
      </Routes>
    </>
  );
}

export default App;
