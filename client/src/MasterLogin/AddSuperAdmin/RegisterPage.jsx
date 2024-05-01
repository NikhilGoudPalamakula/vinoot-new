// // RegisterPage.js


import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './RegisterPage.css'
import Sidebar from "../../Masterdata/Sidebar/Sidebar";
import MasterUserT from "../Masterusers/MasterUserT";


const RegisterPage = () => {
  const createdby = localStorage.getItem("userId")

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    userId: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    password: "",
    confirmPassword: "",
    gender: "",
    userType: "SuperAdmin",
    activeChangedBy: "none",
    createdBy: createdby,
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5001/api/register",
        formData
      );
      console.log("User registered:", res.data);
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error.response.data.error);
    }
  };

  return (
    <div className="super-regtoatl">
      <div>
        <Sidebar />
      </div>
      <div className="super-regright">
        <h2 className="super-rheading">Add Super Admin </h2>
        <div className="super-regright-1">
          <form className="super-regfrom" onSubmit={handleSubmit}>
            <div className="super-flex">
              <div>
                <div className="super-regdiv" >
                  <label>
                    <input
                      className="input1_rp"
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder=""
                      required
                    />
                    <span>Full Name</span>
                  </label>
                </div>
                <div className="super-regdiv" >
                  <label>
                    <input
                      className="input1_rp"
                      type="text"
                      name="userId"
                      value={formData.userId}
                      onChange={handleChange}
                      placeholder=""
                      required
                    />
                    <span>userId</span>
                  </label>
                </div>
                <div className="super-regdiv" >
                  <label>
                    <input
                      className="input1_rp"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder=""
                      required
                    />
                    <span>Email</span>
                  </label>
                </div>
                <div className="super-regdiv" >
                  <label>
                    <input
                      className="input1_rp"
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder=""
                      required
                    />
                    <span>Phone Number</span>
                  </label>
                </div>
              </div>
              {/* .......................................... */}
              <div className="super-flex1">
                <div className="super-regdiv" >
                  <label>
                    <input
                      className="input1_rp"
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      placeholder=""
                      required
                    />
                    <span>Date of Birth</span>
                  </label>
                </div>
                <div className="super-regdiv" >
                  <label>
                    <input
                      className="input1_rp"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder=""
                      required
                    />
                    <span>Password</span>
                  </label>
                </div>
                <div className="super-regdiv" >
                  <label>
                    <input
                      className="input1_rp"
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder=""
                      required
                    />
                    <span>Confirm Password</span>
                  </label>
                </div>
                <div className="super-regdiv" >
                  <label>
                  <select
                    className="input2_rp"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  </label>
                </div>
              </div>
            </div>
            <button className="submit_rp" type="submit">Register</button>
          </form>
          <div style={{ marginTop: '10%' }}><MasterUserT /></div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;