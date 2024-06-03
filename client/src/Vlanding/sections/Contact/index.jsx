import React from "react";
import SectionContainer from "../../components/SectionContainer";
import SectionHead from "../../components/SectionHead";
import ContactInfoBlock from "./ContactInfoBlock";
import ContactMapFormBlock from "./ContactMapFormBlock";

const Contact = () => {
  return (
    <SectionContainer id={"contact"} secName={"contact-sec"}>
      <SectionHead
        head={"contact"}
        text={
          "Discover natural solutions for hair wellness! Vinoot Herbals offers Ayurveda-based treatments & consultations. Contact us to learn more & unlock your healthiest hair."
        }
      />
      <ContactInfoBlock />
      <ContactMapFormBlock />
    </SectionContainer>
  );
};

export default Contact;
