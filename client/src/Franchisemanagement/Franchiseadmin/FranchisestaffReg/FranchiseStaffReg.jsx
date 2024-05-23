import React, { useState, useEffect } from "react";
import "./FranchiseStaffReg.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { VINOOTNEW } from "../../../Helper/Helper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [errors, setErrors] = useState({
    mobileNumber: "",
  });
  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const frid = localStorage.getItem("franchiseID");
      if (frid) {
        const response = await axios.get(
          `${VINOOTNEW}/api/franchisefetchusers/${frid}`
        );
        setAdmins(response.data);
      } else {
        console.error("FranchiseID not found in localStorage");
      }
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  };
  const generateAdminID = (admins) => {
    if (admins.length === 0) {
      // If there are no existing admins, start with the first ID
      return "STAFF001";
    } else {
      // Extract the numeric part of the last patient ID
      const lastIDNumeric = parseInt(
        admins[admins.length - 1].userId.substr(5),
        10
      );
      // Increment the numeric part by 1
      const nextIDNumeric = lastIDNumeric + 1;
      // Pad the numeric part with zeros to maintain the format "PAT001"
      const nextID = "STAFF" + nextIDNumeric.toString().padStart(3, "0");
      return nextID;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasErrors = Object.values(errors).some((error) => error !== "");

    if (hasErrors) {
      toast.error("Please fix the errors before submitting", {
        position: "top-right",
        autoClose: 1500,
      });
      return;
    }
    // Generate the patient ID
    const newAdminID = generateAdminID(admins);
    // Update the form data with the generated patient ID
    setAdminData({
      ...adminData,
      userId: newAdminID,
    });
    // Update the form data with the generated patient ID

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
      // console.log("admin Data:", updatedAdminData);
      toast.success("Staff Added successfully.", {
        position: "top-right",
        autoClose: 1000,
      });
      // alert("Data submitted successfully.");
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
      fetchAdmins();
    } catch (error) {
      console.error("Registration failed:", error.response.data.error);
    }
  };
  useEffect(() => {
    const newAdminID = generateAdminID(admins);
    setAdminData({
      ...adminData,
      userId: newAdminID,
    });
  }, [admins]);

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
  const handleMobileNumberChange = (e) => {
    const { name, value } = e.target;
    setAdminData({ ...adminData, [name]: value });

    if (name === "mobileNumber") {
      if (value.trim() === "") {
        setErrors((prevErrors) => ({ ...prevErrors, mobileNumber: "" }));
      } else {
        const numericValue = value.replace(/\D/g, ""); // Remove non-numeric characters
        setAdminData({ ...adminData, [name]: numericValue });

        const mobileRegex = /^[6-9]\d{0,9}$/; // Starts with 6 and allows up to 10 digits
        if (!mobileRegex.test(value)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            mobileNumber:
              "Mobile number must start with 6 to 9 and contain up to 10 digits.",
          }));
        } else if (value.length < 10) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            mobileNumber: "Mobile number must be 10 digits",
          }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, mobileNumber: "" }));
        }
      }
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
      <ToastContainer />
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
                  style={{ zIndex: "-1" }}
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
                  type="text"
                  name="mobileNumber"
                  value={adminData.mobileNumber}
                  onChange={handleMobileNumberChange}
                  pattern="\d{10}"
                  maxLength="10"
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
                  maxLength={16}
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
