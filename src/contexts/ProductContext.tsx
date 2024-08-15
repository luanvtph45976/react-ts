import { createContext, ReactNode, useEffect, useReducer } from "react";

import instance from "../apis";
import { Product } from "../interfaces/Product";
import productReducer from "../reducers/productReducer";

type ProductContextType = {
  state: {
    products: Product[];
    selectedProduct?: Product;
  };
  handleRemove: (id: number) => void;
  onSubmitProduct: (data: Product) => void;
  getDetail: (data: number | string) => Promise<Product>;
};
export const ProductContext = createContext<ProductContextType>(
  {} as ProductContextType
);

export const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(productReducer, { products: [] });
  // const nav = useNavigate();

  useEffect(() => {
    (async () => {
      const { data } = await instance.get(`/products`);
      dispatch({ type: "SET_PRODUCTS", payload: data });
    })();
  }, []);

  const handleRemove = async (id: number) => {
    if (confirm("Are you sure?")) {
      await instance.delete(`/products/${id}`);
      dispatch({ type: "DELETE_PRODUCT", payload: id });
    }
  };

  const onSubmitProduct = async (data: Product) => {
    try {
      if (data.id) {
        await instance.patch(`/products/${data.id}`, data);
        dispatch({ type: "UPDATE_PRODUCT", payload: data });
      } else {
        await instance.post(`/products`, data);
        dispatch({ type: "ADD_PRODUCT", payload: data });
      }
      window.location.href = "/admin";
    } catch (error) {
      console.error(error);
    }
  };

  const getDetail = async (id: number | string | undefined) => {
    // const product = state.products.find((item) => item.id === id);
    const { data } = await instance.get(`/products/${id}`);
    dispatch({ type: "SET_SELECTED_PRODUCT", payload: data });
    return data;
  };

  return (
    <ProductContext.Provider
      value={{ state, handleRemove, getDetail, onSubmitProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};
