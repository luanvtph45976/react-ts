const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      return { ...state, products: action.payload };
    case "ADD_TO_CART":
      const existingProductIndex = state.products.findIndex(
        (product) => product.title === action.payload.title
      );
      if (existingProductIndex !== -1) {
        const updatedProducts = state.products.map((product, index) => {
          if (index === existingProductIndex) {
            return {
              ...product,
              quantity: product.quantity + action.payload.quantity,
            };
          }
          return product;
        });
        return { ...state, products: updatedProducts };
      } else {
        return {
          ...state,
          products: [...state.products, { ...action.payload }],
        };
      }
    default:
      return state;
  }
};

export default cartReducer;
