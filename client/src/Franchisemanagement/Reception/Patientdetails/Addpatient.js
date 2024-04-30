// import React, { useState,useEffect } from 'react';
// // import './PatientForm.css';
// import axios from 'axios';
// import { VINOOTNEW } from '../../Helper/Helper';
// function PatientForm() {
//     const [states, setStates] = useState("");
//     const [suggestions, setSuggestions] = useState([]);
//     const [isLoading, setIsLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     dob: '',
//     gender: '',
//     mobileNumber: '',
//     state: '',
//     city: '',
//     area: '',
//     address: ''
//   });



//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const [submitting, setSubmitting] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true); // Set submitting state to true
//     try {
//       const response = await axios.post('/api/patients', formData);
//       console.log(response.data);
//       alert('Form submitted successfully'); // Show success alert
//     } catch (error) {
//       console.error('Error submitting form:', error);
//       alert('Form submission failed'); // Show error alert
//     } finally {
//       setSubmitting(false); // Reset submitting state after form submission
//     }
//   };

//   const handleStateChange = (e) => {
//     const selectedState = e.target.value;
//     setFormData({ ...formData, state: selectedState, city: '' });
//   };

// //   -----------------

// // Inside the useEffect hook in PatientForm component
// // useEffect(() => {
// //     const fetchSuggestions = async () => {
// //       if (states !== "") { // Check if state is not empty
// //         setIsLoading(true);
// //         try {
// //           const response = await axios.get(
// //             // `${VINOOTNEW}/api/suggeststates`,
// //             `http://127.0.0.1:5001/api/suggeststates`,
// //             {
// //               params: { query: states }, // Send query parameter
// //             }
// //           );
// //           setSuggestions(response.data); // Store the suggestions
// //         } catch (error) {
// //           console.error('Error fetching state suggestions:', error);
// //           // Handle error if needed
// //         } finally {
// //           setIsLoading(false);
// //         }
// //       } else {
// //         setSuggestions([]); // Clear suggestions if states is empty
// //       }
// //     };

// //     const timeoutId = setTimeout(fetchSuggestions, 300); // Debounce

// //     return () => clearTimeout(timeoutId);
// //   }, [states]);

// // Inside the useEffect hook in PatientForm component

// useEffect(() => {
//     const fetchSuggestions = async () => {
//       try {
//         setIsLoading(true);
//         const response = await axios.get(`${VINOOTNEW}/api/suggeststates`, {
//           params: { query: states },
//         });
//         setSuggestions(response.data);
//       } catch (error) {
//         console.error('Error fetching state suggestions:', error);
//         // Handle error if needed
//       } finally {
//         setIsLoading(false);
//       }
//     };
  
//     if (states.trim() !== '') {
//       fetchSuggestions();
//     } else {
//       setSuggestions([]); // Clear suggestions if states is empty
//     }
//   }, [states]);
  


//   const handleSuggestionClick = (suggestion) => {
//     setStates(suggestion.state_name); // Update states state variable
//     setSuggestions([]); // Clear suggestions after selecting one
// };

//   return (
//     <form className="patient-form" onSubmit={handleSubmit}>
//         <h2>ADD PATIENT</h2>
//         <div className='total2'>
//         <div className='inp'>
//       <label>
//         Patient Name:
//         <input type="text" name="name" value={formData.name} onChange={handleChange} />
//       </label>
//       <label>
//         Email:
//         <input type="email" name="email" value={formData.email} onChange={handleChange} />
//       </label>
//       <label>
//         Date of Birth:
//         <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
//       </label>
//       <label>
//         Gender:
//         <select name="gender" value={formData.gender} onChange={handleChange}>
//           <option value="">Select</option>
//           <option value="male">Male</option>
//           <option value="female">Female</option>
//           <option value="other">Other</option>
//         </select>
//       </label>
//       <label>
//         Mobile Number:
//         <input type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} />
//       </label>
//       </div>
//       <div className='inp2'>
//         <p>State</p>

//     {/* {isLoading && <div>Loading...</div>}
//       {suggestions.length > 0 && (
//         <div  className='statesfetch'>
//           {suggestions.map((suggestion) => (
//             <p
//               value={states}
//               key={suggestion._id}
//               onClick={() => handleSuggestionClick(suggestion)} // Event handler for clicks
//               style={{ cursor: "pointer", padding: "15px" }}>
//               {suggestion.state_name}
//             </p>
//           ))}
//         </div>
//       )} */}
//         {/* <p>City</p> */}
//         {/* <p>Area</p> */}

//         {isLoading && <div>Loading...</div>}
// {!isLoading && suggestions.length > 0 && (
//   <div className="suggestion-container">
//     {suggestions.map((suggestion) => (
//       <div
//         key={suggestion._id} // Assuming _id is the unique identifier for a state
//         onClick={() => handleSuggestionClick(suggestion)}
//         className="suggestion-item">
//         {suggestion.name} {/* Assuming name is the field to display */}
//       </div>
//     ))}
//   </div>
// )}




//       <label>
//         Address:
//         <textarea name="address" value={formData.address} onChange={handleChange} />
//       </label>
//       </div>
//       </div>
//       <button className='btn2' type="submit" disabled={submitting}>
//         {submitting ? 'Submitting...' : 'Submit'}
//       </button>
//     </form>
//   );
// }

// export default PatientForm;



import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Addpatient.css"; 
import ReceptionSidebar from "../ReceptionSidebar/ReceptionSidebar";

const PatientForm = () => {
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
  const [formData, setFormData] = useState({
    patient_id: "",
    franchise_name: "",
    franchise_id: "",
    patient_name: "",
    gender: "",
    dob: "",
    email: "",
    mobile_number: "",
    state: "",
    city: "",
    area: "",
    address: "",
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
    setFormData({
      ...formData,
      state: selectedState, // Add selected state to formData
    });
    setFocusedInput(null); // Hide suggestion list when a suggestion is clicked
  };

  const handleCitySelection = (selectedCity) => {
    setCity(selectedCity);
    setFormData({
      ...formData,
      city: selectedCity, // Add selected city to formData
    });
    setFocusedInput(null); // Hide suggestion list when a suggestion is clicked
  };

  const handleAreaSelection = (selectedArea) => {
    setArea(selectedArea);
    setFormData({
      ...formData,
      area: selectedArea, // Add selected area to formData
    });
    setFocusedInput(null); // Hide suggestion list when a suggestion is clicked
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/api/patient", {
        ...formData,
        dob: formData.dob.substring(0, 10), // Extract only the date part
      });
      console.log(response.data); // Assuming response.data contains the newly created patient data
      // Reset form data after successful submission
      setFormData({
        patient_id: "",
        franchise_name: "",
        franchise_id: "",
        patient_name: "",
        gender: "",
        dob: "",
        email: "",
        mobile_number: "",
        address: "",
        state: "",
        city: "",
        area: "",
      });
      setStateInput(""); // Clear the state input
      setCity(""); // Clear the city input
      setArea(""); // Clear the area input
    } catch (error) {
      console.error("Failed to submit data", error);
    }
  };

  return (
    <div  className="addpa-total">
      <div>
        <ReceptionSidebar/>
      </div>
  
    <div  className="addp-right">
      <h1 className="h1-head">Patient Form</h1>
      <div className="input-container">
        <form action="" onSubmit={handleSubmit}>
          <div className="column-wrapper">
            <div className="column">
              <div className="input-wrapper">
                <label htmlFor="patient_id">Patient ID:</label>
                <input
                  id="patient_id"
                  type="text"
                  name="patient_id"
                  value={formData.patient_id}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="franchise_name">Franchise Name:</label>
                <input
                  id="franchise_name"
                  type="text"
                  name="franchise_name"
                  value={formData.franchise_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="franchise_id">Franchise ID:</label>
                <input
                  id="franchise_id"
                  type="text"
                  name="franchise_id"
                  value={formData.franchise_id}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="patient_name">Patient Name:</label>
                <input
                  id="patient_name"
                  type="text"
                  name="patient_name"
                  value={formData.patient_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="dob">Date of Birth:</label>
                <input
                  id="dob"
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="email">Email:</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="column">
              <div className="input-wrapper">
                <label htmlFor="mobile_number">Mobile Number:</label>
                <input
                  id="mobile_number"
                  type="number"
                  placeholder="888 888 8888"
                  pattern="[0-9]{10}"
                  title="Ten digits code"
                  name="mobile_number"
                  value={formData.mobile_number}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-wrapper">
                <label htmlFor="genderSelect">Gender:</label>
                <select
                  id="genderSelect"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  required>
                  <option value="">select the gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
              </div>
              <div className="input-wrapper">
                <label htmlFor="stateInput">State:</label>
                <input
                  id="stateInput"
                  type="text"
                  value={stateInput}
                  onChange={handleStateChange}
                  onFocus={() => setFocusedInput("state")}
                  required
                />
                {focusedInput === "state" && (
                  <ul className="suggestion-list">
                    {filteredStates.map((state) => (
                      <li
                        key={state._id}
                        onClick={() => handleStateSelection(state.name)}>
                        {state.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="input-wrapper">
                <label htmlFor="cityInput">City:</label>
                <input
                  id="cityInput"
                  type="text"
                  value={city}
                  onChange={handleCityChange}
                  onFocus={() => setFocusedInput("city")}
                  required
                />
                {focusedInput === "city" && (
                  <ul className="suggestion-list">
                    {filteredCities.map((city) => (
                      <li
                        key={city._id}
                        onClick={() => handleCitySelection(city.name)}>
                        {city.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="input-wrapper">
                <label htmlFor="areaInput">Area:</label>
                <input
                  id="areaInput"
                  type="text"
                  value={area}
                  onChange={handleAreaChange}
                  onFocus={() => setFocusedInput("area")}
                  required
                />
                {focusedInput === "area" && (
                  <ul className="suggestion-list">
                    {filteredAreas.map((area) => (
                      <li
                        key={area._id}
                        onClick={() => handleAreaSelection(area.name)}>
                        {area.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="input-wrapper">
                <label htmlFor="address">Address:</label>
                <input
                  id="address"
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>
          <div>
            <button className="patsubmit-btn" type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default PatientForm;