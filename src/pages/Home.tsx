import { useContext, useState, useEffect } from "react";
import { ProductContext } from "../contexts/ProductContext";
import { Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";

const Home = () => {
  const { state } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("price-asc"); // "price-asc" hoặc "price-desc"
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user && user.id) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    setSearchQuery(searchTerm);
  }, [searchTerm]);

  // Lọc sản phẩm dựa trên tìm kiếm
  const filteredProducts = state.products.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sắp xếp sản phẩm
  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOption === "price-asc") {
      return a.price - b.price;
    } else if (sortOption === "price-desc") {
      return b.price - a.price;
    }
    return 0;
  });
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const handleSearch = () => {
    setSearchQuery(searchTerm);
  };

  const handleAddToCart = (item) => {
    if (!isLoggedIn) {
      alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.");
      return;
    }
    addToCart(item);
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="row mt-4 m-auto">
          <div className="col-md-6 d-flex justify-content-start mb-4">
            <div className="d-flex align-items-center">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control w-40 me-2"
              />
              <button className="btn btn-primary" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
          <div className="col-md-6 d-flex justify-content-end mb-4 ml-auto">
            <div className="d-flex align-items-center">
              <select
                onChange={(e) => setSortOption(e.target.value)}
                value={sortOption}
                className="form-select"
              >
                <option value="price-asc">Giá: Thấp Đến Cao</option>
                <option value="price-desc">Giá: Cao Đến Thấp</option>
              </select>
            </div>
          </div>
        </div>
        {currentProducts.map((item) => (
          <div
            key={item.id}
            className="col-md-4 col-lg-3 p-3 mb-4 product-card mx-auto"
          >
            <Link to={`/product-detail/${item.id}`} className="product-link">
              <img
                src={item.thumbnail}
                alt={item.title}
                className="img-fluid product-image"
              />
              <h2 className="product-title">{item.title}</h2>
            </Link>
            <p className="product-price">{item.price}đ</p>

            <button
              className="btn btn-primary"
              onClick={() => handleAddToCart(item)}
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>
      <div className="">
        <nav>
          <ul className="d-flex justify-content-center space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index + 1}
                className="mx-3  mt-4 d-flex flex-row mb-3 page  "
              >
                <button
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 rounded corepage  ${
                    currentPage === index + 1
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};
export default Home;
