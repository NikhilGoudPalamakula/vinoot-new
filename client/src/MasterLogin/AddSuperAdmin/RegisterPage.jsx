// // // RegisterPage.js

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./RegisterPage.css";
// // import Sidebar from "../../Masterdata/Sidebar/Sidebar";
// // import MasterUserT from "../Masterusers/MasterUserT";

// const RegisterPage = () => {
//   const createdby = localStorage.getItem("userId");

//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     fullName: "",
//     userId: "",
//     email: "",
//     phoneNumber: "",
//     dateOfBirth: "",
//     password: "",
//     confirmPassword: "",
//     gender: "",
//     userType: "SuperAdmin",
//     activeChangedBy: "none",
//     createdBy: createdby,
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post(
//         "http://localhost:5001/api/register",
//         formData
//       );
//       console.log("User registered:", res.data);
//       navigate("/");
//     } catch (error) {
//       console.error("Registration failed:", error.response.data.error);
//     }
//   };

//   return (
//     <div className="super-regtoatl">
//       {/* <div>
//         <Sidebar />
//       </div> */}
//       <div className="super-regright">
//         <div className="super-regright22">
//           {/* <h2 className="super-rheading">Add Super Admin </h2> */}
//           <div className="super-regright-1">
//             <form className="super-regfrom" onSubmit={handleSubmit}>
//               <div className="superflex-high">
//                 <div className="super-flex">
//                   <label>
//                     <input
//                       className="input1_rp"
//                       type="text"
//                       name="fullName"
//                       value={formData.fullName}
//                       onChange={handleChange}
//                       placeholder=""
//                       required
//                     />
//                     <span>Full Name</span>
//                   </label>

//                   <label>
//                     <input
//                       className="input1_rp"
//                       type="text"
//                       name="userId"
//                       value={formData.userId}
//                       onChange={handleChange}
//                       placeholder=""
//                       required
//                     />
//                     <span>UserId</span>
//                   </label>

//                   <label>
//                     <input
//                       className="input1_rp"
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       placeholder=""
//                       required
//                     />
//                     <span>Email</span>
//                   </label>

//                   <label>
//                     <input
//                       className="input1_rp"
//                       type="text"
//                       name="phoneNumber"
//                       value={formData.phoneNumber}
//                       onChange={handleChange}
//                       placeholder=""
//                       required
//                     />
//                     <span>Phone Number</span>
//                   </label>
//                 </div>

//                 {/* .......................................... */}

//                 <div className="super-flex">
//                   <label>
//                     <input
//                       className="input1_rp"
//                       type="date"
//                       name="dateOfBirth"
//                       value={formData.dateOfBirth}
//                       onChange={handleChange}
//                       placeholder="date of birth"
//                       required
//                     />
//                     <span>Date of Birth</span>
//                   </label>

//                   <label>
//                     <select
//                       className="input1_rp"
//                       name="gender"
//                       value={formData.gender}
//                       onChange={handleChange}
//                       required
//                     >
//                       <option value="">Select Gender</option>
//                       <option value="male">Male</option>
//                       <option value="female">Female</option>
//                       <option value="other">Other</option>
//                     </select>
//                     <span>Gender</span>
//                   </label>
//                   <label>
//                     <input
//                       className="input1_rp"
//                       type="password"
//                       name="password"
//                       value={formData.password}
//                       onChange={handleChange}
//                       placeholder=""
//                       required
//                     />
//                     <span>Password</span>
//                   </label>

//                   <label>
//                     <input
//                       className="input1_rp"
//                       type="password"
//                       name="confirmPassword"
//                       value={formData.confirmPassword}
//                       onChange={handleChange}
//                       placeholder=""
//                       required
//                     />
//                     <span>Confirm Password</span>
//                   </label>
//                 </div>
//               </div>
//               <button className="submit_rp" type="submit">
//                 Register
//               </button>
//             </form>
//           </div>
//         </div>
//         <div className="below-table-admins">{/* <MasterUserT /> */}</div>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;



// // RegisterPage.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";
import Sidebar from "../../Masterdata/Sidebar/Sidebar";
import MasterUserT from "../Masterusers/MasterUserT";

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
      return "SPA001";
    } else {
      // Extract the numeric part of the last patient ID
      const lastIDNumeric = parseInt(
        users[users.length - 1].userId.substr(3),
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
      [name]: "", // Clear error for the current field
    }));
    // Password validation
    if (name === "password") {
      if (value.length < 8 || value.length > 16) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "Password must be between 8 and 16 characters.",
        }));
      }
    }

    // Confirm Password validation
    if (name === "confirmPassword") {
      if (value !== formData.password) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: "Passwords do not match.",
        }));
      }
    }

    if (name === "phoneNumber") {
      // Phone Number validation logic
      if (!/^\d{10}$/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          phoneNumber: "Phone Number must contain 10 numbers.",
        }));
      }
    }
    // Date of Birth validation
    if (name === "dateOfBirth") {
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
    if (name === "email") {
      if (value.length < 10 || value.length > 60) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "email must be between 10 and 60 characters.",
        }));
      }
    }
    //fullname validation
    if (name === "fullName") {
      if (value.length < 3 || value.length > 50) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          fullName: "fullname must be between 3 and 50 characters.",
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check for any errors before submission
    for (const key in errors) {
      if (errors[key]) {
        alert("Errors are there. Please fix before submitting.");
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
      const res = await axios.post("http://localhost:5001/api/register", {
        ...formData,
        userId: newUserID,
      });
      console.log("User registered:", res.data);
      alert("registration successful");
      navigate("/");
    } catch (error) {
      console.error("Registration failed:", error.response.data.error);
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
      const response = await axios.get("http://localhost:5001/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Initialize form data including the patient ID
  useEffect(() => {
    const newUserID = generateUserID(users);
    setUserId(newUserID);
  }, [users]);

  return (
    <div className="super-regtoatl">
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
                    <span>Full Name</span>
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
                    <span>UserId</span>
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
                    <span>Email</span>
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
                      placeholder=""
                      required
                    />
                    <span>Phone Number</span>
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
                    <span>Gender</span>
                  </label>
                  <label>
                    <input
                      className="input1_rp"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder=""
                      required
                    />
                    <span>Password</span>
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
                      placeholder=""
                      required
                    />
                    <span>Confirm Password</span>
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