import React from "react";
import "./Whyus.css";
import Footer from "./Footer";
import Vnavbar from "./Vnavbar";
import img57 from "../assets/img/why1.jpg";
import img58 from "../assets/img/why2.jpg";
import img59 from "../assets/img/why3.jpg";
import img60 from "../assets/img/why4.jpg";
import img61 from "../assets/img/paste.jpg";
import yimg1 from "../assets/img/yimg1.jpg";
import yimg2 from "../assets/img/yimg2.jpg";
import yimg3 from "../assets/img/yimg3.jpg";
import yimg4 from "../assets/img/yimg4.jpg";
import yimg5 from "../assets/img/yimg5.jpg";
import yimg6 from "../assets/img/yimg6.jpg";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { motion } from "framer-motion";
import Faqslan from "./Faqslan";

const Whyus = () => {
  return (
    <>
      <Vnavbar />
      <div className="Whyhead1">
        <img
          src="https://vinootherbal.com/wp-content/uploads/2024/02/cover.png"
          alt=""
        />

        <h1>Why Us</h1>
      </div>

      <div className="whyheadtext1">
        <h1>Get the Best Results from Product.</h1>
        <h6>
          Vinoot Herbal quality ingredients and experienced formulas can help
          you get amazing results.
        </h6>
      </div>

      <div className="whyBestResults1">
        <div className="whyBestResults1-subdiv1">
          <motion.div
            initial={{ x: 300, y: 150 }}
            whileInView={{ x: 0, y: 0 }}
            transition={{ duration: 1.2 }}
            className="whyBestResults1-subdiv1-sub1"
          >
            <div className="whyBestResults1-subdiv1-sub1imgcon ">
              {" "}
              <img src={img57} alt="" />{" "}
            </div>
            <div className="whyBestResults1-subdiv1-sub1imgtext ">
              <h3>Hair dandruff</h3>
              <h6>Vinoot Herbal Effective Solution for Hair Dandruff.</h6>
            </div>
          </motion.div>
          <motion.div
            initial={{ x: 300, y: -150 }}
            whileInView={{ x: 0, y: 0 }}
            transition={{ duration: 1.2 }}
            className="whyBestResults1-subdiv1-sub1"
          >
            <div className="whyBestResults1-subdiv1-sub1imgcon ">
              <img src={img58} alt="" />{" "}
            </div>
            <div className="whyBestResults1-subdiv1-sub1imgtext ">
              <h3>Hair fall</h3>
              <h6>
                Vinoot Herbal powerful Ayurvedic treatments might help prevent
                hair loss naturally. Restore your hair's health and shine right
                now.
              </h6>
            </div>
          </motion.div>
        </div>
        <div className="whyBestResults1-subdiv2">
          <img src={img61} alt="" />
        </div>
        <div className="whyBestResults1-subdiv1">
          <motion.div
            initial={{ x: -300, y: 150 }}
            whileInView={{ x: 0, y: 0 }}
            transition={{ duration: 1.2 }}
            className="whyBestResults1-subdiv1-sub1"
          >
            <div className="whyBestResults1-subdiv1-sub1imgcon ">
              <img src={img59} alt="" />
            </div>
            <div className="whyBestResults1-subdiv1-sub1imgtext ">
              <h3>Hair Re-growth</h3>
              <h6>
                Vinoot Herbal Hair Regrowth Solution provides natural,
                effective, and permanent results.
              </h6>
            </div>
          </motion.div>
          <motion.div
            initial={{ x: -300, y: -150 }}
            whileInView={{ x: 0, y: 0 }}
            transition={{ duration: 1.2 }}
            className="whyBestResults1-subdiv1-sub1"
          >
            <div className="whyBestResults1-subdiv1-sub1imgcon ">
              <img src={img60} alt="" />
            </div>
            <div className="whyBestResults1-subdiv1-sub1imgtext ">
              <h3>Ayurveda Franchise Opportunity</h3>
              <h6>
                Join Vinoot Herbal A profitable Ayurvedic franchising
                opportunity awaits you.
              </h6>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="whyheadtext2">
        <h1>Why Us</h1>
        <h6>
          Enjoy the Vinoot Herbal variation: unmatched Ayurvedic knowledge, a
          profitable business plan, comprehensive training, and continuous
          marketing assistance for franchisees
        </h6>
      </div>


      <div className="whyusvariationcon">
        <div className="whyusvariationcon-sub1">
          <div className="whyusvariationcon-sub1img">
            <img src={yimg1} alt="" />
          </div>
          <div className="whyusvariationcon-sub1text">
            <h3>Experienced Team</h3>
            <h6>
              40 years of Ayurveda expertise Trust our experienced herbal team
            </h6>
          </div>
        </div>
        <div className="whyusvariationcon-sub1">
          <div className="whyusvariationcon-sub1img">
            <img src={yimg2} alt="" />
          </div>
          <div className="whyusvariationcon-sub1text">
            <h3>Strong Infrastructure</h3>
            <h6>
              Strong Infrastructure Herbal Solutions for Wellness and Health
            </h6>
          </div>
        </div>
        <div className="whyusvariationcon-sub1">
          <div className="whyusvariationcon-sub1img">
            <img src={yimg3} alt="" />
          </div>
          <div className="whyusvariationcon-sub1text">
            <h3>Researched Products</h3>
            <h6>
              Researched Products provides high-quality herbal extracts for use in successful formulations.
            </h6>
          </div>
        </div>
        <div className="whyusvariationcon-sub1">
          <div className="whyusvariationcon-sub1img">
            <img src={yimg4} alt="" />
          </div>
          <div className="whyusvariationcon-sub1text">
            <h3>Strong Portfolio</h3>
            <h6>
              Vinoot Herbal is building a strong portfolio of Ayurvedic solutions.
            </h6>
          </div>
        </div>
        <div className="whyusvariationcon-sub1">
          <div className="whyusvariationcon-sub1img">
            <img src={yimg5} alt="" />
          </div>
          <div className="whyusvariationcon-sub1text">
            <h3>Natural Products</h3>
            <h6>
              Vinoot Herbal offers 100% natural, high-quality products that are natural.
            </h6>
          </div>
        </div>
        <div className="whyusvariationcon-sub1">
          <div className="whyusvariationcon-sub1img">
            <img src={yimg6} alt="" />
          </div>
          <div className="whyusvariationcon-sub1text">
            <h3>Reliable</h3>
            <h6>
              Vinoot Herbal well researched formulas are reliable
            </h6>
          </div>
        </div>
      </div>
      <Faqslan/>
      <Footer />
    </>
  );
};

export default Whyus;
