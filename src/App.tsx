import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Admin from "./pages/Admin";

function App() {
  const [products, setProduct] = useState([]);
  useEffect(() => {
    (async () => {
      const { data } = await axios.get("http://localhost:3000/products");
      setProduct(data);
    })();
  }, []);
  const removeProduct = async (id: number) => {
    if (confirm("ban co chac muon xoa khong")) {
      await axios.delete(`http://localhost:3000/products/${id}`);
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
