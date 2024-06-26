import React from "react";
import BannerBackground from "../Assets/home-banner-background.png";
import BannerImage from "../Assets/home-banner-image.png";
import Navbar from "./Navbar";
import { FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="home-banner-container">
        <div className="home-bannerImage-container">
          <img src={BannerBackground} style={{height:'100vh',width:'2000px'}} alt="" />
        </div>
        <div className="home-text-section">
          <h1 className="primary-heading">
          Connected to Nature, Exploring Ayurvedic Wellbeing
          </h1>
          {/* <p className="primary-text">
            Healthy switcher chefs do all the prep work, like peeding, chopping
            & marinating, so you can cook a fresh food.
          </p> */}
          <Link className="fran-regbtn" to="/fr">
          <button className="secondary-button">
            Register for Franchise <FiArrowRight />{" "}
          </button>
          </Link>
          
        </div>
        <div className="home-image-section">
          <img src={BannerImage} style={{width:'100%',backgroundSize:'cover'}} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
