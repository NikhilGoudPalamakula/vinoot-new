import React from "react";
import SectionContainer from "../../components/SectionContainer";
import SectionHead from "../../components/SectionHead";
import ServicesBlock from "./ServicesBlock";

const Services = () => {
  return (
    <SectionContainer id={"services"} secName={"services-sec"}>
      <SectionHead
        head={"services"}
        text={
          "Vinoot Herbal quality ingredients and experienced formulas can help you get amazing results."
        }
      />
      <ServicesBlock />
    </SectionContainer>
  );
};

export default Services;
