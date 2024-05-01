import React, { useState } from "react";
import "./FranchiseStaffReg.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FranchiseadminSidebar from "../Franchiseadminsidebar/Franchiseadminsidebar";

const FranchiseStaffReg = () => {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState({
    fullname: "",
    userId: "",
    franchisename: "",
    FranchiseID: "",
    designation: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update adminData and franchiseData with the current values from state and localStorage
      const createdBy = localStorage.getItem("userId");
      const franchiseName = localStorage.getItem("franchisename");
      const FranchiseiD = localStorage.getItem("FranchiseID");
      // Update adminData
      const updatedAdminData = {
        ...adminData,
        franchisename: franchiseName,
        FranchiseID: FranchiseiD,
        createdBy: createdBy, // Add CreatedBy from localStorage
      };

      // Make the POST request with updated adminData
      await axios.post("http://localhost:5001/api/admin", updatedAdminData);
      console.log("admin Data:", updatedAdminData);

      alert("Data submitted successfully.");
      navigate("/FranchiseAdmin");
    } catch (error) {
      console.error("Failed to submit data", error);
      alert("Failed to submit data. Please try again.");
    }
  };

  const handleAdminInputChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  return (
    <div className="fraddstaff-total">
      <div>
        <FranchiseadminSidebar />
      </div>

      <div className="fradmin-right">
        <h2 className="addfr-franchise-from-Name">Franchise Form</h2>
        <form onSubmit={handleSubmit} className="fr-admin-form">
          <h2>Admin Form</h2>
          <div className="addfr-inputs-wraps">
            <input
              className="addfr-inputs"
              type="text"
              name="fullname"
              value={adminData.fullname}
              onChange={handleAdminInputChange}
              placeholder=""
              required
            />
            <label>
              <span>fullname </span>
            </label>
          </div>
          <div className="addfr-inputs-wraps">
            <input
              className="addfr-inputs"
              type="text"
              name="userId"
              value={adminData.userId}
              onChange={handleAdminInputChange}
              placeholder=""
              required
            />
            <label>
              <span>userId </span>
            </label>
          </div>
          <div className="addfr-inputs-wraps">
            <select
              name="designation"
              value={adminData.designation}
              onChange={handleAdminInputChange}
            >
              <option value="">Select designation</option>
              <option value="Doctor">Doctor</option>
              <option value="Reception">Reception</option>
              <option value="Thearpy">Therapy</option>
              <option value="FranchiseAdmin">FrAdmin</option>
            </select>
          </div>
          <div className="addfr-inputs-wraps">
            <input
              className="addfr-inputs"
              type="text"
              name="email"
              value={adminData.email}
              onChange={handleAdminInputChange}
              placeholder=""
              required
            />
            <label>
              <span>Email </span>
            </label>
          </div>
          <div className="addfr-inputs-wraps" style={{ marginBottom: "2vh" }}>
            <input
              className="addfr-inputs"
              type="text"
              name="password"
              value={adminData.password}
              onChange={handleAdminInputChange}
              placeholder=""
              required
            />
            <label>
              <span>Password </span>
            </label>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default FranchiseStaffReg;
