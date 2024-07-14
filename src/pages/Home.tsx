import { Product } from "../interfaces/Product";

type Props = {
  data: Product[];
};

// props = propeties = các thuộc tính.

const Home = ({ data }: Props) => {
  return (
    <div className="row">
      {data.map((item) => (
        <div className="card col-3 m-3 m-2" key={item.id}>
          <h2>{item.title}</h2>
          <p>{item.price}</p>
          <img src={item.thumbnail} alt="" />
          <button className="btn btn-primary">Add to cart</button>
          <button className="btn btn-danger mt-3">View detail</button>
        </div>
      ))}
    </div>
  );
};

export default Home;
