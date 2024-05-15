import React, { useState, useEffect } from "react";
import "./FranchiseStaffReg.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { VINOOTNEW } from "../../../Helper/Helper";

const FranchiseStaffReg = () => {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState({
    fullname: "",
    userId: "",
    franchisename: "",
    franchiseID: "",
    designation: "",
    mobileNumber: "",
    email: "",
    password: "",
  });
  const [admins, setAdmins] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createdBy = localStorage.getItem("userId");
      const franchiseName = localStorage.getItem("franchisename");
      const franchiseID = localStorage.getItem("franchiseID");
      const updatedAdminData = {
        ...adminData,
        franchisename: franchiseName,
        franchiseID: franchiseID,
        createdBy: createdBy,
      };
      await axios.post(`${VINOOTNEW}/api/admin`, updatedAdminData);
      console.log("admin Data:", updatedAdminData);
      alert("Data submitted successfully.");
      // Reset adminData state after successful submission
      setAdminData({
        ...adminData,
        fullname: "",
        // userId: "",
        designation: "",
        mobileNumber: "",
        email: "",
        password: "",
      });
      navigate("/Franchisetogglebutton");
    } catch (error) {
      console.error("Registration failed:", error.response.data.error);
    }
  };

  const handleAdminInputChange = (e) => {
    const { name, value } = e.target;
    let errorsCopy = { ...errors };

    // Validation for fullname
    if (name === "fullname") {
      const alphabeticCharacters = value.replace(/[^a-zA-Z]/g, ""); // Remove non-alphabetic characters
      if (value.trim().length === 0) {
        delete errorsCopy.fullname; // Remove error message if field is empty
      } else if (value.length < 3) {
        errorsCopy.fullname = "Fullname should consist of minimum 3 characters";
      } else if (alphabeticCharacters.length < 3) {
        errorsCopy.fullname =
          "Fullname should contain at least 3 alphabetic characters";
      } else if (value.length > 50) {
        errorsCopy.fullname =
          "Fullname should consist of maximum 50 characters";
      } else {
        delete errorsCopy.fullname;
      }
    }

    // Validation for mobileNumber
    if (name === "mobileNumber") {
      if (value.trim().length === 0) {
        delete errorsCopy.mobileNumber; // Step 2: Remove error message if field is empty
      } else {
        // Step 3: Validate mobile number format - Start with digit between 6 and 9
        const startsWithSixToNine = /^[6-9]/.test(value);

        // Step 4: Validate mobile number format - Consists of exactly 10 digits
        const consistsOfTenDigits = /^[0-9]{10}$/.test(value);

        // Step 5: Validate mobile number format - Check if value consists only of numeric characters
        const consistsOnlyOfNumeric = /^\d+$/.test(value);

        if (!startsWithSixToNine) {
          errorsCopy.mobileNumber =
            "Mobile Number should start with a digit between 6 and 9";
        } else if (!consistsOfTenDigits) {
          errorsCopy.mobileNumber =
            "Mobile Number should consist of exactly 10 digits";
        } else if (!consistsOnlyOfNumeric) {
          errorsCopy.mobileNumber =
            "Mobile Number should contain only numeric characters";
        } else {
          delete errorsCopy.mobileNumber;
        }
      }
    }

    // Validation for email
    if (name === "email") {
      if (value.trim().length === 0) {
        delete errorsCopy.email; // Remove error message if field is empty
      } else if (value.length < 10 || value.length > 60) {
        errorsCopy.email = "Email should be between (10-60 characters)";
      } else {
        delete errorsCopy.email;
      }
    }

    // Validation for password
    if (name === "password") {
      if (value.trim().length === 0) {
        delete errorsCopy.password; // Step 1: Remove error message if field is empty
      } else {
        // Step 2: Validate password length (8-16 characters)
        const isLengthValid = value.length >= 8 && value.length <= 16;

        // Step 3: Validate uppercase letter
        const hasUppercase = /[A-Z]/.test(value);

        // Step 4: Validate number
        const hasNumber = /\d/.test(value);

        // Step 5: Validate special character
        const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
          value
        );

        // Step 6: Set error message if any validation fails
        if (!isLengthValid) {
          errorsCopy.password = "Password should be 8-16 characters long";
        } else if (!hasUppercase) {
          errorsCopy.password =
            "Password should contain at least one uppercase letter";
        } else if (!hasNumber) {
          errorsCopy.password = "Password should contain at least one number";
        } else if (!hasSpecialChar) {
          errorsCopy.password =
            "Password should contain at least one special character";
        } else {
          delete errorsCopy.password;
        }
      }
    }

    setErrors(errorsCopy);
    setAdminData({ ...adminData, [name]: value });
  };

  const fetchAdmins = async () => {
    try {
      const frid = localStorage.getItem("franchiseID");
      if (frid) {
        const response = await axios.get(
          `${VINOOTNEW}/api/franchisefetchusers/${frid}`
        );
        setAdmins(response.data);

        // Auto-generate userId
        const nextUserId = `STAFF${response.data.length + 1}`
          .toString()
          .padStart(3, "0");
        setAdminData({ ...adminData, userId: nextUserId });
      } else {
        console.error("FranchiseID not found in localStorage");
      }
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  };

  const toggleActiveState = async (id, isActive) => {
    try {
      const updatedBy = localStorage.getItem("username");
      await axios.patch(` ${VINOOTNEW}/api/franchisestateupdate/${id}`, {
        isActive: !isActive,
        updatedBy,
      });
      fetchAdmins();
    } catch (error) {
      console.error("Error updating active state:", error);
    }
  };

  return (
    <div className="fraddstaff-total">
      <div className="fradmin-right">
        <form onSubmit={handleSubmit} className="fr-admin-form">
          <div className="fr-for-flex">
            <div>
              <div className="addfr-inputs-wraps">
                <input
                  className="addfr-inputs"
                  type="text"
                  name="fullname"
                  value={adminData.fullname}
                  onChange={handleAdminInputChange}
                  placeholder=""
                  required
                />
                <label>
                  <span>fullname </span>
                </label>
              </div>
              {errors.fullname && <p className="error">{errors.fullname}</p>}
              <div className="addfr-inputs-wraps">
                <input
                 style={{zIndex:"-1"}}
                  className="addfr-inputs"
                  type="text"
                  name="userId"
                  value={adminData.userId}
                  onChange={handleAdminInputChange}
                  placeholder=""
                  required
                />
                <label>
                  <span>userId </span>
                </label>
              </div>
              <div className="addfr-inputs-wraps">
                <select
                  className="addfr-inputs"
                  name="designation"
                  value={adminData.designation}
                  onChange={handleAdminInputChange}
                  placeholder="Select Designation"
                  required>
                  <option value=""></option>
                  <option value="Doctor">Doctor</option>
                  <option value="Reception">Reception</option>
                  <option value="Therapist">Therapist</option>
                  <option value="FranchiseAdmin">Franchise Admin</option>
                </select>
                <label>
                  <span> Select designation</span>
                </label>
              </div>
            </div>

            <div>
              <div className="addfr-inputs-wraps">
                <input
                  className="addfr-inputs"
                  type="number"
                  name="mobileNumber"
                  value={adminData.mobileNumber}
                  onChange={handleAdminInputChange}
                  placeholder=""
                  required
                />
                <label>
                  <span>Mobile Number </span>
                </label>
              </div>
              {errors.mobileNumber && (
                <p className="error">{errors.mobileNumber}</p>
              )}
              <div className="addfr-inputs-wraps">
                <input
                  className="addfr-inputs"
                  type="email"
                  name="email"
                  value={adminData.email}
                  onChange={handleAdminInputChange}
                  placeholder=""
                  required
                />
                <label>
                  <span>Email </span>
                </label>
              </div>
              {errors.email && <p className="error">{errors.email}</p>}
              <div className="addfr-inputs-wraps">
                <input
                  className="addfr-inputs"
                  type="text"
                  name="password"
                  value={adminData.password}
                  onChange={handleAdminInputChange}
                  placeholder=""
                  required
                />
                <label>
                  <span>Password </span>
                </label>
              </div>
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
          </div>
          <button className="franchisereg-staff" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FranchiseStaffReg;
