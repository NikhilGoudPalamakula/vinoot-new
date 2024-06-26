import React from "react";
import {FooterNewsLetterStyled} from "./footer.styled";
// import {Form} from "react-bootstrap";
import { Link } from "react-router-dom";
import CustomButton from "../../components/CustomButton";

const FooterNewsLetter = () => {
  return (
    <FooterNewsLetterStyled>
      {/* <h4>Our Newsletter</h4> */}
      <p >
      Vinoot Herbals offers Ayurvedic hair care through franchises, focusing on natural solutions for hair loss and scalp concerns.
      </p>
      <div style={{display:'flex',gap:'1.5rem'}}>
      <div className="subscribe-form" >
        {/* <Form.Control type="text" /> */}
        <Link to="/login">
          <CustomButton type="regular-pricing-btn">Login</CustomButton>
        </Link>
      </div>
      <div className="subscribe-form" >
        {/* <Form.Control type="text" /> */}
        <Link to="/fr">
          <CustomButton type="regular-pricing-btn">Register for Franchise</CustomButton>
        </Link>
      </div>
      </div>
    </FooterNewsLetterStyled>
  );
};

export default FooterNewsLetter;
