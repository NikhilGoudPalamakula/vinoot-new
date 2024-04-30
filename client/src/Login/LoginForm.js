import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './LoginForm.css';
import axios from "axios"; 
const LoginForm = () => {
  const [isSignInActive, setIsSignInActive] = useState(false);

  const toggleSignIn = () => {
    setIsSignInActive(false);
  };

  const toggleSignUp = () => {
    setIsSignInActive(true);
  };



  // ----------------Franchise-login------------

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    Adminid: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5001/api/franchiselogin",
        formData
      );
      const { franchisename, FranchiseID, username, designation } = res.data;

      localStorage.setItem("franchisename", franchisename);
      localStorage.setItem("FranchiseID", FranchiseID);
      localStorage.setItem("username", username);
      localStorage.setItem("designation", designation); // Save the designation

      switch (designation) {
        case "FranchiseAdmin":
          navigate("/FranchiseAdmin");
          break;
        case "Doctor":
          navigate("/Doctor");
          break;
        case "Reception":
          navigate("/Recepttion");
          break;
        case "Thearpy":
          navigate("/Thearpy");
          break;
        default:
          navigate("/defaultDashboard");
          break;
      }
    } catch (error) {
      console.error("Login failed:", error.response.data.error);
      // Optionally, you can display an error message to the user
    }
  };
    // ---------------------------------------------------------------
    // ----------------Super-admin-login------------\


    const [formData1, setFormData1] = useState({
    username: '',
    password: '',
  });

  const handleChange1 = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5001/api/login', formData);
      console.log('User logged in:', res.data);
      localStorage.setItem('username', res.data.username);
        navigate("/FrSidebar");
      // Optionally, you can redirect the user to another page after successful login
    } catch (error) {
      console.error('Login failed:', error.response.data.error);
      // Optionally, you can display an error message to the user
    }
  };

    // ----------------------------------------------------------------

  return (
    <div className='total'>
    <div className={`container ${isSignInActive ? 'right-panel-active' : ''}`}>
      <div className="container-form signUp">
        {/* -----------SuperAdmin---------- */}
        <form className="form">
          <h2 className="title">Super Admin</h2>
          <input 
           className="input" 
           type="text"
           name="username"
           value={formData1.username}
           onChange={handleChange1}
           placeholder="Username"
           required />

          <input  
          className="input" 
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange1}
          placeholder="Password"
          required />
          <button className="btn" type='submit' onClick={handleSubmit1}>Login</button>
        </form>
      </div>

      <div className="container-form signIn">
         {/* -----------Franchise Staff---------- */}
        <form className="form">
          <h2 className="title">Franchise Staff</h2>
          {/* <input type="text" className="input" placeholder="User" /> */}
          <input 
          className="input" 
          type="text"
          name="Adminid"
          value={formData.Adminid}
          onChange={handleChange}
          placeholder="Username"
          required />

          <input 
          className="input" 
          type="text"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required />
          <a href="/fr" className="link">
            Do you want to register for <span style={{textDecoration:'underline',color:'green'}}>Franchise?</span>
          </a>
          <button className="btn" type='submit' onClick={handleSubmit}>Login</button>
        </form>
      </div>

      <div className="container-overlay">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <button className="btn" onClick={toggleSignIn}>
              Franchise Staff 
            </button>
          </div>
          <div className="overlay-panel overlay-right">
            <button className="btn" onClick={toggleSignUp}>
             Super Admin
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default LoginForm;
