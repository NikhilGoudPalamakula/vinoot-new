import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";
// import Sidebar from "../../Masterdata/Sidebar/Sidebar";
// import MasterUserT from "../Masterusers/MasterUserT";
import { VINOOTNEW } from "../../Helper/Helper";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const RegisterPage = () => {
  const createdby = localStorage.getItem("userId");

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    userId: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    password: "",
    confirmPassword: "",
    gender: "",
    userType: "SuperAdmin",
    activeChangedBy: "none",
    createdBy: createdby,
  });
  const [errors, setErrors] = useState({
    fullName: "",
    phoneNumber: "",
    dateOfBirth: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const generateUserID = (users) => {
    if (users.length === 0) {
      // If there are no existing users, start with the first ID
      return "SUPERADMIN001";
    } else {
      // Extract the numeric part of the last patient ID
      const lastIDNumeric = parseInt(
        users[users.length - 1].userId.substr(10),
        10
      );
      // Increment the numeric part by 1
      const nextIDNumeric = lastIDNumeric + 1;
      // Pad the numeric part with zeros to maintain the format "SPA001"
      const nextID = "SUPERADMIN" + nextIDNumeric.toString().padStart(3, "0");
      return nextID;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear previous errors
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

    if (name === "password" && value.trim() !== "") {
      if (
        !/(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
          value
        )
      ) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password:
            "Password must be 8-16 characters with at least one uppercase letter, one number, and one special character.",
        }));
      }
    }
    // Compare password and confirm password
    if (name === "confirmPassword") {
      if (value !== formData.password) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: "Passwords do not match.",
        }));
      }
    }

    // Mobile number validation
    if (name === "phoneNumber") {
      if (value.trim() === "") {
        setErrors((prevErrors) => ({ ...prevErrors, phoneNumber: "" }));
      } else {
        const numericValue = value.replace(/\D/g, ""); // Remove non-numeric characters
        setFormData({ ...formData, [name]: numericValue });

        const mobileRegex = /^[6-9]\d{0,9}$/; // Starts with 6 and allows up to 10 digits
        if (!mobileRegex.test(value)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            phoneNumber:
              "Mobile number must start with 6 to 9 and contain up to 10 digits.",
          }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, phoneNumber: "" }));
        }
      }
    }
    // Date of Birth validation
    if (name === "dateOfBirth" && value.trim() !== "") {
      const dobDate = new Date(value);
      const presentDate = new Date();
      const minDobDate = new Date();
      const selectedDate = new Date(value);
      minDobDate.setFullYear(presentDate.getFullYear() - 140);
      if (dobDate < minDobDate) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Date of birth should be at less than 140 years ago",
        }));
      } else if (selectedDate > presentDate) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "Date of birth cannot be a future date",
        }));
      }
    }
    //email validation
    if (name === "email" && value.trim() !== "") {
      if (value.length < 10 || value.length > 60) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "email address consists of (10-60 characters)",
        }));
      }
    }
    //fullname validation
    if (name === "fullName" && value.trim() !== "") {
      if (value.length < 3) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          fullName: "Full name should consists minimum of 3 characters",
        }));
      } else if (value.length > 50) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          fullName: "Full name must should consists only 50 characters.",
        }));
      } else if (!/[a-zA-Z].*[a-zA-Z].*[a-zA-Z]/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          fullName:
            "Full name should consist of at least 3 alphabetic characters",
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if password and confirm password match

    // Check for any errors before submission
    for (const key in errors) {
      if (errors[key]) {
        toast.error("Errors are there. Please fix before submitting.", {
          position: "top-right",
          autoClose: 1500,
        });
        return;
      }
    }
    // Generate the patient ID
    const newUserID = generateUserID(users);
    // Update the form data with the generated patient ID
    setFormData({
      ...formData,
      userId: newUserID,
    });

    try {
      await axios.post(`${VINOOTNEW}/api/register`, {
        ...formData,
        userId: newUserID,
      });
      // console.log("User registered:", res.data);
      toast.success("Super Admin added sucessfully.", {
        position: "top-right",
        autoClose: 1500,
        onClose: () => {
          navigate("/");
        },
      });
    } catch (error) {
      // console.error("Registration failed:", error.response.data.error);
    }
  };

  //-----------UserId fetching---------------

  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // const frid = localStorage.getItem("FranchiseID");

      // if (frid) {
      const response = await axios.get(`${VINOOTNEW}/api/users`);
      setUsers(response.data);
    } catch (error) {
      // console.error("Error fetching users:", error);
    }
  };

  // Initialize form data including the patient ID
  useEffect(() => {
    const newUserID = generateUserID(users);
    setUserId(newUserID);
  }, [users]);

  return (
    <div className="super-regtoatl">
      <ToastContainer />
      {/* <div>
        <Sidebar />
      </div> */}
      <div className="super-regright">
        <div className="super-regright22">
          {/* <h2 className="super-rheading">Add Super Admin </h2> */}
          <div className="super-regright-1">
            <form className="super-regfrom" onSubmit={handleSubmit}>
              <div className="superflex-high">
                <div className="super-flex">
                  <label>
                    <input
                      className="input1_rp"
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder=""
                      required
                    />
                    <span>
                      Full Name <span style={{ color: "red" }}>*</span>
                    </span>
                  </label>
                  {errors.fullName && (
                    <div style={{ color: "red" }} className="font-size-error">
                      {errors.fullName}
                    </div>
                  )}

                  <label>
                    <input
                      className="input1_rp"
                      type="text"
                      name="userId"
                      value={userId}
                      // onChange={handleChange}
                      readOnly
                      required
                    />
                    <span>
                      UserId <span style={{ color: "red" }}>*</span>
                    </span>
                  </label>

                  <label>
                    <input
                      className="input1_rp"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder=""
                      required
                    />
                    <span>Email </span>
                  </label>
                  {errors.email && (
                    <div style={{ color: "red" }} className="font-size-error">
                      {errors.email}
                    </div>
                  )}
                  <label>
                    <input
                      className="input1_rp"
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      maxLength={10}
                      onKeyDown={(evt) =>
                        (evt.key === "." ||
                          evt.key === "e" ||
                          evt.key === "E" ||
                          evt.key === "+" ||
                          evt.key === "-") &&
                        evt.preventDefault()
                      }
                      
                      placeholder=""
                      required
                    />
                    <span>
                      Mobile Number <span style={{ color: "red" }}>*</span>
                    </span>
                  </label>
                  {errors.phoneNumber && (
                    <div style={{ color: "red" }} className="font-size-error">
                      {errors.phoneNumber}
                    </div>
                  )}
                </div>

                {/* .......................................... */}

                <div className="super-flex">
                  <label>
                    <input
                      className="input1_rp"
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      placeholder="date of birth"
                      required
                    />
                    <span>Date of Birth</span>
                  </label>
                  {errors.dateOfBirth && (
                    <div style={{ color: "red" }} className="font-size-error">
                      {errors.dateOfBirth}
                    </div>
                  )}
                  <label>
                    <select
                      className="input1_rp"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required>
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    <span>Gender </span>
                  </label>
                  <label>
                    <input
                      className="input1_rp"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      maxLength={16}
                      placeholder=""
                      required
                    />
                    <span>
                      Password <span style={{ color: "red" }}>*</span>
                    </span>
                  </label>
                  {errors.password && (
                    <div style={{ color: "red" }} className="font-size-error">
                      {errors.password}
                    </div>
                  )}

                  <label>
                    <input
                      className="input1_rp"
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      maxLength={16}
                      placeholder=""
                      required
                    />
                    <span>
                      Confirm Password <span style={{ color: "red" }}>*</span>
                    </span>
                  </label>
                  {errors.confirmPassword && (
                    <div style={{ color: "red" }} className="font-size-error">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>
              </div>
              <button className="submit_rp" type="submit">
                Register
              </button>
            </form>
          </div>
        </div>
        {/* <div className="below-table-admins">
          <MasterUserT />
        </div> */}
      </div>
    </div>
  );
};

export default RegisterPage;
