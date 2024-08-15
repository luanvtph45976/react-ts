import Header from "./Header";
import { Outlet } from "react-router-dom";
import Slide from "./Slide";
import Footer from "./Footer";

const ClientLayout = () => {
  return (
    <div>
      <Header />
      <Slide />
      <main id="container" className="">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default ClientLayout;
