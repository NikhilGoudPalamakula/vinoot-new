import React from "react";
import "./img.css";
// import CustomButton from "../CustomButton";
import {PricingCardStyled} from "./pricingCard.styled";
const PricingCard = ({bloodState, planType,image,list}) => {
  return (
    <PricingCardStyled bloodState={bloodState} planType={planType}>
      <h3>{planType}</h3>
      <img
        className="cimg"
        src={image}
        alt=""
      />

      <ul style={{listStyle:'none'}}>
        {list.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    
    </PricingCardStyled>
  );
};

export default PricingCard;
