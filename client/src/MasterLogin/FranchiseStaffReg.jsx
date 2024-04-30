import React, { useState } from "react";
import axios from "axios";

const FranchiseStaffReg = () => {
  const [adminData, setAdminData] = useState({
    username: "",
    Adminid: "",
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
      const createdBy = localStorage.getItem("username");
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
    } catch (error) {
      console.error("Failed to submit data", error);
      alert("Failed to submit data. Please try again.");
    }
  };

  const handleAdminInputChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Franchise Form</h2>
      <form onSubmit={handleSubmit}>


        <h2>Admin Form</h2>
        <input
          type="text"
          name="username"
          value={adminData.username}
          onChange={handleAdminInputChange}
          placeholder="username"
        />
        <input
          type="text"
          name="Adminid"
          value={adminData.Adminid}
          onChange={handleAdminInputChange}
          placeholder="Admin ID"
        />
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
        <input
          type="text"
          name="email"
          value={adminData.email}
          onChange={handleAdminInputChange}
          placeholder="Email"
        />
        <input
          type="text"
          name="password"
          value={adminData.password}
          onChange={handleAdminInputChange}
          placeholder="Password"
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FranchiseStaffReg;
