import React, { useState } from 'react';
import './Sidebar.css';
import { MdDashboard } from "react-icons/md";
import { FaBoxArchive } from "react-icons/fa6";
import { FaStoreAlt } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { FaBell } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { FaQuestionCircle } from "react-icons/fa";

const SuperSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(null);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (item) => {
        setActiveItem(item);
    };

    return (
        <div>
            <div className={`side-bar-container ${isOpen ? 'open' : ''}`}>
                <div className='v-logo'>
                    <img src='https://vinootherbal.com/wp-content/uploads/2024/02/grrb-1-1536x804.png' alt='logo' />
                </div>
                <div className='sidebar-list-items'>
                    <ul className='first-lists'>
                        <li className={activeItem === 'dashboard' ? 'active' : ''} onClick={() => handleItemClick('dashboard')}><MdDashboard className='icon' />Dashboard</li>
                        <li className={activeItem === 'products' ? 'active' : ''} onClick={() => handleItemClick('products')}><FaBoxArchive className='icon' />Products</li>
                        <li className={activeItem === 'branches' ? 'active' : ''} onClick={() => handleItemClick('branches')}><FaStoreAlt className='icon' />Branches</li>
                        <li className={activeItem === 'add-admin' ? 'active' : ''} onClick={() => handleItemClick('add-admin')}><IoIosPeople className='icon' />Add M-Admin</li>
                    </ul>
                    <div className='side-bar-second-lists'>
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
                    </div>
                </div>
            </div>
            <div className='hamburger-menu' onClick={toggleSidebar}>
                <div className={`line ${isOpen ? 'open' : ''}`}></div>
                <div className={`line ${isOpen ? 'open' : ''}`}></div>
                <div className={`line ${isOpen ? 'open' : ''}`}></div>
            </div>
        </div>
    );
};

export default SuperSidebar;