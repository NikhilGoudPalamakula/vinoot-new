import React, { useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { RiAdminFill } from "react-icons/ri";
import { FaCodeBranch } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { MdCategory } from "react-icons/md";
import { BsGlobeCentralSouthAsia } from "react-icons/bs";
import { FaCity } from "react-icons/fa";
import { SiGooglestreetview } from "react-icons/si";
import { MdLogout } from "react-icons/md";
import { PiUsersFourFill } from "react-icons/pi";

const SuperSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div>
      <div className={`side-bar-container ${isOpen ? "open" : ""}`}>
        <div className="v-logo">
          <img
            src="https://vinootherbal.com/wp-content/uploads/2024/02/grrb-1-1536x804.png"
            alt="logo"
          />
        </div>
        <div className="sidebar-list-items">
          <ul className="first-lists">
            {/* <Link to="/FrSidebar" className='sidebar-links' ><li className={activeItem === 'dashboard' ? 'active' : ''} onClick={() => handleItemClick('dashboard')}><MdDashboard className='icon' />Dashboard</li></Link>  */}
            <Link to="/Franchiseadmintogglebutton" className="sidebar-links">
              <li
                className={activeItem === "superadmins" ? "active" : ""}
                onClick={() => handleItemClick("superadmins")}
              >
                <RiAdminFill className="icon" />
                Super Admin's
              </li>
            </Link>
            <Link to="/FranchiseDetails" className="sidebar-links">
              {" "}
              <li
                className={activeItem === "franchise" ? "active" : ""}
                onClick={() => handleItemClick("franchise")}
              >
                <FaCodeBranch className="icon" />
                Frachises
              </li>{" "}
            </Link>
            <Link to="/Franchisepatientbilling" className="sidebar-links">
              {" "}
              <li
                className={activeItem === "patients" ? "active" : ""}
                onClick={() => handleItemClick("patients")}
              >
                <PiUsersFourFill className="icon" />
                Patients
              </li>{" "}
            </Link>
            <Link to="/TreatmentCategory" className="sidebar-links">
              {" "}
              <li
                className={activeItem === "treatmentcat" ? "active" : ""}
                onClick={() => handleItemClick("treatmentcat")}
              >
                <BiSolidCategory className="icon" />
                Treatment Category
              </li>
            </Link>
            <Link to="/TreatmentPlan" className="sidebar-links">
              {" "}
              <li
                className={activeItem === "treatmentplan" ? "active" : ""}
                onClick={() => handleItemClick("treatmentplan")}
              >
                <MdCategory className="icon" />
                Treatment Plan
              </li>
            </Link>
            <Link to="/States" className="sidebar-links">
              {" "}
              <li
                className={activeItem === "states" ? "active" : ""}
                onClick={() => handleItemClick("states")}
              >
                <BsGlobeCentralSouthAsia className="icon" />
                States
              </li>
            </Link>
            <Link to="/Cities" className="sidebar-links">
              {" "}
              <li
                className={activeItem === "cities" ? "active" : ""}
                onClick={() => handleItemClick("cities")}
              >
                <FaCity className="icon" />
                Cities
              </li>
            </Link>
            <Link to="/Area" className="sidebar-links">
              <li
                className={activeItem === "areas" ? "active" : ""}
                onClick={() => handleItemClick("areas")}
              >
                <SiGooglestreetview className="icon" />
                Areas
              </li>
            </Link>
            <Link to="/" className="sidebar-links">
              {" "}
              <li
                className={activeItem === "logout" ? "active" : ""}
                onClick={() => handleLogOut() && handleItemClick("logout")}
              >
                <MdLogout className="icon" />
                Logout
              </li>
            </Link>
          </ul>
          {/* <div className='side-bar-second-lists'>
                        <h5>Accounts Pages</h5>
                        <ul className='second-lists'>
                            <li className={activeItem === 'notification' ? 'active' : ''} onClick={() => handleItemClick('notification')}><FaBell className='icon' />Notification</li>
                            <li className={activeItem === 'profile' ? 'active' : ''} onClick={() => handleItemClick('profile')}><IoPerson className='icon' />Profile</li>
                        </ul>
                    </div>
                    <div className='documentaion-container'>
                        <div className='question-box'>
                            <FaQuestionCircle className='question-icon' />
                        </div>
                        <div className='need-help'>
                            <span>Need Help ?</span>
                        </div>
                        <div className='docs'>
                            <span>Please Check our docs</span>
                        </div>
                        <div className='documentaion-btn'>
                            <button>DOCUMENTATION </button>
                        </div>
                    </div> */}
        </div>
      </div>
      <div className="hamburger-menu" onClick={toggleSidebar}>
        <div className={`line ${isOpen ? "open" : ""}`}></div>
        <div className={`line ${isOpen ? "open" : ""}`}></div>
        <div className={`line ${isOpen ? "open" : ""}`}></div>
      </div>
    </div>
  );
};

export default SuperSidebar;
