import React, { createContext, useEffect, useReducer } from "react";
import cartReducer from "../reducers/cartReducer";
import instance from "../apis";
import { Cart } from "../interfaces/Cart";
import { Product } from "../interfaces/Product";

export type CartContextType = {
  state: { products: any[] };
  addToCart: (product: Product) => void;
  removeFromCart: () => void;
};

export const CartContext = createContext<CartContextType>(
  {} as CartContextType
);

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, { products: [] });

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    (async () => {
      const { data } = await instance.get("/cart");
      const cart =
        data.find((item: Cart) => item.userID === user.id)?.products || [];
      dispatch({ type: "SET_CART", payload: cart });
    })();
  }, []);

  const addToCart = (product: Product) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { title: product.title, price: product.price, quantity: 1 },
    });
  };

  const removeFromCart = () => {
    // Logic to remove a product from cart
  };

  return (
    <CartContext.Provider value={{ state, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
