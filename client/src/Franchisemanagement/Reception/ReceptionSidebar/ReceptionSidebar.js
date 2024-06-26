import React, { useState } from "react";
// import './Sidebar.css';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { RiBillFill } from "react-icons/ri";
import { TbListDetails } from "react-icons/tb";
import { IoPersonAddSharp } from "react-icons/io5";
import FranchiseLoginDetailsIcon from "../../Franchiseadmin/FranchiseLoginDetailsIcon";

const ReceptionSidebar = () => {
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
      <FranchiseLoginDetailsIcon />

      <div className={`side-bar-container ${isOpen ? "open" : ""}`}>
        <div className="v-logo">
          <img
            src="https://vinootherbal.com/wp-content/uploads/2024/02/grrb-1-1536x804.png"
            alt="logo"
          />
        </div>
        <div className="sidebar-list-items">
          <ul className="first-lists">
            <Link to="/Recepttion" className="sidebar-links">
              <li
                className={activeItem === "dashboard" ? "active" : ""}
                onClick={() => handleItemClick("dashboard")}>
                <TbListDetails className="icon" />
                Billing Details
              </li>
            </Link>
            <Link to="/Franchisetogglepatients" className="sidebar-links">
              <li
                className={activeItem === "Patientdetails" ? "active" : ""}
                onClick={() => handleItemClick("Patientdetails")}>
                <IoPersonAddSharp className="icon" />
                Add Patient{" "}
              </li>
            </Link>
            <Link to="/Billing" className="sidebar-links">
              {" "}
              <li
                className={activeItem === "Billng" ? "active" : ""}
                onClick={() => handleItemClick("Billng")}>
                <RiBillFill className="icon" />
                Billing
              </li>{" "}
            </Link>
            {/* <Link to="/TreatmentCategory" className='sidebar-links' > <li className={activeItem === 'treatmentcat' ? 'active' : ''} onClick={() => handleItemClick('treatmentcat')}><IoIosPeople className='icon' />Treatment Category</li></Link>
                       <Link to="/TreatmentPlan" className='sidebar-links' > <li className={activeItem === 'treatmentplan' ? 'active' : ''} onClick={() => handleItemClick('treatmentplan')}><IoIosPeople className='icon' />Treatment Plan</li></Link>
                       <Link to="/States" className='sidebar-links' > <li className={activeItem === 'states' ? 'active' : ''} onClick={() => handleItemClick('states')}><IoIosPeople className='icon' />States</li></Link>
                       <Link to="/Cities" className='sidebar-links' > <li className={activeItem === 'cities' ? 'active' : ''} onClick={() => handleItemClick('cities')}><IoIosPeople className='icon' />Cities</li></Link>
                       <Link to="/Area" className='sidebar-links' ><li className={activeItem === 'areas' ? 'active' : ''} onClick={() => handleItemClick('areas')}><IoIosPeople className='icon' />Areas</li></Link> */}
            <Link to="/" className="sidebar-links">
              {" "}
              <li
                className={activeItem === "logout" ? "active" : ""}
                onClick={() => handleLogOut() || handleItemClick("logout")}>
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

export default ReceptionSidebar;
