import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Franchiseregistration/FranchiseReg.css";

const FranchiseReg = () => {
  const [franchiseData, setFranchiseData] = useState({
    franchisename: "",
    FranchiseID: "",
    mobileNumber: "",
    country: "",
    state: "",
    city: "",
    area: "",
    address: "",
    pincode: "",
  });

  const [adminData, setAdminData] = useState({
    fullname: "",
    userId: "",
    franchisename: "",
    FranchiseID: "",
    designation: "FranchiseAdmin",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update adminData and franchiseData with the current values from state and localStorage
      const createdBy = localStorage.getItem("userId");

      // Update adminData
      const updatedAdminData = {
        ...adminData,
        franchisename: franchiseData.franchisename,
        FranchiseID: franchiseData.FranchiseID,
        createdBy: createdBy, // Add CreatedBy from localStorage
      };

      // Update franchiseData
      const updatedFranchiseData = {
        ...franchiseData,
        createdBy: createdBy, // Add CreatedBy from localStorage
      };

      await axios.post("http://localhost:5001/api/admin", updatedAdminData);
      console.log("admin Data:", updatedAdminData);

      await axios.post(
        "http://localhost:5001/api/franchise",
        updatedFranchiseData
      );

      
      console.log("Franchise Data:", updatedFranchiseData);

      alert("Data submitted successfully.");
    } catch (error) {
      console.error("Registration failed:", error.response.data.error);
    }
  };

  const handleFranchiseInputChange = (e) => {
    setFranchiseData({ ...franchiseData, [e.target.name]: e.target.value });
  };

  const handleAdminInputChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };
  return (
    <div className="addfr-franchise-Reg">
      <div className="addfr-franchise-Logo">
        <div className="addfr-image">
          <img
            src="https://tse4.mm.bing.net/th?id=OIP.m4FmOjk0Bx-N4JaBzsBoTgHaEP&pid=Api&P=0&h=180"
            alt="Loading...!"
          />
        </div>
        <div className="addfr-Registration">
          <h2>Franchise Registration</h2>
        </div>
      </div>
      <div className="addfr-total">
        <h2 className="addfr-franchise-details">Franchise Form</h2>
        <form onSubmit={handleSubmit} className="addfr-franchiseReg-form">
          <div className="addfr-franchise-column">
            <div className="addfr-franchise-admin">
              <div className="addfr-franchise-detail-columns">
                <div className="addfr-column">
                  <div className="addfr-input-wrap">
                    <input
                      className="addfr-input"
                      type="text"
                      name="franchisename"
                      value={franchiseData.franchisename}
                      onChange={handleFranchiseInputChange}
                      placeholder=""
                      required
                    />
                    <label>
                      <span>Franchise Name</span>
                    </label>
                  </div>
                  <div className="addfr-input-wrap">
                    <input
                      className="addfr-input"
                      type="text"
                      name="FranchiseID"
                      value={franchiseData.FranchiseID}
                      onChange={handleFranchiseInputChange}
                      placeholder=""
                      required
                    />
                    <label>
                      <span>Franchise ID</span>
                    </label>
                  </div>
                  <div className="addfr-input-wrap">
                    <input
                      className="addfr-input"
                      type="text"
                      name="mobileNumber"
                      value={franchiseData.mobileNumber}
                      onChange={handleFranchiseInputChange}
                      placeholder=""
                      required
                    />
                    <label>
                      <span>Mobile Number</span>
                    </label>
                  </div>
                  <div className="addfr-input-wrap">
                    <input
                      className="addfr-input"
                      type="text"
                      name="country"
                      value={franchiseData.country}
                      onChange={handleFranchiseInputChange}
                      placeholder=""
                      required
                    />
                    <label>
                      <span>Country</span>
                    </label>
                  </div>
                  <div className="addfr-input-wrap">
                    <input
                      className="addfr-input"
                      type="text"
                      name="state"
                      value={franchiseData.state}
                      onChange={handleFranchiseInputChange}
                      placeholder=""
                      required
                    />
                    <label>
                      <span>State</span>
                    </label>
                  </div>
                </div>
                <div className="addfr-column">
                  <div className="addfr-input-wrap">
                    <input
                      className="addfr-input"
                      type="text"
                      name="city"
                      value={franchiseData.city}
                      onChange={handleFranchiseInputChange}
                      placeholder=""
                      required
                    />
                    <label>
                      <span>City</span>
                    </label>
                  </div>
                  <div className="addfr-column">
                    <div className="addfr-input-wrap">
                      <input
                        className="addfr-input"
                        type="text"
                        name="area"
                        value={franchiseData.area}
                        onChange={handleFranchiseInputChange}
                        placeholder=""
                        required
                      />
                      <label>
                        <span>Area</span>
                      </label>
                    </div>
                    <div className="addfr-input-wrap">
                      <input
                        className="addfr-input"
                        type="text"
                        name="address"
                        value={franchiseData.address}
                        onChange={handleFranchiseInputChange}
                        placeholder=""
                        required
                      />
                      <label>
                        <span>Address</span>
                      </label>
                    </div>
                    <div className="addfr-input-wrap">
                      <input
                        className="addfr-input"
                        type="text"
                        name="pincode"
                        value={franchiseData.pincode}
                        onChange={handleFranchiseInputChange}
                        placeholder=""
                        required
                      />
                      <label>
                        <span>Pincode</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="addfr-admin">
                <div className="addfr-column">
                  <h2 className="addfr-franchise-details-admin">Admin Form</h2>
                  <div className="addfr-input-wrap">
                    <input
                      className="addfr-input"
                      type="text"
                      name="fullname"
                      value={adminData.fullname}
                      onChange={handleAdminInputChange}
                      placeholder=""
                    />
                    <label>
                      <span>fullname</span>
                    </label>
                  </div>
                  <div className="addfr-input-wrap">
                    <input
                      className="addfr-input"
                      type="text"
                      name="userId"
                      value={adminData.userId}
                      onChange={handleAdminInputChange}
                      placeholder=""
                    />
                    <label>
                      <span>userId</span>
                    </label>
                  </div>
                  <div className="addfr-input-wrap">
                    <input
                      className="addfr-input"
                      type="text"
                      name="designation"
                      value={adminData.designation}
                      onChange={handleAdminInputChange}
                      placeholder=""
                      readOnly
                    />
                    <label>
                      <span>Designation</span>
                    </label>
                  </div>
                  <div className="addfr-input-wrap">
                    <input
                      className="addfr-input"
                      type="text"
                      name="email"
                      value={adminData.email}
                      onChange={handleAdminInputChange}
                      placeholder=""
                    />
                    <label>
                      <span>Email</span>
                    </label>
                  </div>
                  <div className="addfr-input-wrap">
                    <input
                      className="addfr-input"
                      type="text"
                      name="password"
                      value={adminData.password}
                      onChange={handleAdminInputChange}
                      placeholder=""
                    />
                    <label>
                      <span>Password</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button type="submit" className="addfr-submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FranchiseReg;
