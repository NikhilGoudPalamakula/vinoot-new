import React from "react";
import {Col, Container, Row} from "react-bootstrap";
import {FooterStyled} from "./footer.styled";
import {footerLinks} from "./footerData";
import FooterListLinks from "./FooterListLinks";
import FooterNewsLetter from "./FooterNewsLetter";
import FooterSquare from "./FooterSquare";

const Footer = () => {
  const {usefulLinks, servicesLinks} = footerLinks;
  return (
    <>
      <FooterStyled>
        <Container>
          <hr />
          <Row className="py-3">
            <Col md={12} lg={4}>
              <FooterSquare />
            </Col>
            <Col sm={12} md={6} lg={2}>
              <FooterListLinks {...usefulLinks} />
            </Col>
            <Col sm={12} md={6} lg={2}>
              <FooterListLinks {...servicesLinks} />
            </Col>
            <Col md={12} lg={4}>
              <FooterNewsLetter />
            </Col>
          </Row>
          <hr />
              <div className="matrical" style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
            <span>© Company 2024. All rights reserved.
              Developed By <a href="https://www.matrical.in/" target="_blank"  rel="noopener noreferrer">Matrical Technologies PVT LTD</a></span>
          </div>
        </Container>
      </FooterStyled>
    </>
  );
};

export default Footer;
