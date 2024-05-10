import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { FaBriefcase } from "react-icons/fa";
import { GiSparkles } from "react-icons/gi";
import { motion } from "framer-motion";


const ContactFranch = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handelSubmit = (e) => {
    e.preventDefault();

    const service_id = "service_qwkavtp";
    const template_id = "template_ubqht7j";
    const user_id = "qItHR8c5VGyGFDAC8";

    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: "Vinooth",
      message: message,
    };

    emailjs
      .send(service_id, template_id, templateParams, user_id)
      .then((response) => {
        console.log("email sent successfully", response);
        setName("");
        setEmail("");
        setMessage("");
      })
      .catch((error) => {
        console.log("error sending email", error);
      });
  };

  return (
    <>
      <div className="contactFranchmaincon" style={{margin:'auto'}}>
        <div className="contactFranch  d-flex" style={{marginLeft:'10%'}}>
          <div>
          <motion.div
            initial={{ scale:0.55,opacity:0.8 ,x:-100 }}
            whileInView={{ scale:1.02 ,opacity:1 ,x:0}}
            transition={{ duration: 1.2 }}>
                 <form class="formconfrach" onSubmit={handelSubmit}>
              <span class="titleconfrach">For Franchise Contact Us</span>
              <label for="username" class="labelconfrach">
                Username
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required=""
                class="inputconfrach"
                placeholder="Full Name"
              />
              <label for="email" class="label">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required=""
                placeholder="Email"
                class="inputconfrach"
              />
              <label for="password" class="label">
                Message
              </label>
              <textarea
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required=""
                class="inputconfrach"
                placeholder="Message"
              />
              <button type="submit" class="submitconfrach">
                Contact Us
              </button>
            </form>
            </motion.div>

            <div>
              <h6 style={{ textAlign: "center" }}>Get a Free Expert Advice!</h6>
              <h6 style={{ textAlign: "center" }}>+91 8904980190</h6>
              <h6 style={{ textAlign: "center" }}>vinootherbal2024@gmail.com</h6>
            </div>
          </div>
          <div className="contactFranchleftcards">
            <div class="m-6 bg-gray-100 max-w-[80%] rounded-xl  hover:scale-101 duration-700 p-4">
             <div className="d-flex justify-stretch gap-8">
             <figure class="w-10 h-10 p-2 bg-green-600 rounded-md ">
                <FaBriefcase
                  className="text-white"
                  style={{ marginLeft: "3px", marginTop: "3px" }}
                />
              </figure>
              <h4 class="py-2 text-gray-700 font-bold text-center">OUR REQUIRMENTS</h4>

             </div>
              <p class="text-sm leading-7 text-gray-700 font-semibold ">
                Space of minimum 500 sq feet carpet area for the clinic
              </p>
              <p class="text-sm leading-7 text-gray-700 font-semibold  d-flex">
                Investment of approx Rs 2500 per sq feet.
              </p>
            </div>
            <div class="m-6 bg-gray-100 max-w-[80%] rounded-xl  hover:scale-101 duration-700 p-4">
             <div className="d-flex justify-stretch gap-8">
             <figure class="w-10 h-10 p-2 bg-green-600 rounded-md">
                <FaBriefcase
                  className="text-white"
                  style={{ marginLeft: "3px", marginTop: "3px" }}
                />
              </figure>
              <h4 class="py-2 text-gray-700 font-bold text-center">
                What you can expect from us?
              </h4>
             </div>
              <p class="text-sm leading-7 text-gray-700 font-semibold ">
                Site Selection
              </p>
              <p class="text-sm leading-7 text-gray-700 font-semibold  d-flex">
                Detailed Interior Layout & Plan will be provided
              </p>
              <p class="text-sm leading-7 text-gray-700 font-semibold  d-flex">
                Recruitment of all Employees including Doctor & Staff
              </p>
              <p class="text-sm leading-7 text-gray-700 font-semibold  d-flex">
                Standard Operating Procedures to Manage Center, Orientation &
                Know-How of the Business
              </p>
              <p class="text-sm leading-7 text-gray-700 font-semibold  d-flex">
                Support to Launch Center
              </p>
              <p class="text-sm leading-7 text-gray-700 font-semibold  d-flex">
                Marketing & Brand Building Support
              </p>
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactFranch;
