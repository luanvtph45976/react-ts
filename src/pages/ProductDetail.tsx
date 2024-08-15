import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../contexts/ProductContext";
import { CartContext } from "../contexts/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const { getDetail, state } = useContext(ProductContext);

  useEffect(() => {
    if (id) {
      getDetail(id);
    }
  }, [id]);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Chi tiết sản phẩm</h1>
      {state.selectedProduct && (
        <div className="row mb-4">
          <div className="col-md-6 justify-content-center space-between ">
            <img
              src={state.selectedProduct.thumbnail}
              alt={state.selectedProduct.title}
              className="img-fluid"
            />
          </div>
          <div className="col-md-6">
            <h2>{state.selectedProduct.title}</h2>
            <p>{state.selectedProduct.description}</p>
            <p className="font-weight-bold">
              {state.selectedProduct.price} VND
            </p>
            <button
              className="btn btn-danger"
              onClick={() => addToCart(state.selectedProduct)}
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
