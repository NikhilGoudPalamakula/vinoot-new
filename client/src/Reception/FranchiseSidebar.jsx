import React from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';


const FranchiseSidebar = () => {
    const navigate =useNavigate();
    const handleLogOut = () => {
      localStorage.clear();
      navigate('/');
    };
    return (
      <div>
  
  <button onClick={handleLogOut}>
  Sign Out
  
  </button>
  
  
  
 
  
  <button>
    
  <Link to='/FranchiseAdmintable'>
  Franchise Admins
  </Link>
  
  </button>
  
      
    </div>
  )
}

export default FranchiseSidebar
