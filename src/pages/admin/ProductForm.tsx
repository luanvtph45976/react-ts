import { z } from "zod";
import { Product } from "../../interfaces/Product";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "../../apis";
import { useEffect, useState } from "react";

type Props = {
  handleProduct: (product: Product) => void;
  products: Product[];
};

const productSchema = z.object({
  title: z.string().nonempty("Title is required"),
  price: z.number().positive("Price must be positive"),
  description: z.string().nonempty("Description is required"),
  thumbnail: z.string().url("Invalid URL"),
});

const ProductForm = ({ handleProduct }: Props) => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(productSchema),
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          setIsLoading(true);
          const { data } = await api.get(`/products/${id}`);
          reset(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id, reset]);

  const handleFormSubmit = async (data: Product) => {
    try {
      if (handleProduct && id) {
        setIsLoading(true);
        await handleProduct({ ...data, id });
        setIsLoading(false);
      } else {
        console.error("handleProduct or id is undefined");
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit<Product>(handleFormSubmit)}>
      <h1>{id ? "Edit" : "Add"} product</h1>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          {...register("title", { required: true })}
        />
        {errors.title && errors.title.type === "required" && (
          <p className="text-danger">Title is required</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="price" className="form-label">
          Price
        </label>
        <input
          type="number"
          className="form-control"
          id="price"
          {...register("price", { required: true, min: 0 })}
        />
        {errors.price && errors.price.type === "required" && (
          <p className="text-danger">Price is required</p>
        )}
        {errors.price && errors.price.type === "min" && (
          <p className="text-danger">Price should be greater than 0</p>
        )}
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          type="text"
          className="form-control"
          id="description"
          {...register("description")}
        />
      </div>
      <div className="mb-3">
        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={isLoading}
        >
          {id ? "Edit" : "Add"} product
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
