import React, { useState } from "react";
// import Staffregistration from "../FranchisestaffReg/FranchiseStaffReg";
// import Franchisestaffdetails from "../FranchisestaffReg/Franchisestaffdetails";
import PatientForm from "../Addpatient";
import Patientdetails1 from "../Patientdetails1";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoPersonAdd } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
// import FranchiseadminSidebar from "../Franchiseadminsidebar/Franchiseadminsidebar";
import ReceptionSidebar from "../../ReceptionSidebar/ReceptionSidebar";

import "../FranchiseToggledetails/Togglepatients.css";
const Togglepatients = () => {
  const [showComponent1, setShowComponent1] = useState(true);

  const toggleComponent = () => {
    setShowComponent1(!showComponent1);
  };

  const buttonIcon = showComponent1 ? <FaUsers /> : <IoPersonAdd />;

  return (
    <div className="fra-pat-togg-total">
      <div>
        <ReceptionSidebar />
      </div>
      <div className="fra-pat-togg-right">
        <div className="fra-pat-togg-r1">
          <h1>{showComponent1 ? "Patient Form" : "Patients"}</h1>
          <button className="pattoggle-button123" onClick={toggleComponent}>
            {showComponent1 ? "Patients" : "Patient Form"}{" "}
            <span className="pattog-icon">{buttonIcon}</span>
          </button>
        </div>

        {showComponent1 ? <PatientForm /> : <Patientdetails1 />}
      </div>
    </div>
  );
};

export default Togglepatients;
