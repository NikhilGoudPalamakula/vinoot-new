import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FooterStyled } from "./footer.styled";
import { footerLinks } from "./footerData";
import FooterListLinks from "./FooterListLinks";
import FooterNewsLetter from "./FooterNewsLetter";
import FooterSquare from "./FooterSquare";

const Footer = () => {
  const { usefulLinks } = footerLinks;

  const [, setIsOpen] = useState(false);
  const [, setNavBarScrolled] = useState(false);

  const handleResize = () => {
    if (window.innerWidth >= 992) {
      setIsOpen(false);
    }
  };

  const changeBackground = () => {
    if (window.scrollY >= 50) {
      setNavBarScrolled(true);
    } else {
      setNavBarScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => window.removeEventListener("scroll", changeBackground);
  });

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
            {/* <Col sm={12} md={6} lg={2}>
              <FooterListLinks {...servicesLinks} />
            </Col> */}
            <Col md={12} lg={4}>
              <FooterNewsLetter />
            </Col>
          </Row>
          <hr />
          <div className="matrical" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span>
              © Copyright 2024. All rights reserved. Developed By{" "}
              <a
                style={{ textDecoration: 'none', color: 'green' }}
                href="https://www.matrical.in/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Matrical Technologies PVT LTD
              </a>
            </span>
          </div>
        </Container>
      </FooterStyled>
    </>
  );
};

export default Footer;
