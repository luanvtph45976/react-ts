import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div>
        <header>
          <ul>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </header>
      </div>
    </>
  );
};

export default Header;
