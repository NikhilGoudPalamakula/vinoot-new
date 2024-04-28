// Login.js

import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import axios from 'axios';

const LoginPage = () => {

    //  const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/login', formData);
      console.log('User logged in:', res.data);
      localStorage.setItem('username', res.data.username);
        navigate("/Sidebar");
      // Optionally, you can redirect the user to another page after successful login
    } catch (error) {
      console.error('Login failed:', error.response.data.error);
      // Optionally, you can display an error message to the user
    }
  };

  return (
    <>
      <h2>User Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginPage;
