import { useForm } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { User } from "./../interfaces/Users";
import { useNavigate } from "react-router-dom";
import api from "./../apis/index";

const userSchema = Joi.object({
  email: Joi.string().required().email({ tlds: false }),
  password: Joi.string().required().min(6),
});
const Login = () => {
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: joiResolver(userSchema),
  });
  const onSubmit = (user: User) => {
    (async () => {
      const { data } = await api.post(`/login`, user);
      console.log(data);
      if (data.user) {
        sessionStorage.setItem("accessToken", data.accessToken);
        const ifConfirm = confirm("Login Successfully,switch home page");
        if (ifConfirm) {
          nav("/");
        }
      }
    })();
  };
  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="">Email</label>
          <input
            type="email"
            className="form-control"
            {...register("email", {
              required: true,
            })}
          />
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </div>

        <div className=" mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            {...register("password", {
              required: true,
              minLength: 6,
            })}
          />
          {errors.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
        </div>

        <div className=" mb-3">
          <button className="btn btn-success w-100">Login</button>
        </div>
      </form>
    </div>
  );
};
export default Login;
