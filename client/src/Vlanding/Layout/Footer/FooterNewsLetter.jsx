import React from "react";
import {FooterNewsLetterStyled} from "./footer.styled";
import {Form} from "react-bootstrap";
import CustomButton from "../../components/CustomButton";

const FooterNewsLetter = () => {
  return (
    <FooterNewsLetterStyled>
      {/* <h4>Our Newsletter</h4> */}
      <p >
      Vinoot Herbals offers Ayurvedic hair care through franchises, focusing on natural solutions for hair loss and scalp concerns.
      </p>
      <div className="subscribe-form" >
        {/* <Form.Control type="text" /> */}
        <CustomButton type="regular-pricing-btn">Register for Franchise</CustomButton>
      </div>
    </FooterNewsLetterStyled>
  );
};

export default FooterNewsLetter;
