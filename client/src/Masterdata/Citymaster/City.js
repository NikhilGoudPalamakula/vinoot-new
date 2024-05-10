// import React, { useState, useEffect } from "react";
// import './City.css';
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { VINOOTNEW } from "../../Helper/Helper";
// import Sidebar from "../Sidebar/Sidebar";

// const Cities = () => {
//   const [stateName, setStateName] = useState("");
//   const [cityName, setCityName] = useState("");
//   const [states, setStates] = useState([]);
//   const [cities, setCities] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchCities();
//     fetchStates();
//   }, []);

//   const fetchCities = async () => {
//     try {
//       setIsLoading(true);
//       const response = await axios.get(`${VINOOTNEW}/api/cities`);
//       setCities(response.data);
//     } catch (error) {
//       console.error("Failed to fetch cities", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   const fetchStates = async () => {
//     try {
//       const response = await axios.get(`${VINOOTNEW}/api/states`);
//       setStates(response.data);
//     } catch (error) {
//       console.error("Failed to fetch states", error);
//     }
//   };

//   const handleStateChange = (e) => {
//     const selectedState = states.find((state) => state.name === e.target.value);
//     if (selectedState) {
//       setStateName(selectedState.name);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const selectedState = states.find((state) => state.name === stateName);
//       if (!selectedState) {
//         console.error("Selected state not found");
//         return;
//       }

//       const existingStates = await axios.get(`${VINOOTNEW}/api/cities`);
//       const count = existingStates.data.length;
//       const city_id = generateUniqueId(cityName, count + 0);

//       const response = await axios.post(`${VINOOTNEW}/api/cities`, {
//         stateId: selectedState._id,
//         cityName: cityName,
//         city_id: city_id,
//       });
//       if (response.status === 201) {
//         console.log("City added successfully");
//         alert("City added successfully");
//         navigate("/Area");
//       } else {
//         console.error("Failed to add city");
//       }
//     } catch (error) {
//       console.error("Failed to add city", error);
//       if (error.response && error.response.status === 400) {
//         alert("City already exists in this state");
//       }
//     }
//   };

//   const toggleCityStatus = async (cityId, currentState) => {
//     try {
//       const updatedStatus = currentState === "active" ? "inactive" : "active";
//       const response = await axios.post(
//         `${VINOOTNEW}/api/cities/${cityId}/toggle`,
//         {
//           status: updatedStatus,
//         }
//       );
//       if (response.status === 200) {
//         console.log("City status updated successfully");
//         fetchCities();
//       } else {
//         console.error("Failed to toggle city status");
//       }
//     } catch (error) {
//       console.error("Failed to toggle city status", error);
//       alert("Failed to toggle city status");
//     }
//   };

//   const generateUniqueId = (name, count) => {
//     const abbreviation = name.substring(0, 3).toUpperCase();
//     const paddedCount = (count + 1).toString().padStart(3, "0");
//     const id = abbreviation + paddedCount;
//     return id;
//   };

//   return (
//     <div className="city-total" >
//       <div><Sidebar/></div>
//       <div className="city-right" >
//       <h1 >City Master</h1>
//         <form className="city-form" onSubmit={handleSubmit}>
//           <div>
//             <label>
//               Select State:
//               <select value={stateName} onChange={handleStateChange}>
//                 <option value="">Select a state</option>
//                 {states.map((state) => (
//                   <option key={state._id} value={state.name}>
//                     {state.name}
//                   </option>
//                 ))}
//               </select>
//             </label>
//           </div>
//           <div>
//             <label>
//               City Name:
//               <input
//                 type="text"
//                 value={cityName}
//                 onChange={(e) => setCityName(e.target.value)}
//               />
//             </label>
//           </div>
//           <button type="submit">Submit</button>
//         </form>

//       <h2 className="cities_list_heading">Cities List</h2>

//         <div>
//           {isLoading ? (
//             <p>Loading cities...</p>
//           ) : (
//             <table className="cities-table">
//               <thead>
//                 <tr>
//                   <th>City</th>
//                   <th>Status</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {cities.map((city) => (
//                   <tr key={city._id}>
//                     <td>{city.name}</td>
//                     <td>{city.status}</td>
//                     <td>
//                       <button
//                         onClick={() => toggleCityStatus(city._id, city.status)}
//                       >
//                         {city.status === "active" ? "Inactive" : "Active"}
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cities;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import the default styles for React Toastify
import { useNavigate } from "react-router-dom";
import { VINOOTNEW } from "../../Helper/Helper";
import Sidebar from "../Sidebar/Sidebar";
import "./City.css";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
const Cities = () => {
  const navigate = useNavigate();

  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  // Get user ID from local storage
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchCities();
    fetchStates();
  }, []);

  const fetchCities = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${VINOOTNEW}/api/cities`);
      setCities(response.data);
    } catch (error) {
      console.error("Failed to fetch cities", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchStates = async () => {
    try {
      const response = await axios.get(`${VINOOTNEW}/api/states`);
      // setStates(response.data);

      const activeStates = response.data.filter(
        (state) => state.status === "active"
      );
      setStates(activeStates);
    } catch (error) {
      console.error("Failed to fetch states", error);
    }
  };

  const handleStateChange = (e) => {
    const selectedState = states.find((state) => state.name === e.target.value);
    if (selectedState) {
      setStateName(selectedState.name);
    }
  };

  const handleCityChange = (e) => {
    const inputValue = e.target.value;
    setCityName(inputValue);
    if (inputValue.length < 3 || inputValue.length > 60) {
      setError("City name must be between 3 and 60 characters.");
    } else {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error) {
      toast.error("Please fix the errors before submitting", {
        position: "top-right",
        autoClose: 1500,
      });
      return;
    }

    try {
      const selectedState = states.find((state) => state.name === stateName);
      // if (!selectedState) {
      //   console.error("Selected state not found");
      //   return;
      // }

      if (!stateName) {
        toast.error("Please select a state", {
          position: "top-right",
          autoClose: 1500,
        });
        return;
      }
      if (!cityName) {
        toast.error("Please enter a city name", {
          position: "top-right",
          autoClose: 1500,
        });
        return;
      }

      const existingStates = await axios.get(`${VINOOTNEW}/api/cities`);
      const count = existingStates.data.length;
      const city_id = generateUniqueId(cityName, count + 0);

      const response = await axios.post(`${VINOOTNEW}/api/cities`, {
        stateId: selectedState._id,
        cityName: cityName,
        city_id: city_id,
        createdBy: userId, // Set createdBy field
        createdAt: new Date(), // Set createdAt field
        modifiedBy: userId, // Set modifiedBy field
        modifiedAt: new Date(), // Set modifiedAt field
      });
      if (response.status === 201) {
        console.log("City added successfully");
        toast.success("City added successfully", {
          position: "top-right",
          autoClose: 1500,
          onClose: () => {
            navigate("/Area");
          },
        });
        return;
      } else {
        console.error("Failed to add city");
      }
    } catch (error) {
      console.error("Failed to add city", error);
      if (error.response && error.response.status === 400) {
        toast.error("City already exists in this state", {
          position: "top-right",
          autoClose: 1500,
        });
      }
    }
  };

  const toggleCityStatus = async (cityId, currentStatus) => {
    try {
      const updatedStatus = currentStatus === "active" ? "inactive" : "active";
      const response = await axios.put(
        `${VINOOTNEW}/api/cities/${cityId}/toggle`,
        {
          status: updatedStatus,
          modifiedBy: userId,
          modifiedAt: new Date(),
        }
      );

      if (response.status === 200) {
        // Find the index of the area that was toggled
        const cityIndex = cities.findIndex((city) => city._id === cityId);

        // Create a new array with the updated status
        const updatedCities = [...cities];
        updatedCities[cityIndex].status = updatedStatus;

        // Update the state with the new array
        setCities(updatedCities);
      } else {
        console.error("Failed to toggle city status");
      }
    } catch (error) {
      console.error("Failed to toggle city status:", error);
    }
  };

  const generateUniqueId = (name, count) => {
    const abbreviation = name.substring(0, 3).toUpperCase();
    const paddedCount = (count + 1).toString().padStart(3, "0");
    const id = abbreviation + paddedCount;
    return id;
  };

  // Pagination handlers
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Get current plans
  const indexOfLastPlan = currentPage * itemsPerPage;
  const indexOfFirstPlan = indexOfLastPlan - itemsPerPage;
  const currentPlans = cities.slice(indexOfFirstPlan, indexOfLastPlan);

  // Calculate total pages
  const totalPages = Math.ceil(cities.length / itemsPerPage);
  return (
    <div className="city-total">
      <div>
        <Sidebar />
      </div>
      <div className="city-right">
        <h1>City Master</h1>
        <form className="city-form" onSubmit={handleSubmit}>
          <div>
            <label>
              Select State: <span style={{ color: "red" }}>*</span>
              <select value={stateName} onChange={handleStateChange}>
                <option value="">Select a state</option>
                {states.map((state) => (
                  <option key={state._id} value={state.name}>
                    {state.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label>
              City Name: <span style={{ color: "red" }}>*</span>
              <input type="text" value={cityName} onChange={handleCityChange} />
            </label>
          </div>
          {error && <div style={{ color: "red" }}>{error}</div>}
          <button type="submit">Submit</button>
        </form>

        <h2 className="cities_list_heading">Cities List</h2>

        <div>
          {isLoading ? (
            <p>Loading cities...</p>
          ) : (
            <table className="cities-table">
              <thead>
                <tr>
                  <th>City</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentPlans.map((city) => (
                  <tr key={city._id}>
                    <td>{city.name}</td>
                    <td>{city.status}</td>
                    <td>
                      <button
                        onClick={() => toggleCityStatus(city._id, city.status)}>
                        {city.status === "active" ? "Inactive" : "Active"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="paginationss">
            <span onClick={() => handlePageChange(1)}>
              <KeyboardDoubleArrowLeftIcon />
            </span>
            <span onClick={() => handlePageChange(currentPage - 1)}>
              <KeyboardArrowLeftIcon />
            </span>
            {[...Array(totalPages)].map((_, index) => (
              <span
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? "pageactive-page" : ""}>
                {index + 1}
              </span>
            ))}
            <span onClick={() => handlePageChange(currentPage + 1)}>
              <KeyboardArrowRightIcon />
            </span>
            <span onClick={() => handlePageChange(totalPages)}>
              <KeyboardDoubleArrowRightIcon />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cities;
