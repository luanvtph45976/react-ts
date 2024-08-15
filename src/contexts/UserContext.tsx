import { createContext, ReactNode, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../apis";
import { User } from "../interfaces/User";
import userReducer from "../reducers/userReducer";

type UserContextType = {
  state: {
    users: User[];
    selectedUser?: User;
  };
  handleRemove: (id: number) => void;
  onSubmitUser: (data: User) => void;
  getDetail: (data: number | string) => Promise<User>;
};
export const UserContext = createContext<UserContextType>(
  {} as UserContextType
);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, { users: [] });
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      const { data } = await instance.get(`/users`);
      dispatch({ type: "SET_USERS", payload: data });
    })();
  }, []);

  const handleRemove = async (id: number) => {
    if (confirm("Are you sure?")) {
      await instance.delete(`/users/${id}`);
      dispatch({ type: "DELETE_USER", payload: id });
    }
  };

  const onSubmitUser = async (data: User) => {
    try {
      if (data.id) {
        await instance.patch(`/users/${data.id}`, data);
        dispatch({ type: "UPDATE_USER", payload: data });
      } else {
        await instance.post(`/users`, data);
        dispatch({ type: "ADD_USER", payload: data });
      }
      nav("/admin");
    } catch (error) {
      console.error(error);
    }
  };

  const getDetail = async (id: number | string | undefined) => {
    const { data } = await instance.get(`/users/${id}`);
    dispatch({ type: "SET_SELECTED_USER", payload: data });
    return data;
  };

  return (
    <UserContext.Provider
      value={{ state, handleRemove, getDetail, onSubmitUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
