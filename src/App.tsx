import { useEffect, useState } from "react";

import Admin from "./pages/admin/Admin";
import api from "./apis";
import { Product } from "./interfaces/Product";
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
  return (
    <>
      <Admin products={products} removeProduct={removeProduct} />
    </>
  );
}

export default App;
