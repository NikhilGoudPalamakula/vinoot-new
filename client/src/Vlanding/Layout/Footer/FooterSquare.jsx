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
      <ul className="categoriesList" style={{display:"flex", justifyContent:"center",alignItems:"center"}}>
        <li >
          <a className="icons4" href="https://www.facebook.com/people/Vinootherbals24/61559348361216/" target="_blank" rel="noopener noreferrer" >
            <FaFacebookF />
          </a>
        </li>
        <li>
          <a className="icons4" href="https://www.instagram.com/vinootherbals24/" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
        </li>
        <li>
          <a className="icons4" href="https://www.youtube.com/@vinootherbal/featured" target="_blank" rel="noopener noreferrer">
            <FaYoutube />
          </a>
        </li>
        <li>
          <a className="icons4" href="https://www.linkedin.com/in/vinoot-herbal-9ba5682b6/" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn />
          </a>
        </li>
      </ul>
    </FooterSquareStyled>
  );
};

export default FooterSquare;
