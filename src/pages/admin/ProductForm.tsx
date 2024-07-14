import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import * as z from "zod";
import { Product } from "../../interfaces/Product";
import { useEffect } from "react";
import api from "../../apis";

type Props = {
  onSubmitProduct: (data: Product) => void;
};

const productSchema = z.object({
  title: z.string().min(6),
  price: z.number().min(0),
  description: z.string().optional(),
});

const ProductForm = ({ onSubmitProduct }: Props) => {
  const { id } = useParams();
  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm<Product>({
    resolver: zodResolver(productSchema),
  });

  if (id) {
    useEffect(() => {
      (async () => {
        const { data } = await api.get(`/products/${id}`);
        reset(data);
      })();
    }, [id]);
  }

  return (
    <div>
      <form onSubmit={handleSubmit((data) => onSubmitProduct({ ...data, id }))}>
        <h1>{id ? "Update product" : "Add product"}</h1>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            title
          </label>
          <input
            type="text"
            className="form-control"
            {...register("title", { required: true })}
          />
          {errors.title && (
            <span className="text-danger">{errors.title.message}</span>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            price
          </label>
          <input
            type="number"
            className="form-control"
            {...register("price", { required: true, valueAsNumber: true })}
          />
          {errors.price && (
            <span className="text-danger">{errors.price.message}</span>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            description
          </label>
          <input
            type="text"
            className="form-control"
            {...register("description")}
          />
        </div>

        <div className="mb-3">
          <button className="btn btn-primary">
            {id ? "Update product" : "Add product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
