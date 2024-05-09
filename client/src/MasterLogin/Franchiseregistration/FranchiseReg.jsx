// import React, { useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import "../Franchiseregistration/FranchiseReg.css";

// const FranchiseReg = () => {
//   const [franchiseData, setFranchiseData] = useState({
//     franchisename: "",
//     franchiseID: "",
//     mobileNumber: "",
//     country: "",
//     state: "",
//     city: "",
//     area: "",
//     address: "",
//     pincode: "",
//   });

//   const [adminData, setAdminData] = useState({
//     fullname: "",
//     userId: "",
//     franchisename: "",
//     franchiseID: "",
//     designation: "FranchiseAdmin",
//     email: "",
//     password: "",
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Update adminData and franchiseData with the current values from state and localStorage
//       const createdBy = localStorage.getItem("userId");

//       // Update adminData
//       const updatedAdminData = {
//         ...adminData,
//         franchisename: franchiseData.franchisename,
//         franchiseID: franchiseData.franchiseID,
//         createdBy: createdBy, // Add CreatedBy from localStorage
//       };

//       // Update franchiseData
//       const updatedFranchiseData = {
//         ...franchiseData,
//         createdBy: createdBy, // Add CreatedBy from localStorage
//       };

//       await axios.post("http://localhost:5001/api/admin", updatedAdminData);
//       console.log("admin Data:", updatedAdminData);

//       await axios.post(
//         "http://localhost:5001/api/franchise",
//         updatedFranchiseData
//       );

      
//       console.log("Franchise Data:", updatedFranchiseData);

//       alert("Data submitted successfully.");
//     } catch (error) {
//       console.error("Registration failed:", error.response.data.error);
//     }
//   };

//   const handleFranchiseInputChange = (e) => {
//     setFranchiseData({ ...franchiseData, [e.target.name]: e.target.value });
//   };

//   const handleAdminInputChange = (e) => {
//     setAdminData({ ...adminData, [e.target.name]: e.target.value });
//   };
//   return (
//     <div className="addfr-franchise-Reg">
//       <div className="addfr-franchise-Logo">
//         <div className="addfr-image">
//           <img
//             src="https://tse4.mm.bing.net/th?id=OIP.m4FmOjk0Bx-N4JaBzsBoTgHaEP&pid=Api&P=0&h=180"
//             alt="Loading...!"
//           />
//         </div>
//         <div className="addfr-Registration">
//           <h2>Franchise Registration</h2>
//         </div>
//       </div>
//       <div className="addfr-total">
//         <h2 className="addfr-franchise-details">Franchise Form</h2>
//         <form onSubmit={handleSubmit} className="addfr-franchiseReg-form">
//           <div className="addfr-franchise-column">
//             <div className="addfr-franchise-admin">
//               <div className="addfr-franchise-detail-columns">
//                 <div className="addfr-column">
//                   <div className="addfr-input-wrap">
//                     <input
//                       className="addfr-input"
//                       type="text"
//                       name="franchisename"
//                       value={franchiseData.franchisename}
//                       onChange={handleFranchiseInputChange}
//                       placeholder=""
//                       required
//                     />
//                     <label>
//                       <span>Franchise Name</span>
//                     </label>
//                   </div>
//                   <div className="addfr-input-wrap">
//                     <input
//                       className="addfr-input"
//                       type="text"
//                       name="franchiseID"
//                       value={franchiseData.franchiseID}
//                       onChange={handleFranchiseInputChange}
//                       placeholder=""
//                       required
//                     />
//                     <label>
//                       <span>Franchise ID</span>
//                     </label>
//                   </div>
//                   <div className="addfr-input-wrap">
//                     <input
//                       className="addfr-input"
//                       type="text"
//                       name="mobileNumber"
//                       value={franchiseData.mobileNumber}
//                       onChange={handleFranchiseInputChange}
//                       placeholder=""
//                       required
//                     />
//                     <label>
//                       <span>Mobile Number</span>
//                     </label>
//                   </div>
//                   <div className="addfr-input-wrap">
//                     <input
//                       className="addfr-input"
//                       type="text"
//                       name="country"
//                       value={franchiseData.country}
//                       onChange={handleFranchiseInputChange}
//                       placeholder=""
//                       required
//                     />
//                     <label>
//                       <span>Country</span>
//                     </label>
//                   </div>
//                   <div className="addfr-input-wrap">
//                     <input
//                       className="addfr-input"
//                       type="text"
//                       name="state"
//                       value={franchiseData.state}
//                       onChange={handleFranchiseInputChange}
//                       placeholder=""
//                       required
//                     />
//                     <label>
//                       <span>State</span>
//                     </label>
//                   </div>
//                 </div>
//                 <div className="addfr-column">
//                   <div className="addfr-input-wrap">
//                     <input
//                       className="addfr-input"
//                       type="text"
//                       name="city"
//                       value={franchiseData.city}
//                       onChange={handleFranchiseInputChange}
//                       placeholder=""
//                       required
//                     />
//                     <label>
//                       <span>City</span>
//                     </label>
//                   </div>
//                   <div className="addfr-column">
//                     <div className="addfr-input-wrap">
//                       <input
//                         className="addfr-input"
//                         type="text"
//                         name="area"
//                         value={franchiseData.area}
//                         onChange={handleFranchiseInputChange}
//                         placeholder=""
//                         required
//                       />
//                       <label>
//                         <span>Area</span>
//                       </label>
//                     </div>
//                     <div className="addfr-input-wrap">
//                       <input
//                         className="addfr-input"
//                         type="text"
//                         name="address"
//                         value={franchiseData.address}
//                         onChange={handleFranchiseInputChange}
//                         placeholder=""
//                         required
//                       />
//                       <label>
//                         <span>Address</span>
//                       </label>
//                     </div>
//                     <div className="addfr-input-wrap">
//                       <input
//                         className="addfr-input"
//                         type="text"
//                         name="pincode"
//                         value={franchiseData.pincode}
//                         onChange={handleFranchiseInputChange}
//                         placeholder=""
//                         required
//                       />
//                       <label>
//                         <span>Pincode</span>
//                       </label>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="addfr-admin">
//                 <div className="addfr-column">
//                   <h2 className="addfr-franchise-details-admin">Admin Form</h2>
//                   <div className="addfr-input-wrap">
//                     <input
//                       className="addfr-input"
//                       type="text"
//                       name="fullname"
//                       value={adminData.fullname}
//                       onChange={handleAdminInputChange}
//                       placeholder=""
//                     />
//                     <label>
//                       <span>fullname</span>
//                     </label>
//                   </div>
//                   <div className="addfr-input-wrap">
//                     <input
//                       className="addfr-input"
//                       type="text"
//                       name="userId"
//                       value={adminData.userId}
//                       onChange={handleAdminInputChange}
//                       placeholder=""
//                     />
//                     <label>
//                       <span>userId</span>
//                     </label>
//                   </div>
//                   <div className="addfr-input-wrap">
//                     <input
//                       className="addfr-input"
//                       type="text"
//                       name="designation"
//                       value={adminData.designation}
//                       onChange={handleAdminInputChange}
//                       placeholder=""
//                       readOnly
//                     />
//                     <label>
//                       <span>Designation</span>
//                     </label>
//                   </div>
//                   <div className="addfr-input-wrap">
//                     <input
//                       className="addfr-input"
//                       type="text"
//                       name="email"
//                       value={adminData.email}
//                       onChange={handleAdminInputChange}
//                       placeholder=""
//                     />
//                     <label>
//                       <span>Email</span>
//                     </label>
//                   </div>
//                   <div className="addfr-input-wrap">
//                     <input
//                       className="addfr-input"
//                       type="text"
//                       name="password"
//                       value={adminData.password}
//                       onChange={handleAdminInputChange}
//                       placeholder=""
//                     />
//                     <label>
//                       <span>Password</span>
//                     </label>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <button type="submit" className="addfr-submit-button">
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default FranchiseReg;




import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../Franchiseregistration/FranchiseReg.css";

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
    franchiseID:"",
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

      alert("Data submitted successfully.");
    } catch (error) {
      console.error("Failed to submit data", error);
      alert("Failed to submit data. Please try again.");
    }
  };

  const handleFranchiseInputChange = (e) => {
    const { name, value } = e.target;
    setFranchiseData({ ...franchiseData, [name]: value });

    // Validate franchise name
    if (name === "franchisename") {
      if (value.length < 10 || value.length > 100) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          franchisename:
            "Franchise name must be between 10 and 100 characters.",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, franchisename: "" }));
      }
    }

    // Validate mobile number
    if (name === "mobileNumber") {
      const mobileRegex = /^[1-9]\d{9}$/;
      if (!mobileRegex.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          mobileNumber:
            "Mobile number must be 10 digits",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, mobileNumber: "" }));
      }
    }

    // Validate pincode
    if (name === "pincode") {
      const pincodeRegex = /^[1-9]\d{5}$/;
      if (!pincodeRegex.test(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          pincode: "Pincode must be 6 digits starting with a non-zero digit.",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, pincode: "" }));
      }
    }

    // Validate address
    if (name === "address") {
      if (value.length < 10 || value.length > 250) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          address: "Address must be between 10 and 250 characters.",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, address: "" }));
      }
    }
  };

  const handleAdminInputChange = (e) => {
    const { name, value } = e.target;
    setAdminData({ ...adminData, [name]: value });
    //password validation
    if (name === "password") {
      if (value.length < 8 || value.length > 16) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "Password must be between 8 and 16 characters.",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
      }
    }
    //email validation
    if (name === "email") {
      if (value.length < 10 || value.length > 60) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "email must be between 10 and 60 characters.",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
      }
    }
    //fullname validation
    if (name === "fullname") {
      if (value.length < 3 || value.length > 50) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          fullname: "fullname must be between 3 and 50 characters.",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, fullname: "" }));
      }
    }
  };
  return (
    <div className="addfr-franchise-Reg">
      <div className="addfr-franchise-Logo">
        <div className="addfr-image">
        <img
            src="https://vinootherbal.com/wp-content/uploads/2024/02/grrb-1-1536x804.png"
            alt="logo"
          />
        </div>
        <div className="addfr-Registration">
          <h2>Franchise Registration</h2>
        </div>
      </div>
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
                      <span>Franchise Name <span style={{color:'red'}}>*</span></span>
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
                      <span>Franchise ID <span style={{color:'red'}}>*</span></span>
                    </label>
                  </div>
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
                      <span>Mobile Number <span style={{color:'red'}}>*</span></span>
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
                            onClick={() => handleStateSelection(state.name)}>
                            {state.name}
                          </li>
                        ))}
                      </ul>
                    )}
                    <label>
                      <span>State <span style={{color:'red'}}>*</span></span>
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
                            onClick={() => handleCitySelection(city.name)}>
                            {city.name}
                          </li>
                        ))}
                      </ul>
                    )}
                    <label>
                      <span>City <span style={{color:'red'}}>*</span></span>
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
                              onClick={() => handleAreaSelection(area.name)}>
                              {area.name}
                            </li>
                          ))}
                        </ul>
                      )}
                      <label>
                        <span>Area <span style={{color:'red'}}>*</span></span>
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
                        <span>Address <span style={{color:'red'}}>*</span></span>
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
                        <span>Pincode <span style={{color:'red'}}>*</span></span>
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
                      <span>fullname <span style={{color:'red'}}>*</span></span>
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
                      <span>userId <span style={{color:'red'}}>*</span></span>
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
                      type="text"
                      name="email"
                      value={adminData.email}
                      onChange={handleAdminInputChange}
                      placeholder=""
                      required
                    />
                    <label>
                      <span>Email <span style={{color:'red'}}>*</span></span>
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
                      type="text"
                      name="password"
                      value={adminData.password}
                      onChange={handleAdminInputChange}
                      placeholder=""
                      required
                    />
                    <label>
                      <span>Password <span style={{color:'red'}}>*</span></span>
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
