import React, { useState } from "react";
// import Staffregistration from "../FranchisestaffReg/FranchiseStaffReg";
import RegisterPage from "../AddSuperAdmin/RegisterPage";
// import Franchisestaffdetails from "../FranchisestaffReg/Franchisestaffdetails";
import MasterUserT from "../Masterusers/MasterUserT";
import { IoPersonAdd } from "react-icons/io5";
import { FaUsers } from "react-icons/fa";
// import FranchiseadminSidebar from "../../Franchisemanagement/Franchiseadmin/Franchiseadminsidebar/Franchiseadminsidebar";
import Sidebar from "../../Masterdata/Sidebar/Sidebar";

import "../FranchiseAdmin-s/AdminTogglebutton.css";
const AdminTogglebutton = () => {
  const [adminshowComponent1, setAdminShowComponent1] = useState(true);

  const admintoggleComponent = () => {
    setAdminShowComponent1(!adminshowComponent1);
  };

  const buttonIcon = adminshowComponent1 ? <FaUsers /> : <IoPersonAdd />;

  return (
    <div className="fra-adm-togg-total">
      <div>
        <Sidebar />
      </div>
      <div className="fra-adm-togg-right">
        <div className="fra-adm-togg-r1">
          <h1>{adminshowComponent1 ? "Add Super Admin" : "Super Admins"}</h1>
          <span className="fra-1234"></span>
          <button
            className="admin-toggle-button123"
            onClick={admintoggleComponent}
          >
            {adminshowComponent1 ? "Super Admins" : "Add Super Admin"}{" "}
            <span className="admintog-icon">{buttonIcon}</span>
          </button>
        </div>

        {adminshowComponent1 ? <RegisterPage /> : <MasterUserT />}
      </div>
    </div>
  );
};

export default AdminTogglebutton;
