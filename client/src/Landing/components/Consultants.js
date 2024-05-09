import React from "react";
import "./Consultants.css";
import Image2 from "../assets/img/cartoonhair.jpg";
import { motion } from "framer-motion";

const Consultants = () => {
  return (
    <div className="tot-contain621ss ">
      {/* <h2 className='consult621s'>Consultants</h2> */}
      <div className="heading-consult621s">
        <motion.div
          initial={{ y: -200 }}
          whileInView={{ y: 0 }}
          transition={{ duration: 1.8 }}>
          <h1 className="head-consult621s">
            <span className="consul-spn">Our </span>Expert Consultants
          </h1>
        </motion.div>
      </div>

      <div className="tot-contain621s">
        <div className="container621s">
          <figure className="card621s img-block621s">
            <img src="https://vinootherbals.com/images/asha.jpg" alt="asha" />
          </figure>
          <div className="card621s info-block621s">
            <div className="info621s">
              <h2>Dr. Asha M S</h2>
              <p>
                <span className="desig">BAMS, YIC, CCN, PGDCG, PGDPCG</span>
                <br></br>
                <br></br>
                <span>
                  She is an expert in General Consultancy and Skin Care.
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="container621s">
          <figure className="card621s img-block621s">
            <img
              src="https://vinootherbals.com/images/channa.jpg"
              alt="channa"
            />
          </figure>
          <div className="card621s info-block621s">
            <div className="info621s">
              <h2>Mr.Channabasappa</h2>
              <span className="desig">
                INVENTOR, MD & CEO<br></br>VINOOT HERBALS
              </span>
              <p>
                He is an expert Constultant for Hair regrowth and maintenance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consultants;
