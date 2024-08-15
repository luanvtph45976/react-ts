import { Link } from "react-router-dom";
import { useContext } from "react";
import { ProductContext } from "../../contexts/ProductContext";
import { FaTrashAlt, FaEdit, FaPlus } from "react-icons/fa"; // Import biểu tượng từ react-icons

const Dashboard = () => {
  const { state, handleRemove } = useContext(ProductContext);
  // const [categories, setCategories] = useState("");

  // Xử lý việc xóa sản phẩm với xác nhận từ người dùng

  return (
    <div className="dashboard-container">
      <h1 className="page-title">Product Dashboard</h1>
      <Link className="btn btn-success mb-3" to="/admin/product-add">
        <FaPlus className="me-2" /> Add New Product
      </Link>
      <table className="table table-bordered table-striped dashboard-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Price</th>
            <th>Thumbnail</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {state.products.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.price}đ</td>
              <td>
                <img
                  src={item.thumbnail || "đang cập nhật"}
                  alt={item.title}
                  style={{ width: "100px", height: "60px" }}
                />
              </td>
              <td>
                <button
                  className="btn btn-danger me-2"
                  onClick={() => handleRemove(item.id as number)}
                >
                  <FaTrashAlt className="me-2" /> Remove
                </button>
                <Link
                  to={`/admin/product-edit/${item.id}`}
                  className="btn btn-warning"
                >
                  <FaEdit className="me-2" /> Update
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
