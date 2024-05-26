import { useState } from "react";
import React from 'react'
import './FranchiseLoginDetailsIcon.css'

import { FaRegCircleUser } from "react-icons/fa6";

const FranchiseLoginDetailsIcon = () => {

    const [showDropdown, setShowDropdown] = useState(false);
    // const createdBy = localStorage.getItem("userId");
    const franchiseName = localStorage.getItem("franchisename");
    const franchiseiD = localStorage.getItem("franchiseID");
    const userId = localStorage.getItem("userId");

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
      };
    


  return (
    <div className="franchise-login-details-icon-container-vik">
    <div onClick={toggleDropdown} className="icon-container-vik">
        <FaRegCircleUser />
    </div>
    {showDropdown && (
        <div className="dropdown-vik">
          <p>Franchise Name: {franchiseName}</p>
          <p>Franchise ID: {franchiseiD}</p>
          <p>User ID: {userId}</p>
        </div>
      )}
    </div>
  )
}

export default FranchiseLoginDetailsIcon
