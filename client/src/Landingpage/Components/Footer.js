import React from "react";
import Logo from "../Assets/logo.png";
import "./Footer.css";
import { Link } from "react-router-dom";
import { FaFacebook,FaTwitter} from "react-icons/fa6";
import { FiInstagram } from "react-icons/fi";
import { IoLogoYoutube } from "react-icons/io";

const Footer = () => {
  const handleEmailClick = () => {
    window.location.href = "mailto:vinootherbals2024@gmail.com";
  };

  return (
    <div>
      <div className="footer-wrapper">
        <div className="footer-section-one">
          <div className="footer-logo-container">
            <img src={Logo} style={{height:'15vh',width:'20vw'}} alt="" />
          </div>
          <div className="footer-icons">
          <ul class="wrapper">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <li class="icon1 facebook">
                <span class="tooltip1">Facebook</span>
                <FaFacebook />
              </li>
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
            <li class="icon1 twitter">
              <span class="tooltip1">Twitter</span>
              <FaTwitter />
            </li>
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">

            <li class="icon1 instagram">
              <span class="tooltip1">Instagram</span>
              <FiInstagram />
            </li>
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
            <li class="icon1 youtube">
              <span class="tooltip1">YouTube</span>
              <IoLogoYoutube/>
          </li>
          </a>
          </ul>
          </div>
        </div>
        <div className="footer-section-two">
          <div className="footer-section-columns">
            <Link className="footer-section-colimns-link" to="/login"><span>Login</span></Link>
            <Link className="footer-section-colimns-link" to="/fr"><span>Register for Franchise</span></Link>
            <Link className="footer-section-colimns-link" to="/"><span>Home</span></Link>
          </div>
          <div className="footer-section-columns">
            <span>+91-8904980190</span>
            <span onClick={handleEmailClick}>vinootherbals2024@gmail.com</span>
          </div>
        </div>
      </div>
      <div className="matrical">
        <span>© Company 2024. All rights reserved.
          Developed By <a  href="https://www.matrical.in/" target="_blank">Matrical Technologies PVT LTD</a></span>
      </div>
    </div>
  );
};

export default Footer;
