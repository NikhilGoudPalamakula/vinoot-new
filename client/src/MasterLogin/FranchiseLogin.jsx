import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { VINOOTNEW } from "../Helper/Helper";
const FranchiseLogin = () => {
  //  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userId: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${VINOOTNEW}/api/franchiselogin`,
        formData
      );
      const { franchisename, FranchiseID, userId, designation } = res.data;

      localStorage.setItem("franchisename", franchisename);
      localStorage.setItem("FranchiseID", FranchiseID);
      localStorage.setItem("userId", userId);
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

  return (
    <>
      <h2>Farnchise Admin User Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="userId"
          value={formData.userId}
          onChange={handleChange}
          placeholder="userId"
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
  );
};

export default FranchiseLogin;
