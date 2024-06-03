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
        "Sit sint consectetur velit quisquam cupiditate impedit suscipit alias"
      }
    />

      <PortfolioBlock />
    </SectionContainer>
  );
};

export default Portfolio;
