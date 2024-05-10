// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./Addpatient.css";
// import ReceptionSidebar from "../ReceptionSidebar/ReceptionSidebar";

// const PatientForm = () => {
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [areas, setAreas] = useState([]);
//   const [area, setArea] = useState("");
//   const [stateInput, setStateInput] = useState("");
//   const [city, setCity] = useState("");
//   const [focusedInput, setFocusedInput] = useState(null);
//   const [filteredStates, setFilteredStates] = useState([]);
//   const [filteredCities, setFilteredCities] = useState([]);
//   const [filteredAreas, setFilteredAreas] = useState([]);
//   const [formData, setFormData] = useState({
//     patient_id: "",
//     patient_name: "",
//     gender: "",
//     dob: "",
//     email: "",
//     mobile_number: "",
//     state: "",
//     city: "",
//     area: "",
//     address: "",
//   });
//   const [errors, setErrors] = useState({
//     patient_name: "",
//     mobile_number: "",
//     dob: "",
//     email: "",
//     address: "",
//   });

//   useEffect(() => {
//     // Fetch states data when component mounts
//     const fetchStates = async () => {
//       try {
//         const response = await axios.get("http://localhost:5001/api/states");
//         setStates(response.data);
//         setFilteredStates(response.data); // Initialize filteredStates with all states
//       } catch (error) {
//         console.error("Failed to fetch states", error);
//       }
//     };
//     fetchStates();
//   }, []);

//   useEffect(() => {
//     // Fetch cities data when component mounts
//     const fetchCities = async () => {
//       try {
//         const response = await axios.get("http://localhost:5001/api/cities");
//         setCities(response.data);
//         setFilteredCities(response.data); // Initialize filteredCities with all cities
//       } catch (error) {
//         console.error("Failed to fetch cities", error);
//       }
//     };
//     fetchCities();
//   }, []);

//   useEffect(() => {
//     // Fetch areas data when component mounts
//     const fetchAreas = async () => {
//       try {
//         const response = await axios.get("http://localhost:5001/api/areas");
//         setAreas(response.data);
//         setFilteredAreas(response.data); // Initialize filteredAreas with all areas
//       } catch (error) {
//         console.error("Failed to fetch areas", error);
//       }
//     };
//     fetchAreas();
//   }, []);

//   useEffect(() => {
//     // Filter states based on input value
//     if (stateInput.trim() === "") {
//       setFilteredStates(states); // Show all states if input is empty
//     } else {
//       const filteredStates = states.filter((state) =>
//         state.name.toLowerCase().includes(stateInput.toLowerCase())
//       );
//       setFilteredStates(filteredStates);
//     }
//   }, [stateInput, states]);

//   useEffect(() => {
//     // Filter cities based on input value
//     if (city.trim() === "") {
//       setFilteredCities(cities); // Show all cities if input is empty
//     } else {
//       const filteredCities = cities.filter((cityItem) =>
//         cityItem.name.toLowerCase().includes(city.toLowerCase())
//       );
//       setFilteredCities(filteredCities);
//     }
//   }, [city, cities]);

//   useEffect(() => {
//     // Filter areas based on input value
//     if (area.trim() === "") {
//       setFilteredAreas(areas); // Show all areas if input is empty
//     } else {
//       const filteredAreas = areas.filter((areaItem) =>
//         areaItem.name.toLowerCase().includes(area.toLowerCase())
//       );
//       setFilteredAreas(filteredAreas);
//     }
//   }, [area, areas]);

//   const generatePatientID = (patients) => {
//     if (patients.length === 0) {
//       // If there are no existing patients, start with the first ID
//       return "PAT001";
//     } else {
//       // Extract the numeric part of the last patient ID
//       const lastIDNumeric = parseInt(
//         patients[patients.length - 1].patient_id.substr(3),
//         10
//       );
//       // Increment the numeric part by 1
//       const nextIDNumeric = lastIDNumeric + 1;
//       // Pad the numeric part with zeros to maintain the format "PAT001"
//       const nextID = "PAT" + nextIDNumeric.toString().padStart(3, "0");
//       return nextID;
//     }
//   };

//   const handleStateChange = (event) => {
//     const value = event.target.value;
//     setStateInput(value);
//     setFocusedInput("state");
//   };

//   const handleCityChange = (event) => {
//     const value = event.target.value;
//     setCity(value);
//     setFocusedInput("city");
//   };

//   const handleAreaChange = (event) => {
//     const value = event.target.value;
//     setArea(value);
//     setFocusedInput("area");
//   };

//   const handleStateSelection = (selectedState) => {
//     setStateInput(selectedState);
//     setFormData({
//       ...formData,
//       state: selectedState, // Add selected state to formData
//     });
//     setFocusedInput(null); // Hide suggestion list when a suggestion is clicked
//   };

//   const handleCitySelection = (selectedCity) => {
//     setCity(selectedCity);
//     setFormData({
//       ...formData,
//       city: selectedCity, // Add selected city to formData
//     });
//     setFocusedInput(null); // Hide suggestion list when a suggestion is clicked
//   };

//   const handleAreaSelection = (selectedArea) => {
//     setArea(selectedArea);
//     setFormData({
//       ...formData,
//       area: selectedArea, // Add selected area to formData
//     });
//     setFocusedInput(null); // Hide suggestion list when a suggestion is clicked
//   };
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });

//     // Validate input values
//     switch (name) {
//       case "patient_name":
//         if (value.length < 3 || value.length > 50) {
//           setErrors((prevErrors) => ({
//             ...prevErrors,
//             [name]: "Patient name should be between 3 and 50 characters",
//           }));
//         } else {
//           setErrors((prevErrors) => ({
//             ...prevErrors,
//             [name]: "",
//           }));
//         }
//         break;
//       case "mobile_number":
//         if (!/^\d{10}$/.test(value)) {
//           setErrors((prevErrors) => ({
//             ...prevErrors,
//             [name]: "Please enter a valid 10-digit mobile number",
//           }));
//         } else {
//           setErrors((prevErrors) => ({
//             ...prevErrors,
//             [name]: "",
//           }));
//         }
//         break;
//       case "dob":
//         const dobDate = new Date(value);
//         const presentDate = new Date();
//         const minDobDate = new Date();
//         const selectedDate = new Date(value);
//         minDobDate.setFullYear(presentDate.getFullYear() - 140);
//         if (dobDate < minDobDate) {
//           setErrors((prevErrors) => ({
//             ...prevErrors,
//             [name]: "Date of birth should be at less than 140 years ago",
//           }));
//         } else if (selectedDate > presentDate) {
//           setErrors((prevErrors) => ({
//             ...prevErrors,
//             [name]: "Date of birth cannot be a future date",
//           }));
//         } else {
//           setErrors((prevErrors) => ({
//             ...prevErrors,
//             [name]: "",
//           }));
//         }
//         break;
//       case "email":
//         if (
//           value.length < 10 ||
//           value.length > 60 ||
//           !/\S+@\S+\.\S+/.test(value)
//         ) {
//           setErrors((prevErrors) => ({
//             ...prevErrors,
//             [name]: "Please enter a valid email address (10-60 characters)",
//           }));
//         } else {
//           setErrors((prevErrors) => ({
//             ...prevErrors,
//             [name]: "",
//           }));
//         }
//         break;
//       case "address":
//         if (value.length < 10 || value.length > 250) {
//           setErrors((prevErrors) => ({
//             ...prevErrors,
//             [name]: "Address should be between 10 and 250 characters",
//           }));
//         } else {
//           setErrors((prevErrors) => ({
//             ...prevErrors,
//             [name]: "",
//           }));
//         }
//         break;
//       default:
//         break;
//     }
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Generate the patient ID
//     const newPatientID = generatePatientID(patients);
//     // Update the form data with the generated patient ID
//     setFormData({
//       ...formData,
//       patient_id: newPatientID,
//     });
//     // Check if there are any errors before submitting the form
//     const formValid = Object.values(errors).every((error) => error === "");
//     if (formValid) {
//       try {
//         const dobDateOnly = formData.dob.split("T")[0];
//         const createdBy = localStorage.getItem("userId");
//         const franchiseName = localStorage.getItem("franchisename");
//         const FranchiseID = localStorage.getItem("FranchiseID");

//         const response = await axios.post("http://localhost:5001/api/patient", {
//           ...formData,
//           createdBy: createdBy,
//           franchiseName: franchiseName,
//           FranchiseID: FranchiseID,
//           dob: dobDateOnly, // Extract only the date part
//         });

//         console.log(response.data); // Assuming response.data contains the newly created patient data
//         // Reset form data after successful submission
//         setFormData({
//           patient_id: "",
//           patient_name: "",
//           gender: "",
//           dob: "",
//           email: "",
//           mobile_number: "",
//           address: "",
//           state: "",
//           city: "",
//           area: "",
//         });
//         setStateInput(""); // Clear the state input
//         setCity(""); // Clear the city input
//         setArea(""); // Clear the area input
//         alert("patient added successfully!");
//       } catch (error) {
//         console.error("Failed to submit data", error);
//       }
//     } else {
//       alert("Form has errors. Please fix them before submitting.");
//     }
//   };

//   // ------------------------

//   const [patients, setPatients] = useState([]);

//   useEffect(() => {
//     fetchPatients();
//   }, []);

//   const fetchPatients = async () => {
//     try {
//       const frid = localStorage.getItem("FranchiseID");

//       if (frid) {
//         const response = await axios.get(
//           `http://localhost:5001/api/patients${frid}`
//         );
//         setPatients(response.data);
//       } else {
//         console.error("FranchiseID not found in localStorage");
//       }
//     } catch (error) {
//       console.error("Error fetching patients:", error);
//     }
//   };

//   // useEffect(() => {
//   //   // Fetch patients data when component mounts
//   //   const fetchPatients = async () => {
//   //     try {
//   //       const response = await axios.get("http://localhost:5001/api/patients");
//   //       setPatients(response.data);
//   //     } catch (error) {
//   //       console.error("Failed to fetch patients", error);
//   //     }
//   //   };
//   //   fetchPatients();
//   // }, []);

//   // Initialize form data including the patient ID
//   useEffect(() => {
//     const newPatientID = generatePatientID(patients);
//     setFormData({
//       ...formData,
//       patient_id: newPatientID,
//     });
//   }, [patients]);

//   return (
//     <div className="addpa-total">
//       <div>
//         <ReceptionSidebar />
//       </div>

//       <div className="addp-right">
//         <h1 className="h1-head">Patient Form</h1>
//         <div className="input-container">
//           <form action="" onSubmit={handleSubmit}>
//             <div className="column-wrapper">
//               <div className="column">
//                 <div className="input-wrapper">
//                   <label htmlFor="patient_id">Patient ID:</label>
//                   <input
//                     id="patient_id"
//                     type="text"
//                     name="patient_id"
//                     value={formData.patient_id}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>

//                 {/* <div className="input-wrapper">
//                 <label htmlFor="franchise_name">Franchise Name:</label>
//                 <input
//                   id="franchise_name"
//                   type="text"
//                   name="franchise_name"
//                   value={formData.franchise_name}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
//               <div className="input-wrapper">
//                 <label htmlFor="franchise_id">Franchise ID:</label>
//                 <input
//                   id="franchise_id"
//                   type="text"
//                   name="franchise_id"
//                   value={formData.franchise_id}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div> */}
//                 <div className="input-wrapper">
//                   <label htmlFor="patient_name">Patient Name:</label>
//                   <input
//                     id="patient_name"
//                     type="text"
//                     name="patient_name"
//                     value={formData.patient_name}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>
//                 {errors.patient_name && (
//                   <span className="error">{errors.patient_name}</span>
//                 )}
//                 <div className="input-wrapper">
//                   <label htmlFor="dob">Date of Birth:</label>
//                   <input
//                     id="dob"
//                     type="date"
//                     name="dob"
//                     value={formData.dob}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>
//                 {errors.dob && <span className="error">{errors.dob}</span>}
//                 <div className="input-wrapper">
//                   <label htmlFor="email">Email:</label>
//                   <input
//                     id="email"
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>
//                 {errors.email && <span className="error">{errors.email}</span>}
//                 <div className="input-wrapper">
//                   <label htmlFor="mobile_number">Mobile Number:</label>
//                   <input
//                     id="mobile_number"
//                     type="number"
//                     placeholder="888 888 8888"
//                     pattern="[0-9]{10}"
//                     title="Ten digits code"
//                     name="mobile_number"
//                     value={formData.mobile_number}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>
//                 {errors.mobile_number && (
//                   <span className="error">{errors.mobile_number}</span>
//                 )}
//               </div>

//               <div className="column">
//                 <div className="input-wrapper">
//                   <label htmlFor="genderSelect">Gender:</label>
//                   <select
//                     id="genderSelect"
//                     name="gender"
//                     value={formData.gender}
//                     onChange={handleInputChange}
//                     required
//                   >
//                     <option value="">select the gender</option>
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                     <option value="Others">Others</option>
//                   </select>
//                 </div>
//                 <div className="input-wrapper">
//                   <label htmlFor="stateInput">State:</label>
//                   <input
//                     id="stateInput"
//                     type="text"
//                     value={stateInput}
//                     onChange={handleStateChange}
//                     onFocus={() => setFocusedInput("state")}
//                     required
//                   />
//                   {focusedInput === "state" && (
//                     <ul className="suggestion-list">
//                       {filteredStates.map((state) => (
//                         <li
//                           key={state._id}
//                           onClick={() => handleStateSelection(state.name)}
//                         >
//                           {state.name}
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </div>
//                 <div className="input-wrapper">
//                   <label htmlFor="cityInput">City:</label>
//                   <input
//                     id="cityInput"
//                     type="text"
//                     value={city}
//                     onChange={handleCityChange}
//                     onFocus={() => setFocusedInput("city")}
//                     required
//                   />
//                   {focusedInput === "city" && (
//                     <ul className="suggestion-list">
//                       {filteredCities.map((city) => (
//                         <li
//                           key={city._id}
//                           onClick={() => handleCitySelection(city.name)}
//                         >
//                           {city.name}
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </div>
//                 <div className="input-wrapper">
//                   <label htmlFor="areaInput">Area:</label>
//                   <input
//                     id="areaInput"
//                     type="text"
//                     value={area}
//                     onChange={handleAreaChange}
//                     onFocus={() => setFocusedInput("area")}
//                     required
//                   />
//                   {focusedInput === "area" && (
//                     <ul className="suggestion-list">
//                       {filteredAreas.map((area) => (
//                         <li
//                           key={area._id}
//                           onClick={() => handleAreaSelection(area.name)}
//                         >
//                           {area.name}
//                         </li>
//                       ))}
//                     </ul>
//                   )}
//                 </div>
//                 <div className="input-wrapper">
//                   <label htmlFor="address">Address:</label>
//                   <textarea
//                     id="address"
//                     type="text"
//                     name="address"
//                     value={formData.address}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </div>
//                 {errors.address && (
//                   <span className="error">{errors.address}</span>
//                 )}
//               </div>
//             </div>
//             <div>
//               <button className="patsubmit-btn" type="submit">
//                 Submit
//               </button>
//             </div>
//           </form>
//         </div>

//         <div className="patientdetail-fetch">
//           <h2>Patients</h2>
//           <table>
//             <thead>
//               <tr>
//                 <th>Patient ID</th>
//                 <th>Name</th>
//                 <th>Gender</th>
//                 <th>Date of Birth</th>
//                 <th>Email</th>
//                 <th>Mobile Number</th>
//                 <th>State</th>
//                 <th>City</th>
//                 <th>Area</th>
//                 <th>Address</th>
//                 <th>Created By</th>
//                 {/* <th>Franchise Name</th>
//                 <th>Franchise ID</th> */}
//               </tr>
//             </thead>
//             <tbody>
//               {patients.map((patient) => (
//                 <tr key={patient._id}>
//                   <td>{patient.patient_id}</td>
//                   <td>{patient.patient_name}</td>
//                   <td>{patient.gender}</td>
//                   <td>{patient.dob}</td>
//                   <td>{patient.email}</td>
//                   <td>{patient.mobile_number}</td>
//                   <td>{patient.state}</td>
//                   <td>{patient.city}</td>
//                   <td>{patient.area}</td>
//                   <td>{patient.address}</td>
//                   <td>{patient.createdBy}</td>
//                   {/* <td>{patient.franchiseName}</td>
//                   <td>{patient.FranchiseID}</td> */}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PatientForm;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Addpatient.css";
// import ReceptionSidebar from "../ReceptionSidebar/ReceptionSidebar";
import Patientdetails1 from "./Patientdetails1";

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
  const [errors, setErrors] = useState({
    patient_name: "",
    mobile_number: "",
    dob: "",
    email: "",
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

  const generatePatientID = (patients) => {
    if (patients.length === 0) {
      // If there are no existing patients, start with the first ID
      return "PAT001";
    } else {
      // Extract the numeric part of the last patient ID
      const lastIDNumeric = parseInt(
        patients[patients.length - 1].patient_id.substr(3),
        10
      );
      // Increment the numeric part by 1
      const nextIDNumeric = lastIDNumeric + 1;
      // Pad the numeric part with zeros to maintain the format "PAT001"
      const nextID = "PAT" + nextIDNumeric.toString().padStart(3, "0");
      return nextID;
    }
  };

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

    // Validate input values
    switch (name) {
      case "patient_name":
        if (value.length < 3 || value.length > 50) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "Patient name should be between 3 and 50 characters",
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
          }));
        }
        break;
      case "mobile_number":
        if (!/^\d{10}$/.test(value)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "Mobile number must have 10 digits",
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
          }));
        }
        break;
      case "dob":
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
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
          }));
        }
        break;
      case "email":
        if (
          value.length < 10 ||
          value.length > 60 ||
          !/\S+@\S+\.\S+/.test(value)
        ) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "Please enter a valid email address (10-60 characters)",
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
          }));
        }
        break;
      case "address":
        if (value.length < 10 || value.length > 250) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "Address should be between 10 and 250 characters",
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
          }));
        }
        break;
      default:
        break;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Generate the patient ID
    const newPatientID = generatePatientID(patients);
    // Update the form data with the generated patient ID
    setFormData({
      ...formData,
      patient_id: newPatientID,
    });
    // Check if there are any errors before submitting the form
    const formValid = Object.values(errors).every((error) => error === "");
    if (formValid) {
      try {
        const dobDateOnly = formData.dob.split("T")[0];
        const createdBy = localStorage.getItem("userId");
        const franchiseName = localStorage.getItem("franchisename");
        const franchiseID = localStorage.getItem("franchiseID");

        const response = await axios.post("http://localhost:5001/api/patient", {
          ...formData,
          createdBy: createdBy,
          franchiseName: franchiseName,
          franchiseID: franchiseID,
          dob: dobDateOnly, // Extract only the date part
        });

        console.log(response.data); // Assuming response.data contains the newly created patient data
        // Reset form data after successful submission
        setFormData({
          patient_id: "",
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
        alert("patient added successfully!");
      } catch (error) {
        console.error("Failed to submit data", error);
      }
    } else {
      alert("Form has errors. Please fix them before submitting.");
    }
  };

  // ------------------------

  const [patients, setPatients] = useState([]);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const frid = localStorage.getItem("franchiseID");

      if (frid) {
        const response = await axios.get(
          `http://localhost:5001/api/patients${frid}`
        );
        setPatients(response.data);
      } else {
        console.error("FranchiseID not found in localStorage");
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  // Initialize form data including the patient ID
  useEffect(() => {
    const newPatientID = generatePatientID(patients);
    setFormData({
      ...formData,
      patient_id: newPatientID,
    });
  }, [patients]);

  return (
    <div className="addpa-total">
      {/* <div>
        <ReceptionSidebar />
      </div> */}

      <div className="addp-right">
        {/* <h1 className="h1-head">Patient Form</h1> */}
        <div className="input-container">
          <form action="" onSubmit={handleSubmit}>
            <div className="column-wrapper">
              <div className="column">
                <div className="input-wrapper">
                  <label htmlFor="patient_id">Patient ID:<span className="mandatory">*</span></label>
                  <input
                    id="patient_id"
                    type="text"
                    name="patient_id"
                    value={formData.patient_id}
                    readOnly
                    required
                  />
                </div>

                {/* <div className="input-wrapper">
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
              </div> */}
                <div className="input-wrapper">
                  <label htmlFor="patient_name">Patient Name:<span className="mandatory">*</span></label>
                  <input
                    id="patient_name"
                    type="text"
                    name="patient_name"
                    value={formData.patient_name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                {errors.patient_name && (
                  <span className="error">{errors.patient_name}</span>
                )}
                <div className="input-wrapper">
                  <label htmlFor="dob">Date of Birth:<span className="mandatory">*</span></label>
                  <input
                    id="dob"
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                {errors.dob && <span className="error">{errors.dob}</span>}
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
                {errors.email && <span className="error">{errors.email}</span>}
                <div className="input-wrapper">
                  <label htmlFor="mobile_number">Mobile Number:<span className="mandatory">*</span></label>
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
                {errors.mobile_number && (
                  <span className="error">{errors.mobile_number}</span>
                )}
              </div>

              <div className="column">
                <div className="input-wrapper">
                  <label htmlFor="genderSelect">Gender:<span className="mandatory">*</span></label>
                  <select
                    id="genderSelect"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">select the gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Others">Others</option>
                  </select>
                </div>
                <div className="input-wrapper">
                  <label htmlFor="stateInput">State:<span className="mandatory">*</span></label>
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
                          onClick={() => handleStateSelection(state.name)}
                        >
                          {state.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="input-wrapper">
                  <label htmlFor="cityInput">City:<span className="mandatory">*</span></label>
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
                          onClick={() => handleCitySelection(city.name)}
                        >
                          {city.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="input-wrapper">
                  <label htmlFor="areaInput">Area:<span className="mandatory">*</span></label>
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
                          onClick={() => handleAreaSelection(area.name)}
                        >
                          {area.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="input-wrapper">
                  <label htmlFor="address">Address:<span className="mandatory">*</span> </label>
                  <textarea
                    id="address"
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                {errors.address && (
                  <span className="error">{errors.address}</span>
                )}
              </div>
            </div>
            <div>
              <button className="patsubmit-btn" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* <div className="patientdetail-fetch">
          <h2>Patients</h2>
          <table>
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Date of Birth</th>
                <th>Email</th>
                <th>Mobile Number</th>
                <th>State</th>
                <th>City</th>
                <th>Area</th>
                <th>Address</th>
                <th>Created By</th>
  
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient._id}>
                  <td>{patient.patient_id}</td>
                  <td>{patient.patient_name}</td>
                  <td>{patient.gender}</td>
                  <td>{patient.dob}</td>
                  <td>{patient.email}</td>
                  <td>{patient.mobile_number}</td>
                  <td>{patient.state}</td>
                  <td>{patient.city}</td>
                  <td>{patient.area}</td>
                  <td>{patient.address}</td>
                  <td>{patient.createdBy}</td>
    
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}
      </div>
    </div>
  );
};

export default PatientForm;
