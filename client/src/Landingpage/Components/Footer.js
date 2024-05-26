import React from "react";
import Logo from "../Assets/logo.png";
import "./Footer.css";
import { Link } from "react-router-dom";
import { FaFacebook } from "react-icons/fa6";
import { FiInstagram } from "react-icons/fi";
import { IoLogoYoutube } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  const handleEmailClick = () => {
    window.location.href = "mailto:vinootherbals2024@gmail.com";
  };

  return (
    <div>
      <div className="footer-wrapper">
        <div className="footer-section-one">
          <div className="footer-logo-container">
            <img src={Logo} style={{ height: '15vh', width: '20vw' }} alt="Logo" />
          </div>
          <div className="footer-icons">
            <ul className="wrapper">
              <a href="https://www.facebook.com/people/Vinootherbals24/61559348361216/" target="_blank" rel="noopener noreferrer">
                <li className="icon1 facebook">
                  <span className="tooltip1">Facebook</span>
                  <FaFacebook />
                </li>
              </a>
              <a href="https://www.linkedin.com/in/vinoot-herbal-9ba5682b6/" target="_blank" rel="noopener noreferrer">
                <li className="icon1 linkedin">
                  <span className="tooltip1">Linkedin</span>
                  <FaLinkedin />
                </li>
              </a>
              <a href="https://www.instagram.com/vinootherbals24/" target="_blank" rel="noopener noreferrer">
                <li className="icon1 instagram">
                  <span className="tooltip1">Instagram</span>
                  <FiInstagram />
                </li>
              </a>
              <a href="https://www.youtube.com/@vinootherbal/featured" target="_blank" rel="noopener noreferrer">
                <li className="icon1 youtube">
                  <span className="tooltip1">YouTube</span>
                  <IoLogoYoutube />
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
          Developed By <a href="https://www.matrical.in/" target="_blank" rel="noopener noreferrer">Matrical Technologies PVT LTD</a></span>
      </div>
    </div>
  );
};

export default Footer;
