import React from "react";
import logo from "../../assets/logo.png";
import { FooterSquareStyled } from "./footer.styled";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube
} from "react-icons/fa";

const FooterSquare = () => {
  return (
    <FooterSquareStyled>
      {/* <h3>Day</h3> */}
      <img src={logo} style={{ height: '7rem', width: '15rem' }} alt="Logo" />
      <p className="mb-3">11th A ‘ Main, Virupakshapura, Kodigehalli, Bangalore 560097</p>
      <p className="mb-1">Phone: 8904980190</p>
      <p className="mb-1">Email: vinootherbals2024@gmail.com</p>
      <ul className="categoriesList">
        <li>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF />
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
        </li>
        <li>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
            <FaYoutube />
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn />
          </a>
        </li>
      </ul>
    </FooterSquareStyled>
  );
};

export default FooterSquare;
