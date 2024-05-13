import React from "react";
import Logo from "../Assets/logo.png";



import { FaSquareInstagram } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div>
      <div className="footer-wrapper">
        <div className="footer-section-one">
          <div className="footer-logo-container">
            <img src={Logo} style={{height:'15vh',width:'20vw'}} alt="" />
          </div>
          <div className="footer-icons">
            <a  href="https://www.facebook.com/people/Vinootherbals24/61559348361216/" target="_blank" > <FaFacebookF /></a>
            <a  href="https://www.instagram.com/vinootherbals24/" target="_blank" > <FaSquareInstagram  /></a>
            <a  href="https://www.linkedin.com/in/vinoot-herbal-9ba5682b6/" target="_blank"> <FaLinkedin /></a>
            <a  href="https://www.youtube.com/@vinootherbal/featured" target="_blank"> <FaYoutube /></a>

           {/* <a href="https://www.facebook.com/people/Vinootherbals24/61559348361216/" target="blank" > <FaFacebookF /> </a>
           <a href="https://www.instagram.com/vinootherbals24/" target="blank" > <FaSquareInstagram /> </a>
           <a href="https://www.facebook.com/people/Vinootherbals24/61559348361216/" target="blank" > <FaFacebookF /> </a>
           <a href="https://www.facebook.com/people/Vinootherbals24/61559348361216/" target="blank" > <FaFacebookF /> </a> */}
            {/* <Link to="/https://www.facebook.com/people/Vinootherbals24/61559348361216/" >   </Link>
            <SiLinkedin />
            <BsYoutube />
            <BsTwitter /> */}
          </div>
        </div>
        <div className="footer-section-two">
          <div className="footer-section-columns">
            <Link className="footer-section-colimns-link" to="/login"><span>Login</span></Link>
            <Link className="footer-section-colimns-link" to="/fr"><span>Register for Franchise</span></Link>
            <Link className="footer-section-colimns-link" to="/"><span>Home</span></Link>
            {/* <span>Carrers</span>
            <span>Testimonials</span>
            <span>Work</span> */}
          </div>
          <div className="footer-section-columns">
            <span>+91-8904980190</span>
            <span>vinootherbals2024@gmail.com</span>
            {/* <span>press@food.com</span>
            <span>contact@food.com</span> */}
          </div>
          {/* <div className="footer-section-columns">
            <span>Terms & Conditions</span>
            <span>Privacy Policy</span>
          </div> */}
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
