import React from "react";
import SectionContainer from "../../components/SectionContainer";
import SectionHead from "../../components/SectionHead";
import PortfolioBlock from "./PortfolioBlock";

const Portfolio = () => {
  return (
    <SectionContainer id={"products"} secName={"portfolio-sec"}>
    <SectionHead
      head={"Products"}
      text={
        "Vinoot Herbal offers 100% natural, high-quality products that are natural."
      }
    />

      <PortfolioBlock />
    </SectionContainer>
  );
};

export default Portfolio;
