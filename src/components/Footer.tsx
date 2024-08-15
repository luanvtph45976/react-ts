import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4">
      <div className="container">
        <div className="row mt-4">
          <div className="col-md-3 d-flex align-items-center justify-content-center">
            <img
              src={Logo}
              alt="Company Logo"
              className="img-fluid pr-20"
              style={{ maxWidth: "240px", height: "auto" }}
            />
          </div>
          <div className="col-md-3 text-center">
            <h5>About Us</h5>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              scelerisque sed mauris eu aliquet.
            </p>
          </div>
          <div className="col-md-3 text-center ">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-white">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="text-white">
                  Contact
                </a>
              </li>
              <li>
                <a href="/services" className="text-white">
                  Services
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-3 text-center">
            <h5>Follow Us</h5>
            <ul className="list-unstyled d-flex justify-content-center">
              <li className="me-3">
                <a href="https://facebook.com" className="text-white">
                  <FaFacebook size={24} />
                </a>
              </li>
              <li className="me-3">
                <a href="https://twitter.com" className="text-white">
                  <FaTwitter size={24} />
                </a>
              </li>
              <li className="me-3">
                <a href="https://instagram.com" className="text-white">
                  <FaInstagram size={24} />
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" className="text-white">
                  <FaLinkedin size={24} />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-4">
          <p>&copy; 2024 Company. Copyright by luanvtph45976 </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
