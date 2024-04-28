import React from 'react';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.clear();
    navigate('/');
  };
  return (
    <div>


<button>

        <Link to='/reg'>
          Add Super Admin
        </Link>

      </button>


      <button>

        <Link to='/MasterUsert'>
          Super admin users
        </Link>

      </button>

      <button>

        <Link to='/FrSidebar'>
          Franchise admin Users
        </Link>
      </button>
      <button>
        <Link to='/States'>
          Add States
        </Link>
      </button>
      <button>
        <Link to='/Cities'>
          Add Cities
        </Link>
      </button>
      <button>
        <Link to='/Area'>
          Add Areas
        </Link>
      </button>

      <button>
        <Link to='/TreatmentCategory'>
          Add treatment category
        </Link>
      </button>
      <button>
        <Link to='/TreatmentPlan'>
          Add Treatementplan
        </Link>
      </button>

      <button onClick={handleLogOut}>
        Sign Out

      </button>


    </div>
  )
}

export default Sidebar