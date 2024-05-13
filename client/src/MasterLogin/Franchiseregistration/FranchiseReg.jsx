

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Franchiseregistration/FranchiseReg.css";
import Navbarlanding from '../../../src/Landingpage/Components/Navbar'
const FranchiseReg = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [area, setArea] = useState("");
  const [stateInput, setStateInput] = useState("");
  const [city, setCity] = useState("");
  const [focusedInput, setFocusedInput] = useState(null);
  const [filteredStates, setFilteredStates] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [filteredAreas, setFilteredAreas] = useState([]);
  const [franchiseData, setFranchiseData] = useState({
    franchisename: "",
    franchiseID: "",
    mobileNumber: "",
    country: "",
    state: "",
    city: "",
    area: "",
    address: "",
    pincode: "",
  });

  const [adminData, setAdminData] = useState({
    fullname: "",
    userId: "",
    franchisename: "",
    franchiseID: "",
    designation: "FranchiseAdmin",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    franchisename: "",
    franchiseID: "",
    mobileNumber: "",
    address: "",
    pincode: "",
    password: "",
    fullname: "",
    email: "",
  });

  useEffect(() => {
    // Fetch states data when component mounts
    const fetchStates = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/states");
        setStates(response.data);
        setFilteredStates(response.data); // Initialize filteredStates with all states
      } catch (error) {
        console.error("Failed to fetch states", error);
      }
    };
    fetchStates();
  }, []);

  useEffect(() => {
    // Fetch cities data when component mounts
    const fetchCities = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/cities");
        setCities(response.data);
        setFilteredCities(response.data); // Initialize filteredCities with all cities
      } catch (error) {
        console.error("Failed to fetch cities", error);
      }
    };
    fetchCities();
  }, []);

  useEffect(() => {
    // Fetch areas data when component mounts
    const fetchAreas = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/areas");
        setAreas(response.data);
        setFilteredAreas(response.data); // Initialize filteredAreas with all areas
      } catch (error) {
        console.error("Failed to fetch areas", error);
      }
    };
    fetchAreas();
  }, []);

  useEffect(() => {
    // Filter states based on input value
    if (stateInput.trim() === "") {
      setFilteredStates(states); // Show all states if input is empty
    } else {
      const filteredStates = states.filter((state) =>
        state.name.toLowerCase().includes(stateInput.toLowerCase())
      );
      setFilteredStates(filteredStates);
    }
  }, [stateInput, states]);

  useEffect(() => {
    // Filter cities based on input value
    if (city.trim() === "") {
      setFilteredCities(cities); // Show all cities if input is empty
    } else {
      const filteredCities = cities.filter((cityItem) =>
        cityItem.name.toLowerCase().includes(city.toLowerCase())
      );
      setFilteredCities(filteredCities);
    }
  }, [city, cities]);

  useEffect(() => {
    // Filter areas based on input value
    if (area.trim() === "") {
      setFilteredAreas(areas); // Show all areas if input is empty
    } else {
      const filteredAreas = areas.filter((areaItem) =>
        areaItem.name.toLowerCase().includes(area.toLowerCase())
      );
      setFilteredAreas(filteredAreas);
    }
  }, [area, areas]);

  const handleStateChange = (event) => {
    const value = event.target.value;
    setStateInput(value);
    setFocusedInput("state");
  };

  const handleCityChange = (event) => {
    const value = event.target.value;
    setCity(value);
    setFocusedInput("city");
  };

  const handleAreaChange = (event) => {
    const value = event.target.value;
    setArea(value);
    setFocusedInput("area");
  };

  const handleStateSelection = (selectedState) => {
    setStateInput(selectedState);
    setFranchiseData({
      ...franchiseData,
      state: selectedState, // Add selected state to formData
    });
    setFocusedInput(null); // Hide suggestion list when a suggestion is clicked
  };

  const handleCitySelection = (selectedCity) => {
    setCity(selectedCity);
    setFranchiseData({
      ...franchiseData,
      city: selectedCity, // Add selected city to formData
    });
    setFocusedInput(null); // Hide suggestion list when a suggestion is clicked
  };

  const handleAreaSelection = (selectedArea) => {
    setArea(selectedArea);
    setFranchiseData({
      ...franchiseData,
      area: selectedArea, // Add selected area to formData
    });
    setFocusedInput(null); // Hide suggestion list when a suggestion is clicked
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const error in errors) {
      if (errors[error] !== "") {
        alert("Please fix all errors before submitting the form.");
        return;
      }
    }


    const mobileRegex = /^[6-9]\d{9}$/; // Regex to check if mobile number starts with 6, 7, 8, or 9 and has 10 digits
    if (!mobileRegex.test(franchiseData.mobileNumber)) {
      alert("Mobile number should start with 6, 7, 8, or 9 and consist of 10 digits.");
      return;
    }

    // Validate address
    if (franchiseData.address.trim().length < 10) {
      alert("Address should consist of a minimum of 10 characters.");
      return;
    }

    // Validate pincode
    const pincodeRegex = /^[1-9]\d{5}$/; // Regex to check if pincode has 6 digits starting with a non-zero digit
    if (!pincodeRegex.test(franchiseData.pincode)) {
      alert("Pincode must be 6 digits starting with a non-zero digit.");
      return;
    }

    try {
      // Update adminData and franchiseData with the current values from state and localStorage
      const createdBy = localStorage.getItem("userId");

      // Update adminData
      const updatedAdminData = {
        ...adminData,
        franchisename: franchiseData.franchisename,
        franchiseID: franchiseData.franchiseID,
        createdBy: createdBy, // Add CreatedBy from localStorage
      };

      // Update franchiseData
      const updatedFranchiseData = {
        ...franchiseData,
        createdBy: createdBy, // Add CreatedBy from localStorage
      };

      await axios.post("http://localhost:5001/api/admin", updatedAdminData);
      console.log("admin Data:", updatedAdminData);

      await axios.post(
        "http://localhost:5001/api/franchise",
        updatedFranchiseData
      );
      console.log("Franchise Data:", updatedFranchiseData);
      alert("Franchise rigistered successfully.");
    } catch (error) {
    //   // console.error("Failed to submit data", error);
    //   // alert("Failed to submit data. Please try again.");
    //   console.error("Error response:", error.response.data);
    // if (error.response && error.response.data && error.response.data.error === "Email already exists") {
    //   alert("Email already exists. Please use a different email.");
    // } else {
    //   console.error("Failed to submit data", error);
    //   alert("Failed to submit data. Please try again.");
    // }
    // }
    if (error.response) {
      // The request was made and the server responded with a status code
      if (error.response.status === 400) {
        // Server returned a Bad Request status code
        const errorMessage = error.response.data.error;
        if (
          errorMessage === "Admin with this User ID already exists" ||
          errorMessage === "Admin with this email already exists"
        ) {
          // Display alert for duplicate UserID or email
          alert(errorMessage);
        } else {
          // Handle other 400 errors
          alert("Failed to create admin: " + errorMessage);
        }
      } else {
        // Handle other HTTP errors
        alert("Failed to create admin: " + error.response.data.error);
      }
    } else if (error.request) {
      // The request was made but no response was received
      alert("No response from server");
    } else {
      // Something else happened while setting up the request
      alert("Error: " + error.message);
    }
  }
  };

  const handleFranchiseInputChange = (e) => {
    const { name, value } = e.target;
    setFranchiseData({ ...franchiseData, [name]: value });

    // Validate franchise name
    if (name === "franchisename") {
      if (value.trim() === "") {
        // Clear the error message if the input is empty
        setErrors((prevErrors) => ({ ...prevErrors, franchisename: "" }));
      } else if (value.length < 10) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          franchisename:
            "Franchise name should consists of a minimum of 10 characters",
        }));
      } else if (value.length > 100) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          franchisename: "Franchise name should consists only 100 characters",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, franchisename: "" }));
      }
    }

    if (name === "franchiseID") {
      if (value.trim() === "") {
        // Clear the error message if the field is empty
        setErrors((prevErrors) => ({ ...prevErrors, franchiseID: "" }));
      } else if (value.length !== 6) {
        // Check if the length is not equal to 6 characters
        setErrors((prevErrors) => ({
          ...prevErrors,
          franchiseID: "Franchise ID must be exactly 6 characters long.",
        }));
      } else {
        // Count the number of alphabetic characters in the franchiseID
        const alphabeticChars = value.match(/[a-zA-Z]/g);
        if (!alphabeticChars || alphabeticChars.length < 3) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            franchiseID: "Franchise ID must contain at least 3 alphabetic characters.",
          }));
        } else {
          // Clear the error message if the franchiseID meets the requirements
          setErrors((prevErrors) => ({ ...prevErrors, franchiseID: "" }));
        }
      }
    }

    // Validate mobile number
    if (name === "mobileNumber") {
      if (value.trim() === "") {
        // Clear the error message if the input is empty
        setErrors((prevErrors) => ({ ...prevErrors, mobileNumber: "" }));
      } else {
        const mobileRegex = /^[6-9]\d{9}$/; // Regex to check if mobile number starts with 6 and has 10 digits
        if (!mobileRegex.test(value)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            mobileNumber:
              "Mobile number should start 6-9 and consists of 10 digits.",
          }));
        } else {
          // Clear the error message if the mobile number format is valid
          setErrors((prevErrors) => ({ ...prevErrors, mobileNumber: "" }));
        }
      }
    }

    // Validate pincode
    if (name === "pincode") {
      if (value.trim() === "") {
        // Clear the error message if the input is empty
        setErrors((prevErrors) => ({ ...prevErrors, pincode: "" }));
      } else {
        const pincodeRegex = /^[1-9]\d{5}$/;
        if (!pincodeRegex.test(value)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            pincode: "Pincode must be 6 digits starting with a non-zero digit.",
          }));
        } else {
          // Clear the error message if the pincode format is valid
          setErrors((prevErrors) => ({ ...prevErrors, pincode: "" }));
        }
      }
    }

    // Validate address
    if (name === "address") {
      if (value.trim() === "") {
        // Clear the error message if the input is empty
        setErrors((prevErrors) => ({ ...prevErrors, address: "" }));
      } else if (value.length < 10 || value.length > 250) {
        // Check if the value length is within the specified range
        setErrors((prevErrors) => ({
          ...prevErrors,
          address: "Address consists of (10-250 characters).",
        }));
      } else {
        // Clear the error message if the input is not empty and length is valid
        setErrors((prevErrors) => ({ ...prevErrors, address: "" }));
      }
    }
  };

  const handleAdminInputChange = (e) => {
    const { name, value } = e.target;
    setAdminData({ ...adminData, [name]: value });
    //password validation
    if (name === "password") {
      const passwordRegex =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&])[A-Za-z\d!@#$%^&*]{8,16}$/;
      // Explanation:
      // (?=.*[A-Z]) - At least one uppercase letter
      // (?=.*\d) - At least one digit
      // (?=.*[!@#$%^&]) - At least one special character
      // [A-Za-z\d!@#$%^&*]{8,16} - Password must be between 8 and 16 characters long, containing only specified characters

      // Check if the value is empty or matches the password requirements
      if (value === "" || passwordRegex.test(value)) {
        // If the value is valid or empty, clear the error message
        setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
      } else {
        // If the value is invalid, set the error message
        setErrors((prevErrors) => ({
          ...prevErrors,
          password:
            "Password must be 8-16 characters with at least one uppercase letter, one number, and one special character.",
        }));
      }
    }

    //email validation
    if (name === "email") {
      // Check if the value is empty or within the valid length range
      if (value === "" || (value.length >= 10 && value.length <= 60)) {
        // If the value is valid, clear the error message
        setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
      } else {
        // If the value is invalid, set the error message
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "email address consists of (10-60 characters)",
        }));
      }
    }

    // Validate fullname
    if (name === "fullname") {
      if (value.trim() === "") {
        // Clear the error message if the field is empty
        setErrors((prevErrors) => ({ ...prevErrors, fullname: "" }));
      } else if (value.length < 3 || value.length > 50) {
        // Check if the length is within the specified range
        setErrors((prevErrors) => ({
          ...prevErrors,
          fullname: "Full name must be between 3 and 50 characters long.",
        }));
      } else {
        // Count the number of alphabetic characters in the fullname
        const alphabeticChars = value.match(/[a-zA-Z]/g);
        if (!alphabeticChars || alphabeticChars.length < 3) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            fullname: "Full name must contain at least 3 alphabetic characters.",
          }));
        } else {
          // Clear the error message if the fullname meets the requirements
          setErrors((prevErrors) => ({ ...prevErrors, fullname: "" }));
        }
      }
    }
  };
  return (
    <div className="addfr-franchise-Reg">
      <Navbarlanding />
      {/* <div className="addfr-franchise-Logo">
        <div className="addfr-image">
          <img
            src="https://vinootherbal.com/wp-content/uploads/2024/02/grrb-1-1536x804.png"
            alt="logo"
          />
        </div>
        <div className="addfr-Registration">
          <h2>Franchise Registration</h2>
        </div>
      </div> */}
      <div className="addfr-total">
        <h2 className="addfr-franchise-details">Franchise Form</h2>
        <form onSubmit={handleSubmit} className="addfr-franchiseReg-form">
          <div className="addfr-franchise-column">
            <div className="addfr-franchise-admin">
              <div className="addfr-franchise-detail-columns">
                <div className="addfr-column">
                  <div className="addfr-input-wrap">
                    <input
                      className="addfr-input"
                      type="text"
                      name="franchisename"
                      value={franchiseData.franchisename}
                      onChange={handleFranchiseInputChange}
                      placeholder=""
                      required
                    />
                    <label>
                      <span>
                        Franchise Name <span style={{ color: "red" }}>*</span>
                      </span>
                    </label>
                  </div>
                  {errors.franchisename && (
                    <div style={{ color: "red" }} className="font-size-error">
                      {errors.franchisename}
                    </div>
                  )}
                  <div className="addfr-input-wrap">
                    <input
                      className="addfr-input"
                      type="text"
                      name="franchiseID"
                      value={franchiseData.franchiseID}
                      onChange={handleFranchiseInputChange}
                      placeholder=""
                      required
                    />
                    <label>
                      <span>
                        Franchise ID <span style={{ color: "red" }}>*</span>
                      </span>
                    </label>
                  </div>
                  {errors.franchiseID && (
                    <div style={{ color: "red" }} className="font-size-error">
                      {errors.franchiseID}
                    </div>
                  )}
                  <div className="addfr-input-wrap">
                    <input
                      className="addfr-input"
                      type="number"
                      name="mobileNumber"
                      value={franchiseData.mobileNumber}
                      onChange={handleFranchiseInputChange}
                      placeholder=""
                      required
                    />
                    <label>
                      <span>
                        Mobile Number <span style={{ color: "red" }}>*</span>
                      </span>
                    </label>
                  </div>
                  {errors.mobileNumber && (
                    <div style={{ color: "red" }} className="font-size-error">
                      {errors.mobileNumber}
                    </div>
                  )}
                  {/* <div className="addfr-input-wrap">
                    <input
                      className="addfr-input"
                      type="text"
                      name="country"
                      value={franchiseData.country}
                      onChange={handleFranchiseInputChange}
                      placeholder=""
                      required
                    />
                    <label>
                      <span>Country <span style={{color:'red'}}>*</span></span>
                    </label>
                  </div> */}
                  <div className="addfr-input-wrap">
                    <input
                      id="stateInput"
                      className="addfr-input"
                      type="text"
                      value={stateInput}
                      onChange={handleStateChange}
                      onFocus={() => setFocusedInput("state")}
                      required
                    />
                    {focusedInput === "state" && (
                      <ul className="suggestion-list1">
                        {filteredStates.map((state) => (
                          <li
                            key={state._id}
                            onClick={() => handleStateSelection(state.name)}
                          >
                            {state.name}
                          </li>
                        ))}
                      </ul>
                    )}
                    <label>
                      <span>
                        State <span style={{ color: "red" }}>*</span>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="addfr-column">
                  <div className="addfr-input-wrap">
                    <input
                      id="cityInput"
                      className="addfr-input"
                      type="text"
                      value={city}
                      onChange={handleCityChange}
                      onFocus={() => setFocusedInput("city")}
                      required
                    />
                    {focusedInput === "city" && (
                      <ul className="suggestion-list1">
                        {filteredCities.map((city) => (
                          <li
                            key={city._id}
                            onClick={() => handleCitySelection(city.name)}
                          >
                            {city.name}
                          </li>
                        ))}
                      </ul>
                    )}
                    <label>
                      <span>
                        City <span style={{ color: "red" }}>*</span>
                      </span>
                    </label>
                  </div>
                  <div className="addfr-column">
                    <div className="addfr-input-wrap">
                      <input
                        id="areaInput"
                        className="addfr-input"
                        type="text"
                        value={area}
                        onChange={handleAreaChange}
                        onFocus={() => setFocusedInput("area")}
                        required
                      />
                      {focusedInput === "area" && (
                        <ul className="suggestion-list1">
                          {filteredAreas.map((area) => (
                            <li
                              key={area._id}
                              onClick={() => handleAreaSelection(area.name)}
                            >
                              {area.name}
                            </li>
                          ))}
                        </ul>
                      )}
                      <label>
                        <span>
                          Area <span style={{ color: "red" }}>*</span>
                        </span>
                      </label>
                    </div>
                    <div className="addfr-input-wrap">
                      <input
                        className="addfr-input"
                        type="text"
                        name="address"
                        value={franchiseData.address}
                        onChange={handleFranchiseInputChange}
                        placeholder=""
                        required
                      />
                      <label>
                        <span>
                          Address <span style={{ color: "red" }}>*</span>
                        </span>
                      </label>
                    </div>
                    {errors.address && (
                      <div style={{ color: "red" }} className="font-size-error">
                        {errors.address}
                      </div>
                    )}
                    <div className="addfr-input-wrap">
                      <input
                        className="addfr-input"
                        type="number"
                        name="pincode"
                        value={franchiseData.pincode}
                        onChange={handleFranchiseInputChange}
                        placeholder=""
                        required
                      />
                      <label>
                        <span>
                          Pincode <span style={{ color: "red" }}>*</span>
                        </span>
                      </label>
                    </div>
                    {errors.pincode && (
                      <div style={{ color: "red" }} className="font-size-error">
                        {errors.pincode}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="addfr-admin">
                <div className="addfr-column">
                  <h2 className="addfr-franchise-details-admin">Admin Form</h2>
                  <div className="addfr-input-wrap">
                    <input
                      className="addfr-input"
                      type="text"
                      name="fullname"
                      value={adminData.fullname}
                      onChange={handleAdminInputChange}
                      placeholder=""
                      required
                    />
                    <label>
                      <span>
                        Full Name <span style={{ color: "red" }}>*</span>
                      </span>
                    </label>
                  </div>
                  {errors.fullname && (
                    <div style={{ color: "red" }} className="font-size-error">
                      {errors.fullname}
                    </div>
                  )}
                  <div className="addfr-input-wrap">
                    <input
                      className="addfr-input"
                      type="text"
                      name="userId"
                      value={adminData.userId}
                      onChange={handleAdminInputChange}
                      placeholder=""
                      required
                    />
                    <label>
                      <span>
                        User ID <span style={{ color: "red" }}>*</span>
                      </span>
                    </label>
                  </div>
                  {errors.userId && (
                    <div style={{ color: "red" }} className="font-size-error">
                      {errors.userId}
                    </div>
                  )}
                  {/* <div className="addfr-input-wrap">
                    <input
                      className="addfr-input"
                      type="text"
                      name="designation"
                      value={adminData.designation}
                      onChange={handleAdminInputChange}
                      placeholder=""
                      readOnly
                      required
                    />
                    <label>
                      <span>Designation <span style={{color:'red'}}>*</span></span>
                    </label>
                  </div> */}
                  <div className="addfr-input-wrap">
                    <input
                      className="addfr-input"
                      type="email"
                      name="email"
                      value={adminData.email}
                      onChange={handleAdminInputChange}
                      placeholder=""
                      required
                    />
                    <label>
                      <span>
                        Email <span style={{ color: "red" }}>*</span>
                      </span>
                    </label>
                  </div>
                  {errors.email && (
                    <div style={{ color: "red" }} className="font-size-error">
                      {errors.email}
                    </div>
                  )}
                  <div className="addfr-input-wrap">
                    <input
                      className="addfr-input"
                      type="password"
                      name="password"
                      value={adminData.password}
                      onChange={handleAdminInputChange}
                      placeholder=""
                      required
                    />
                    <label>
                      <span>
                        Password <span style={{ color: "red" }}>*</span>
                      </span>
                    </label>
                  </div>
                  {errors.password && (
                    <div style={{ color: "red" }} className="font-size-error">
                      {errors.password}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <button type="submit" className="addfr-submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FranchiseReg;
