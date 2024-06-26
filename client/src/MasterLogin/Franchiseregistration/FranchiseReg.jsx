import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import the default styles for React Toastify
// import { Link } from "react-router-dom";
import "../Franchiseregistration/FranchiseReg.css";
import Navbarlanding from "../../../src/Landingpage/Components/Navbar";
import { VINOOTNEW } from "../../Helper/Helper";
const FranchiseReg = () => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [area, setArea] = useState("");
  const [stateInput, setStateInput] = useState("");
  const [city, setCity] = useState("");
  const [focusedInput, setFocusedInput] = useState(null);
  // Add state variables to track input field states
  const [cityDisabled, setCityDisabled] = useState(true);
  const [areaDisabled, setAreaDisabled] = useState(true);
  // const [filteredStates, setFilteredStates] = useState([]);
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
    createdBy: "",
  });

  const [adminData, setAdminData] = useState({
    fullname: "",
    userId: "",
    franchisename: "",
    franchiseID: "",
    designation: "FranchiseAdmin",
    email: "",
    mobileNumber: "",
    password: "",
    createdBy: "",
  });

  const [errors, setErrors] = useState({
    franchisename: "",
    franchiseID: "",
    mobileNumber: "",
    address: "",
    pincode: "",
    password: "",
    fullname: "",
    userId: "",
    email: "",
  });

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get(`${VINOOTNEW}/api/states`);
        const activeStates = response.data.filter(
          (state) =>
            state.status === "active" &&
            state.name.toLowerCase().includes(stateInput.toLowerCase())
        );
        setStates(activeStates);
        // setFilteredStates(activeStates);
      } catch (error) {
        console.error("Failed to fetch states", error);
      }
    };
    fetchStates();
  }, [stateInput]); // Add stateInput to dependency array

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(`${VINOOTNEW}/api/cities`);
        const activeCities = response.data.filter(
          (city) => city.status === "active"
        );
        setCities(activeCities);
        setFilteredCities(activeCities); // Initialize filteredCities with active cities
      } catch (error) {
        // console.error("Failed to fetch cities", error);
      }
    };
    fetchCities();
  }, []);

  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const response = await axios.get(`${VINOOTNEW}/api/areas`);
        setAreas(response.data);
        setFilteredAreas(response.data); // Initialize filteredAreas with all areas
      } catch (error) {
        // console.error("Failed to fetch areas", error);
      }
    };
    fetchAreas();
  }, []);

  const handleStateChange = (event) => {
    const value = event.target.value;
    setStateInput(value);
    setFocusedInput("state");

    setCityDisabled(true); // Enable city input when state is selected
    setAreaDisabled(true); // Disable area input when state is selected
    setCity("");
    setArea("");
  };
  // Function to handle clicks outside of suggestion box or input fields
  const handleClickOutside = (event) => {
    if (
      focusedInput !== null &&
      !event.target.closest(".addfr-input-wrap") // Check if clicked outside of input fields
    ) {
      setFocusedInput(null); // Close suggestion boxes
    }
  };

  // Add event listener when component mounts
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    // Cleanup the event listener when component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [focusedInput]);

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
  // Update useEffect hook to filter cities based on state input and city name
  useEffect(() => {
    if (stateInput.trim() === "") {
      setFilteredCities([]); // Clear city suggestions if state input is empty
      setFilteredAreas([]); // Clear area suggestions if state input is empty
    } else {
      const filteredCities = cities.filter(
        (cit) =>
          cit.state_id === franchiseData.state.state_id &&
          cit.name.toLowerCase().includes(city.toLowerCase())
      );
      setFilteredCities(filteredCities);
    }
  }, [stateInput, cities, franchiseData.state, city]); // Add city to dependency array

  // Update useEffect hook to filter areas based on area name
  useEffect(() => {
    const filteredAreas = areas.filter(
      (are) =>
        are.state_id === franchiseData.state.state_id &&
        are.name.toLowerCase().includes(area.toLowerCase())
    );
    setFilteredAreas(filteredAreas);
  }, [area, areas, franchiseData.state]); // Add area to dependency array

  const handleStateSelection = (selectedStateId, selectedStateName) => {
    setStateInput(selectedStateName);
    setFranchiseData({
      ...franchiseData,
      state: { state_id: selectedStateId, name: selectedStateName }, // Update state with ID and name
    });
    setCity(""); // Clear the city input
    setArea(""); // Clear the area input
    setFocusedInput(null);
    setCityDisabled(false); // Enable city input when state is selected
    setAreaDisabled(true); // Disable area input when state is selected
    // Filter cities based on the selected state's ID
    const filteredCities = cities.filter(
      (city) => city.state_id === selectedStateId
    );
    setFilteredCities(filteredCities);

    // Filter areas based on the selected state's ID
    const filteredAreas = areas.filter(
      (area) => area.state_id === selectedStateId
    );
    setFilteredAreas(filteredAreas);
  };

  const handleCitySelection = (selectedCity) => {
    setCity(selectedCity);
    setFranchiseData({
      ...franchiseData,
      city: selectedCity,
    });
    setFocusedInput(null);
    setAreaDisabled(false); // Enable area input when city is selected
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
    // Check if state, city, and area are selected
    if (!franchiseData.state) {
      toast.error("Please select state from suggestions", {
        position: "top-right",
        autoClose: 1500,
      });
      return;
    } else if (!franchiseData.city) {
      toast.error("Please select city from suggestions", {
        position: "top-right",
        autoClose: 1500,
      });
      return;
    } else if (!franchiseData.area) {
      toast.error("Please select area from suggestions", {
        position: "top-right",
        autoClose: 1500,
      });
      return;
    }
    // Check for errors
    for (const error in errors) {
      if (errors[error] !== "") {
        toast.error("Please fix the errors before submitting", {
          position: "top-right",
          autoClose: 1500,
        });
        return;
      }
    }

    try {
      // Prepare data for API request
      const createdBy = localStorage.getItem("userId");
      const updatedAdminData = {
        ...adminData,
        franchisename: franchiseData.franchisename,
        franchiseID: franchiseData.franchiseID,
        createdBy: createdBy,
        mobileNumber: franchiseData.mobileNumber,
      };
      const updatedFranchiseData = {
        ...franchiseData,
        state: franchiseData.state.name, // Pass state_id instead of the entire state object
        createdBy: createdBy,
      };
      // Check if franchiseID already exists
      const existingFranchise = await axios.get(
        `${VINOOTNEW}/api/franchise/${franchiseData.franchiseID}`
      );
      if (existingFranchise.data) {
        toast.error("Franchise ID already exists", {
          position: "top-right",
          autoClose: 1500,
        });
        return;
      }

      // Check if userID already exists
      const existingUser = await axios.get(
        `${VINOOTNEW}/api/admin/${adminData.userId}`
      );
      if (existingUser.data) {
        toast.error("User ID already exists", {
          position: "top-right",
          autoClose: 1500,
        });
        return;
      }

      // Send a request to create admin
      await axios.post(`${VINOOTNEW}/api/admin`, updatedAdminData);

      // Send a request to create franchise
      await axios.post(`${VINOOTNEW}/api/franchise`, updatedFranchiseData);

      // Clear form values after successful submission
      setAdminData({
        fullname: "",
        userId: "",
        franchisename: "",
        franchiseID: "",
        designation: "FranchiseAdmin",
        email: "",
        password: "",
        createdBy: "",
      });
      setStateInput("");
      setCity("");
      setArea("");

      setFranchiseData({
        franchisename: "",
        franchiseID: "",
        mobileNumber: "",
        state: "",
        city: "",
        area: "",
        address: "",
        pincode: "",
        createdBy: "",
      });

      toast.success("Franchise created successfully", {
        position: "top-right",
        autoClose: 1500,
      });
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          if (error.response.data.error === "franchiseID already exists") {
            // Handle email already exists error
            // Display appropriate message to the user
            toast.error("franchiseID already exists", {
              position: "top-right",
              autoClose: 1500,
            });
          } else if (error.response.data.error === "User ID already exists") {
            toast.error("User ID already exists", {
              position: "top-right",
              autoClose: 1500,
            });
          }
        } else {
          // Handle other server errors
          // Display generic error message to the user
          toast.error("Server Error. Please try again later.", {
            position: "top-right",
            autoClose: 1500,
          });
        }
      } else if (error.request) {
        // The request was made but no response was received
        // Display appropriate message to the user
        toast.error(
          "No response received from server. Please try again later.",
          {
            position: "top-right",
            autoClose: 1500,
          }
        );
      } else {
        // Something happened in setting up the request that triggered an Error
        // Display generic error message to the user
        toast.error("Unexpected error occurred. Please try again later.", {
          position: "top-right",
          autoClose: 1500,
        });
      }
    }
  };

  const handleFranchiseInputChange = (e) => {
    const { name, value } = e.target;

    setFranchiseData({ ...franchiseData, [name]: value });

    if (name === "franchisename") {
      if (value.trim() === "") {
        setErrors((prevErrors) => ({ ...prevErrors, franchisename: "" }));
      } else if (
        !/^(?=.*[A-Z].*[A-Z].*[A-Z].*[A-Z].*[A-Z].*[A-Z].*[A-Z])[A-Z0-9\s]{10,}$/.test(
          value
        )
      ) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          franchisename:
            "Franchise name should contain at least 7 uppercase alphabet characters in any order and be at least 10 characters long.",
        }));
      } else if (value.length > 100) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          franchisename: "Franchise name should not exceed 100 characters",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, franchisename: "" }));
      }
    }

    if (name === "franchiseID") {
      if (value.trim() === "") {
        setErrors((prevErrors) => ({ ...prevErrors, franchiseID: "" }));
      } else if (!/^[A-Z]{3}\d{3}$/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          franchiseID:
            "Franchise ID must consist of 3 alphabetical characters followed by 3 numeric characters.",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, franchiseID: "" }));
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
        const numericValue = value.replace(/\D/g, "");
        setFranchiseData({ ...franchiseData, [name]: numericValue });

        // Validate pincode format
        const pincodeRegex = /^[1-9]\d{5}$/; // Regex to match exactly 6 digits starting with a non-zero digit
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
        const numericValue = value.replace(/\D/g, ""); // Remove non-numeric characters
        setFranchiseData({ ...franchiseData, [name]: numericValue });

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
            [name]: "Mobile number must contain 10 digits.",
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
      } else if (!/^[a-zA-Z\s']{3,50}$/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          fullname:
            "Full name should contain only alphabets and be between 3 and 50 characters long.",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, fullname: "" }));
      }
    }
    if (name === "userId") {
      if (value.trim() === "") {
        setErrors((prevErrors) => ({ ...prevErrors, userId: "" }));
      } else if (!/^[A-Z]{3}\d{3}$/.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          userId:
            "userId must consist of 3 alphabetical characters followed by 3 numeric characters.",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, userId: "" }));
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
      } else if (
        !/^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9\s]).{8,16}$/.test(value)
      ) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password:
            "Password should contain at least one number, one alphabet, one special character, and be between 8 and 16 characters long.",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
      }
    }
  };

  return (
    <div className="addfr-franchise-Reg">
      <ToastContainer />
      <Navbarlanding />
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
                      maxLength={6}
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
                        {states.map((state) => (
                          <li
                            key={state._id}
                            onClick={() =>
                              handleStateSelection(state.state_id, state.name)
                            }>
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
                      disabled={cityDisabled} // Disable city input initially
                      required
                    />
                    {focusedInput === "city" && (
                      <ul className="suggestion-list1">
                        {filteredCities.map((city) => (
                          <li
                            key={city._id}
                            onClick={() => handleCitySelection(city.name)}>
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
                        disabled={areaDisabled} // Disable area input initially
                        required
                      />
                      {focusedInput === "area" && (
                        <ul className="suggestion-list1">
                          {filteredAreas.map((area) => (
                            <li
                              key={area._id}
                              onClick={() => handleAreaSelection(area.name)}>
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
                      maxLength={16}
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
