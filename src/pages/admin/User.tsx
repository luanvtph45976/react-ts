import { useContext, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";
import { FaEdit, FaUser, FaUserShield } from "react-icons/fa";
import { Link } from "react-router-dom";

const User = () => {
  const { state, handleRemove } = useContext(UserContext);

  useEffect(() => {
    // Load the user details if needed
  }, []);

  return (
    <div className="container">
      <h1 className="my-4">User List</h1>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>

            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {state.users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>
                {user.role === "admin" ? (
                  <>
                    <FaUserShield style={{ color: "gold" }} title="Admin" />{" "}
                    Admin
                  </>
                ) : (
                  <>
                    <FaUser style={{ color: "green" }} title="Member" /> Member
                  </>
                )}
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleRemove(user.id as number)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;
