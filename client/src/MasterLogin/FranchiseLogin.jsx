import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const FranchiseLogin = () => {

        //  const dispatch = useDispatch();
        const navigate = useNavigate();

        const [formData, setFormData] = useState({
        Adminid: '',
        password: '',
      });
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post('http://localhost:5001/api/franchiselogin', formData);
         
          const { franchisename, FranchiseID, username } = res.data;

          localStorage.setItem('franchisename',franchisename);
          localStorage.setItem('FranchiseID',FranchiseID);
          localStorage.setItem('username',username);
          console.log(franchisename);
          navigate("/FrSidebar");
          // Optionally, you can redirect the user to another page after successful login
        } catch (error) {
          console.error('Login failed:', error.response.data.error);
          // Optionally, you can display an error message to the user
        }
      };


  return (
   <>
      <h2>Farnchise Admin User Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="Adminid"
          value={formData.Adminid}
          onChange={handleChange}
          placeholder="Adminid"
          required
        />
        <input
          type="text"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </>
  )
}

export default FranchiseLogin
