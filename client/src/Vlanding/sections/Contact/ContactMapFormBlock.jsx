import React from "react";
import { AnimationOnScroll } from "react-animation-on-scroll";
import { Col, Row } from "react-bootstrap";

const ContactMapFormBlock = () => {
  return (
    <Row>
      <Col lg={12} className="my-2">
        <AnimationOnScroll animateIn="animate__fadeInLeft">
          <Map />
        </AnimationOnScroll>
      </Col>
    </Row>
  );
};

function Map() {
  return (
    <div className="google-map">
      <div
        className="mapouter"
        style={{
          position: "relative",
          textAlign: "right",
          height: "100%",
          width: "100%",
        }}
      >
        <div
          className="gmap_canvas"
          style={{
            overflow: "hidden",
            background: "none !important",
            height: "100%",
            width: "100%",
          }}
        >
          <iframe
            title="This is a unique title"
            width="100%"
            height="100%"
            id="gmap_canvas"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.5774862494895!2d77.56801147412182!3d13.062544512879793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae18048753b47d%3A0x2ba030c32a0e9fbe!2sVinoot%20Herbal!5e0!3m2!1sen!2sin!4v1717065428338!5m2!1sen!2sin"
            style={{ minHeight: "500px", border: "0" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}

export default ContactMapFormBlock;