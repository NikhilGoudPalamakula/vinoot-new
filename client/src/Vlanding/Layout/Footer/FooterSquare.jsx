import React from "react";
import logo from "../../assets/logo.png"
import {FooterSquareStyled} from "./footer.styled";
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
      <img src={logo} style={{height:'7rem',width:'15rem'}} alt=""/>
      <p className="mb-3">11th A ‘ Main , virupakshapura, kodigehalli, Bangalore 560097</p>
      <p className="mb-1">Phone: 8904980190</p>
      <p className="mb-1">Email: vinootherbals2024@gmail.com</p>
      <ul className="categoriesList">
        <li>
          <FaFacebookF />
        </li>
        <li>
          <FaInstagram />
        </li>
        <li>
          <FaYoutube />
        </li>
        <li>
          <FaLinkedinIn />
        </li>
      </ul>
    </FooterSquareStyled>
  );
};

export default FooterSquare;
