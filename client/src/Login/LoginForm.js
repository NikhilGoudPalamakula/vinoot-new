import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import the default styles for React Toastify
import "./LoginForm.css";
import axios from "axios";
import Navbarlanding from "../Landingpage/Components/Navbar";
import { VINOOTNEW } from "../Helper/Helper";
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
    userId: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.userId.trim() || !formData.password.trim()) {
      toast.error("Please fill in all fields.", {
        position: "top-right",
        autoClose: 1500,
      });
      return; // Exit the function if fields are empty
    }
    try {
      const res = await axios.post(`${VINOOTNEW}/api/franchiselogin`, formData);
      const { franchisename, franchiseID, userId, designation } = res.data;

      localStorage.setItem("franchisename", franchisename);
      localStorage.setItem("franchiseID", franchiseID);
      localStorage.setItem("userId", userId);
      localStorage.setItem("designation", designation); // Save the designation
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 1500,
        onClose: () => {
          // Navigate after the toast message closes
          switch (designation) {
            case "FranchiseAdmin":
              navigate("/FranchiseAdmin");
              break;
            // case "Doctor":
            //   navigate("/Doctor");
            //   break;
            case "Reception":
              navigate("/Recepttion");
              break;
            case "Therapist":
              //   navigate("/Thearpy");
              //   break;
              // default:
              navigate("/defaultDashboard");
              break;
            default:
              navigate("/defaultDashboard");
              // Handle other designations here, if needed
              break;
          }
        },
      });
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          if (error.response.data.error === "Franchise is not active") {
            // Handle franchiseID already exists error
            // Display appropriate message to the user
            toast.error("Franchise is not active", {
              position: "top-right",
              autoClose: 1500,
            });
          } else if (error.response.data.error === "Password Doesn't Match") {
            // Handle franchiseID already exists error
            // Display appropriate message to the user
            toast.error("Password Doesn't Match", {
              position: "top-right",
              autoClose: 1500,
            });
          } else if (error.response.data.error === "Invalid Credentials") {
            // Handle franchiseID already exists error
            // Display appropriate message to the user
            toast.error("Invalid Credentials", {
              position: "top-right",
              autoClose: 1500,
            });
          } else if (error.response.data.error === "User is not active") {
            // Handle franchiseID already exists error
            // Display appropriate message to the user
            toast.error("User is not active", {
              position: "top-right",
              autoClose: 1500,
            });
          }
        }
      }
    }
  };
  const [formData1, setFormData1] = useState({
    userId: "",
    password: "",
  });
  // --------------------
  const handleChange12 = (e) => {
    setFormData1({ ...formData1, [e.target.name]: e.target.value });
  };

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    if (!formData1.userId.trim() || !formData1.password.trim()) {
      toast.error("Please fill in all fields.", {
        position: "top-right",
        autoClose: 1500,
      });
      return; // Exit the function if fields are empty
    }
    try {
      const res = await axios.post(`${VINOOTNEW}/api/login`, formData1);
      // console.log("User logged in:", res.data);
      // Display a success toast message
      localStorage.setItem("userId", res.data.userId);
      toast.success("Login successful!", {
        position: "top-right",
        autoClose: 1500, // Close the toast after 3 seconds
        onClose: () => {
          navigate("/FranchiseDetails");
        },
      });
    } catch (error) {
      // console.error("Login failed:", error.response.data.error);
      toast.error("Invalid Credentials!", {
        position: "top-right",
        autoClose: 1500,
      });
    }
  };

  // ----------------------------------------------------------------

  return (
    <div>
      <Navbarlanding />
      <div className="total">
        <ToastContainer />{" "}
        {/* Add ToastContainer here to display toast messages */}
        <div
          className={`container ${isSignInActive ? "right-panel-active" : ""}`}>
          <div className="container-form signUp">
            <form className="form">
              <h2 className="title">Super Admin</h2>
              <input
                className="input"
                type="text"
                name="userId"
                value={formData1.userId}
                onChange={handleChange12}
                placeholder="UserId"
                required
              />

              <input
                className="input"
                type="password"
                name="password"
                value={formData1.password}
                onChange={handleChange12}
                placeholder="Password"
                required
              />
              <button className="btn" type="submit" onClick={handleSubmit1}>
                Login
              </button>
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
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                placeholder="UserId"
                required
              />

              <input
                className="input"
                type="text"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
              <a href="/fr" className="link">
                Do you want to register for{" "}
                <span style={{ textDecoration: "underline", color: "green" }}>
                  Franchise?
                </span>
              </a>
              <button className="btn" type="submit" onClick={handleSubmit}>
                Login
              </button>
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
    </div>
  );
};

export default LoginForm;
