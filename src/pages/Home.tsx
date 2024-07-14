import { Product } from "../interfaces/Product";

type Props = {
  data: Product[];
};

// props = propeties = các thuộc tính.

const Home = ({ data }: Props) => {
  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>
          <h2>{item.title}</h2>
          <p>{item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
