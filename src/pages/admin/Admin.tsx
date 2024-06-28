import { Link } from "react-router-dom";
import { Product } from "../../interfaces/Product";

type Props = {
  products: Product[];
  removeProduct: (id: number) => void;
};
const Admin = ({ products, removeProduct }: Props) => {
  return (
    <>
      <Link to="/admin/product-add">Them san pham</Link>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <td>Thumbnail</td>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.price}</td>
              <td>{item.description}</td>
              <td>
                <img
                  src={item.thumbnail}
                  alt="thumbnail"
                  width={200}
                  height={100}
                />
              </td>
              <td>
                <button className="btn btn-primary">Sua</button>
                <button
                  className="btn btn-danger"
                  onClick={() => removeProduct(item.id)}
                >
                  Xoa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Admin;
