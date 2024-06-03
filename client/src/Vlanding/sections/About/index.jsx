import React from "react";
import {Col, Image} from "react-bootstrap";
import SectionContainer from "../../components/SectionContainer";
import AboutBlocks from "./AboutBlocks";
// import AboutSponsor from "./AboutSponsor";
import {AiOutlineCheckCircle} from "react-icons/ai";
import {RowReversedStyled} from "./About.styled";
import {paragraphs} from "./aboutData";
import aboutImage from "../../assets/about.png";

const About = () => {
  return (
    <>
      <SectionContainer id={"about"} secName={"about-sec"}>
        <RowReversedStyled className="my-2">
          <Col lg={6} className="mb-3">
            <h3 style={{fontSize:'3rem'}}>
            Since 2009, Our History
            </h3>
            <ul>
              {paragraphs.map((par, idx) => (
                <li className="mb-3" key={idx}>
                  <AiOutlineCheckCircle
                    className="me-1"
                    size={24}
                    color={"var(--ds-blood)"}
                  />
                  {par}
                </li>
              ))}
            </ul>
            <p style={{letterSpacing:'1.5px',textAlign:'justify'}}>
            As the founding father of Vinoot Herbal Products, I, Channabasappa Ullagaddi a science graduate with 18 years of experience in the petrochemical industry in India & Abroad. Upon returning from abroad, I developed a keen interest in Ayurveda due to a personal encounter with a young woman experiencing hair loss issues. This led me to invent a herbal product for hair regrowth, which has garnered positive feedback and secured a patent. Establishing Vinoot Herbal Specialities Pvt Ltd in Bangalore in 2010, I later founded Vinoot Herbal Specialities, focusing on hair regrowth therapies in 2017. With over 1500 successful treatments, I am now expanding through a franchise model to make our therapies accessible to all. Despite interest from a top FMCG company, we opted to retain ownership of our patented herbal molecules.
            </p>
          </Col>
          <Col lg={6} className="mb-3">
            <Image
              src={aboutImage}
              alt="about-img"
              width="100%"
              height="80%"
            />
          </Col>
        </RowReversedStyled>
        <AboutBlocks />
      </SectionContainer>
      {/* <AboutSponsor /> */}
    </>
  );
};

export default About;
