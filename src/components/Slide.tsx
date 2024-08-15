import React from "react";
import slider1 from "../assets/slide1.jpg";
import slider2 from "../assets/slide2.jpg";
import slider3 from "../assets/slide3.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

const Slide = () => {
  return (
    <div
      id="carouselExampleControls"
      className="carousel slide container"
      data-bs-ride="carousel"
      data-bs-interval="2000"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src={slider1}
            className="d-block w-100 carousel-image"
            alt="Slide 1"
          />
        </div>
        <div className="carousel-item">
          <img
            src={slider2}
            className="d-block w-100 carousel-image"
            alt="Slide 2"
          />
        </div>
        <div className="carousel-item">
          <img
            src={slider3}
            className="d-block w-100 carousel-image"
            alt="Slide 3"
          />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Slide;
