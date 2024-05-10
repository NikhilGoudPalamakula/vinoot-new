import React from "react";
import "./CtaSection.css";
// import cta data
import { ctaData } from "../data";

// import icons
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";

const CtaSection = () => {
  // destructure cta data
  const { title, subtitle, btnText1, btnText2 } = ctaData;
  return (
    <section className="border-t-2" data-aos="fade-up">
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row justify-between items-center">
          {/* text */}
          <div className="py-12 xl:py-24 text-center xl:text-left">
            <h2 className="h2 mb-5" data-aos="fade-up" data-aos-delay="100">
              {/* {title} */}
              <p style={{ fontSize: "2.2rem", fontWeight: "500" }}>
                For more information Contact{" "}
                <span className="consul-spn">Us</span>
              </p>
            </h2>
            <p className="lead" data-aos="fade-up">
              {subtitle}
            </p>
          </div>
          {/* buttons */}
          <div className="flex flex-col xl:flex-row gap-y-4 gap-x-[30px] ">
            {/* <button
              className='btn btn-secondary'
              data-aos='fade-up'
              data-aos-delay='300'
            >
              {btnText1}
            </button> */}
            <Link className="login-olink" to="/Contactus">
              <button className="login-link">
                {btnText2}
                <BsArrowRight className="login-arrow" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
