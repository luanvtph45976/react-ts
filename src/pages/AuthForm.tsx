import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { User } from "../interfaces/User";
import instance from "../apis";
import { useNavigate } from "react-router-dom";

type Props = {
  isLogin?: boolean;
};

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(255),
  confirmPass: z.string().min(6).max(255),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(255),
});

const AuthForm = ({ isLogin }: Props) => {
  const nav = useNavigate();
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm<User>({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
  });

  const onSubmit = async (user: User) => {
    if (isLogin) {
      // logic login
      const { data } = await instance.post("/login", user);
      console.log(data);
      if (data.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
        window.confirm("Dang nhap thanh cong , chuyen den trang admin page") &&
          nav("/admin");
      }
    } else {
      // logic register
      const { data } = await instance.post("/register", user);
      console.log(data);
      if (data.accessToken) {
        window.confirm("Dang ky thanh cong, vui long  dang nhap") &&
          nav("/login");
      }
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>{isLogin ? "Login" : "Register"}</h1>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            className="form-control"
            type="text"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-warning">{errors.email.message}</span>
          )}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            password
          </label>
          <input
            className="form-control"
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-warning">{errors.password.message}</span>
          )}
        </div>

        {!isLogin && (
          <div className="mb-3">
            <label htmlFor="confirmPass" className="form-label">
              Confirm Password
            </label>
            <input
              className="form-control"
              type="password"
              {...register("confirmPass", { required: true })}
            />
            {errors.confirmPass && (
              <span className="text-warning">{errors.confirmPass.message}</span>
            )}
          </div>
        )}

        <div className="mb-3">
          <button className="btn btn-primary w-100">
            {isLogin ? "Login" : "Register"}
          </button>
        </div>
      </form>
    </>
  );
};

export default AuthForm;
