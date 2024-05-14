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
      state: selectedState,
    });
    setFocusedInput(null);
  };

  const handleCitySelection = (selectedCity) => {
    setCity(selectedCity);
    setFranchiseData({
      ...franchiseData,
      city: selectedCity,
    });
    setFocusedInput(null);
  };

  const handleAreaSelection = (selectedArea) => {
    setArea(selectedArea);
    setFranchiseData({
      ...franchiseData,
      area: selectedArea,
    });
    setFocusedInput(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    for (const error in errors) {
      if (errors[error] !== "") {
        alert("Please fix all errors before submitting the form.");
        return;
      }
    }

    const mobileRegex = /^[1-9]\d{6}$/;
    if (!mobileRegex.test(franchiseData.mobileNumber)) {
      alert("Mobile number should start with 6 and consist of 10 digits.");
      return;
    }

    if (franchiseData.address.trim().length < 10) {
      alert("Address should consist of a minimum of 10 characters.");
      return;
    }

    const pincodeRegex = /^[1-6]\d{5}$/;
    if (!pincodeRegex.test(franchiseData.pincode)) {
      alert("Pincode must be 6 digits starting with a non-zero digit.");
      return;
    }

    try {
      const createdBy = localStorage.getItem("userId");

      const updatedAdminData = {
        ...adminData,
        franchisename: franchiseData.franchisename,
        franchiseID: franchiseData.franchiseID,
        createdBy: createdBy,
      };

      const updatedFranchiseData = {
        ...franchiseData,
        createdBy: createdBy,
      };

      await axios.post("http://localhost:5001/api/admin", updatedAdminData);
      console.log("admin Data:", updatedAdminData);

      await axios.post("http://localhost:5001/api/franchise", updatedFranchiseData);
      console.log("Franchise Data:", updatedFranchiseData);
      alert("Franchise registered successfully.");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          const errorMessage = error.response.data.error;
          if (
            errorMessage === "Admin with this User ID already exists" ||
            errorMessage === "Admin with this email already exists"
          ) {
            alert(errorMessage);
          } else {
            alert("Failed to create admin: " + errorMessage);
          }
        } else {
          alert("Failed to create admin: " + error.response.data.error);
        }
      } else if (error.request) {
        alert("No response from server");
      } else {
        alert("Error: " + error.message);
      }
    }
  };

  const handleFranchiseInputChange = (e) => {
    const { name, value } = e.target;



    setFranchiseData({ ...franchiseData, [name]: value });

    if (name === "franchisename") {
      if (value.trim() === "") {
        setErrors((prevErrors) => ({ ...prevErrors, franchisename: "" }));
      } else if (value.length < 10) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          franchisename: "Franchise name should consist of a minimum of 10 characters",
        }));
      } else if (value.length > 100) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          franchisename: "Franchise name should consist of only 100 characters",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, franchisename: "" }));
      }
    }

    if (name === "franchiseID") {
      if (value.trim() === "") {
        setErrors((prevErrors) => ({ ...prevErrors, franchiseID: "" }));
      } else if (!/^[a-zA-Z]{3}\d{3}$/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          franchiseID: "Franchise ID must consist of 3 alphabetical characters followed by 3 numeric characters.",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, franchiseID: "" }));
      }
    }

    if (name === "mobileNumber") {
      if (value.trim() === "") {
        setErrors((prevErrors) => ({ ...prevErrors, mobileNumber: "" }));
      } else {
        const mobileRegex = /^[6]\d{0,9}$/; // Starts with 6 and allows up to 10 digits
        if (!mobileRegex.test(value)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            mobileNumber: "Mobile number must start with 6 and contain up to 10 digits.",
          }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, mobileNumber: "" }));
        }
      }
    }


    if (name === "address") {
      if (value.trim() === "") {
        setErrors((prevErrors) => ({ ...prevErrors, address: "" }));
      } else if (value.length < 10) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          address: "Address should consist of a minimum of 10 characters.",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, address: "" }));
      }
    }

    if (name === "pincode") {
      if (value.trim() === "") {
        setErrors((prevErrors) => ({ ...prevErrors, pincode: "" }));
      } else {
        // Remove non-numeric characters
        const numericValue = value.replace(/\D/g, '');
        setFranchiseData({ ...franchiseData, [name]: numericValue });

        // Validate pincode format
        const pincodeRegex = /^[5]\d{5}$/; // Regex to match exactly 6 digits starting with a non-zero digit
        if (!pincodeRegex.test(numericValue)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            pincode: "Pincode must be 6 digits starting with a non-zero digit.",
          }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, pincode: "" }));
        }
      }
    }
  };



  const handleMobileNumberChange = (e) => {
    const { name, value } = e.target;
    setFranchiseData({ ...franchiseData, [name]: value });

    if (name === "mobileNumber") {
      if (value.trim() === "") {
        setErrors((prevErrors) => ({ ...prevErrors, mobileNumber: "" }));
      } else {
        const numericValue = value.replace(/\D/g, '');  // Remove non-numeric characters
        setFranchiseData({ ...franchiseData, [name]: numericValue });

        const mobileRegex = /^[6-9]\d{0,9}$/; // Starts with 6 and allows up to 10 digits
        if (!mobileRegex.test(value)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            mobileNumber: "Mobile number must start with 6 to 9 and contain up to 10 digits.",
          }));
        } else {
          setErrors((prevErrors) => ({ ...prevErrors, mobileNumber: "" }));
        }
      }
    }
  };

  const handleAdminInputChange = (e) => {
    const { name, value } = e.target;



    setAdminData({ ...adminData, [name]: value });

    if (name === "fullname") {
      if (value.trim() === "") {
        setErrors((prevErrors) => ({ ...prevErrors, fullname: "" }));
      } else if (!/^[a-zA-Z\s]+$/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          fullname: "Full name should contain only alphabets.",
        }));
      } else if (value.length > 50) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          fullname: "Full name should not exceed 50 characters.",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, fullname: "" }));
      }
    }

    if (name === "email") {
      if (value.trim() === "") {
        setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
      } else if (!/^[\w-.]+@[a-zA-Z\d-]+\.[a-zA-Z\d-.]+$/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Please enter a valid email address.",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
      }
    }

    if (name === "password") {
      if (value.trim() === "") {
        setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
      } else if (value.length < 8) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "Password should consist of a minimum of 8 characters.",
        }));
      } else if (value.length > 15) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "Password should not exceed 15 characters.",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
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
                      type="text"
                      name="mobileNumber"
                      value={franchiseData.mobileNumber}
                      onChange={handleMobileNumberChange}
                      placeholder=""
                      pattern="\d{10}"
                      maxLength="10"
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
                        type="text"
                        name="pincode"
                        value={franchiseData.pincode}
                        onChange={handleFranchiseInputChange}
                        placeholder=""
                        maxLength={6} // Add maxLength attribute to limit input to 6 characters
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