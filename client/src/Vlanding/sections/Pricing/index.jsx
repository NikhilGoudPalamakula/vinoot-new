import React from "react";
import SectionContainer from "../../components/SectionContainer";
import SectionHead from "../../components/SectionHead";
import PricingBlock from "./PricingBlock";

const Pricing = () => {
  return (
    <SectionContainer id={"whyus"} secName={"pricing-sec"}>
    <SectionHead
      head={"Whyus"}
      text={
        "Enjoy the Vinoot Herbal variation: unmatched Ayurvedic knowledge, a profitable business plan, comprehensive training, and continuous marketing assistance for franchisees"
      }
    />

      <PricingBlock />
    </SectionContainer>
  );
};

export default Pricing;
