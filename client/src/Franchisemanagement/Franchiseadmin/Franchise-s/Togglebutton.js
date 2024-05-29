import React, { useState } from "react";
import Staffregistration from "../FranchisestaffReg/FranchiseStaffReg";
import Franchisestaffdetails from "../FranchisestaffReg/Franchisestaffdetails";
import { IoPersonAdd } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
import FranchiseadminSidebar from "../Franchiseadminsidebar/Franchiseadminsidebar";
import "./Togglebutton.css";
const Franchisetogglebutton = () => {
  const [showComponent1, setShowComponent1] = useState(true);

  const toggleComponent = () => {
    setShowComponent1(!showComponent1);
  };

  const buttonIcon = showComponent1 ? <FaUsers /> : <IoPersonAdd />;

  return (
    <div className="fra-togg-total">
      <div>
        <FranchiseadminSidebar />
      </div>
      <div className="fra-togg-right">
        <div className="fra-togg-r1">
          <h1>{showComponent1 ? "Staff Registration" : "Staff Details"}</h1>
          <button className="toggle-button123" onClick={toggleComponent}>
            {showComponent1 ? "Staff Details" : "Staff Registration"}{" "}
            <span className="tog-icon">{buttonIcon}</span>
          </button>
        </div>

        {showComponent1 ? <Staffregistration /> : <Franchisestaffdetails />}
      </div>
    </div>
  );
};

export default Franchisetogglebutton;
