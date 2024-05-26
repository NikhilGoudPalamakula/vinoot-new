import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Addpatient.css";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import the default styles for React Toastify
import { VINOOTNEW } from "../../../../src/Helper/Helper";
// import ReceptionSidebar from "../ReceptionSidebar/ReceptionSidebar";
// import Patientdetails1 from "./Patientdetails1";

const PatientForm = () => {
  const [states,setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [area, setArea] = useState("");
  const [stateInput, setStateInput] = useState("");
  const [city, setCity] = useState("");
  const [focusedInput, setFocusedInput] = useState(null);
  // Add state variables to track input field states
  const [cityDisabled, setCityDisabled] = useState(true);
  const [areaDisabled, setAreaDisabled] = useState(true);
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
  const presentTime = new Date().toLocaleString();

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
        setFilteredStates(activeStates);
      } catch (error) {
        console.error("Failed to fetch states", error);
      }
    };
    fetchStates();
  }, [stateInput,setStates]); // Add stateInput to dependency array

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
  // Update useEffect hook to filter cities based on state input and city name
  useEffect(() => {
    if (stateInput.trim() === "") {
      setFilteredCities([]); // Clear city suggestions if state input is empty
      setFilteredAreas([]); // Clear area suggestions if state input is empty
    } else {
      const filteredCities = cities.filter(
        (cit) =>
          cit.state_id === formData.state.state_id &&
          cit.name.toLowerCase().includes(city.toLowerCase())
      );
      setFilteredCities(filteredCities);
    }
  }, [stateInput, cities, formData.state, city]); // Add city to dependency array

  // Update useEffect hook to filter areas based on area name
  useEffect(() => {
    const filteredAreas = areas.filter(
      (are) =>
        are.state_id === formData.state.state_id &&
        are.name.toLowerCase().includes(area.toLowerCase())
    );
    setFilteredAreas(filteredAreas);
  }, [area, areas, formData.state]); // Add area to dependency array

  const handleStateSelection = (selectedStateId, selectedStateName) => {
    setStateInput(selectedStateName);
    setFormData({
      ...formData,
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
    setFormData({
      ...formData,
      city: selectedCity,
    });
    setFocusedInput(null);
    setAreaDisabled(false); // Enable area input when city is selected
  };

  const handleAreaSelection = (selectedArea) => {
    setArea(selectedArea);
    setFormData({
      ...formData,
      area: selectedArea,
    });
    setFocusedInput(null);
  };
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
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validate input values
    switch (name) {
      case "patient_name":
        if (value.trim() === "") {
          // Clear the error message when the input field is empty
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
          }));
        } else if (value.length < 3) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "Patient name should consists of a minimum of 3 characters",
          }));
        } else if (value.length > 50) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "Patient name should consists only 50 characters",
          }));
        } else if (!/^[\w\d\s\S]*[a-zA-Z]{3,}[\w\d\s\S]*$/.test(value)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]:
              "Patient name should contain at least 3 alphabetic character",
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
          }));
        }
        break;

      case "mobile_number":
        if (value.trim() === "") {
          setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
        } else {
          const numericValue = value.replace(/\D/g, ""); // Remove non-numeric characters
          setFormData({ ...formData, [name]: numericValue });

          const mobileRegex = /^[6-9]\d{0,9}$/; // Starts with 6 and allows up to 10 digits
          if (!mobileRegex.test(value)) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              [name]:
                "Mobile number must start with 6 to 9 and contain up to 10 digits.",
            }));
          } else if (value.length < 10) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              [name]: "Mobile number must contain 10 digits.",
            }));
          } else {
            setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
          }
        }

        break;
      case "dob":
        // const dobDateOnly = value.split("T")[0];
        if (value.trim() === "") {
          // Clear the error message when the input field is empty
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
          }));
        } else {
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
        }
        break;

      case "email":
        if (value.trim() === "") {
          // Clear the error message when the input field is empty
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
          }));
        } else if (
          value.length < 10 ||
          value.length > 60 ||
          !/\S+@\S+\.\S+/.test(value)
        ) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "email address consists of (10-60 characters)",
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
          }));
        }
        break;

      case "address":
        if (value.trim() === "") {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
          }));
        } else if (value.length < 10 || value.length > 250) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "Address must be between 10 and 250 characters",
          }));
        } else if (!/[a-zA-Z]{5,}/.test(value)) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "Address must contain at least 5 alphabetic characters",
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
    // Check if state, city, and area are selected
    if (!formData.state) {
      toast.error("Please select state from suggestions", {
        position: "top-right",
        autoClose: 1500,
      });
      return;
    } else if (!formData.city) {
      toast.error("Please select city from suggestions", {
        position: "top-right",
        autoClose: 1500,
      });
      return;
    } else if (!formData.area) {
      toast.error("Please select area from suggestions", {
        position: "top-right",
        autoClose: 1500,
      });
      return;
    }
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
        // const dobDateOnly = formData.dob.split("T")[0];

        const createdBy = localStorage.getItem("userId");
        const franchiseName = localStorage.getItem("franchisename");
        const franchiseID = localStorage.getItem("franchiseID");

        await axios.post(`${VINOOTNEW}/api/patient`, {
          ...formData,
          createdBy: createdBy,
          createdAt: presentTime,
          franchiseName: franchiseName,
          franchiseID: franchiseID,
          modifiedAt: presentTime,
          modifiedBy: createdBy,
          state: formData.state.name,
          // dob: dobDateOnly, // Extract only the date part
        });

        // console.log(response.data); // Assuming response.data contains the newly created patient data
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
        fetchPatients(); //
        toast.success("Patient Added successfully", {
          position: "top-right",
          autoClose: 1500,
        });
      } catch (error) {
        console.error("Failed to submit data", error);
      }
    } else {
      toast.error("Please fix the errors before submitting", {
        position: "top-right",
        autoClose: 1500,
      });
      return;
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
        const response = await axios.get(`${VINOOTNEW}/api/patients${frid}`);
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
  }, [patients,formData]);

  return (
    <div className="addpa-total">
      <ToastContainer />
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
                  <label htmlFor="patient_id">
                    Patient ID:<span className="mandatory">*</span>
                  </label>
                  <input
                    id="patient_id"
                    type="text"
                    name="patient_id"
                    value={formData.patient_id}
                    readOnly
                    required
                  />
                </div>

                <div className="input-wrapper">
                  <label htmlFor="patient_name">
                    Patient Name:<span className="mandatory">*</span>
                  </label>
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
                  <label htmlFor="dob">
                    Date of Birth:<span className="mandatory">*</span>
                  </label>
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
                  <label htmlFor="mobile_number">
                    Mobile Number:<span className="mandatory">*</span>
                  </label>
                  <input
                    id="mobile_number"
                    type="text"
                    placeholder="888 888 8888"
                    pattern="\d{10}"
                    maxLength="10"
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
                  <label htmlFor="genderSelect">
                    Gender:<span className="mandatory">*</span>
                  </label>
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
                  <label htmlFor="stateInput">
                    State:<span className="mandatory">*</span>
                  </label>
                  <input
                    id="stateInput"
                    type="text"
                    value={stateInput}
                    onChange={handleStateChange}
                    onFocus={() => setFocusedInput("state")}
                    required
                  />
                  {focusedInput === "state" && (
                    <ul
                      className="suggestion-list"
                      style={{
                        height: "150px",
                        width: "100%",
                        overflowY: "auto",
                      }}>
                      {filteredStates.map((state) => (
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
                </div>
                <div className="input-wrapper">
                  <label htmlFor="cityInput">
                    City:<span className="mandatory">*</span>
                  </label>
                  <input
                    id="cityInput"
                    type="text"
                    value={city}
                    onChange={handleCityChange}
                    onFocus={() => setFocusedInput("city")}
                    disabled={cityDisabled} // Disable city input initially
                    required
                  />
                  {focusedInput === "city" && (
                    <ul
                      className="suggestion-list"
                      style={{
                        height: "150px",
                        width: "100%",
                        overflowY: "auto",
                      }}>
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
                  <label htmlFor="areaInput">
                    Area:<span className="mandatory">*</span>
                  </label>
                  <input
                    id="areaInput"
                    type="text"
                    value={area}
                    onChange={handleAreaChange}
                    onFocus={() => setFocusedInput("area")}
                    disabled={areaDisabled} // Disable area input initially
                    required
                  />
                  {focusedInput === "area" && (
                    <ul
                      className="suggestion-list"
                      style={{
                        height: "150px",
                        width: "100%",
                        overflowY: "auto",
                      }}>
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
                  <label htmlFor="address">
                    Address:<span className="mandatory">*</span>{" "}
                  </label>
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
