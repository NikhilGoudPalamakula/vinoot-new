import React from "react";
import SectionContainer from "../../components/SectionContainer";
import SectionHead from "../../components/SectionHead";
import PricingBlock from "./PricingBlock";

const Pricing = () => {
  return (
    <SectionContainer id={"whyus"} secName={"pricing-sec"}>
    <SectionHead
      head={"Whyus"}
      // text={
      //   "Sit sint consectetur velit quisquam cupiditate impedit suscipit alias"
      // }
    />

      <PricingBlock />
    </SectionContainer>
  );
};

export default Pricing;
