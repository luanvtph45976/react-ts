import { createContext, useEffect, useState } from "react";
import instance from "../apis";
import { Product } from "../interfaces/Product";
import { useNavigate } from "react-router-dom";

type ProductContextType = {
  products: Product[];
  handleRemove: (id: number | string) => void;
  onSubmitProduct: (data: Product) => void;
};

export const ProductContext = createContext<ProductContextType>(
  {} as ProductContextType
);

type ChirldrenProps = {
  children: React.ReactNode;
};

export const ProductProvider = ({ children }: ChirldrenProps) => {
  const [products, setProducts] = useState<Product[]>([]);

  const nav = useNavigate();

  const fetchProduct = async () => {
    const { data } = await instance.get(`/products`);
    setProducts(data);
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  const handleRemove = async (id: number | string) => {
    if (confirm("Are you sure?")) {
      await instance.delete(`/products/${id}`);
      setProducts(products.filter((item) => item.id !== id));
    }
  };

  const onSubmitProduct = async (data: Product) => {
    try {
      if (data.id) {
        // edit
        await instance.patch(`/products/${data.id}`, data);
      } else {
        // add
        await instance.post("/products", data);
      }
      fetchProduct();
      nav("/admin");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <ProductContext.Provider
      value={{ products, handleRemove, onSubmitProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};
