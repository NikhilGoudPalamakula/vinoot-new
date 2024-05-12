// import React, { useState, useEffect } from "react";
// import axios from "axios"; // Import Axios
// import './Area.css';
// import Cities from "../Citymaster/City";
// import { useNavigate } from "react-router-dom";
// import { VINOOTNEW } from "../../Helper/Helper";
// import Sidebar from "../Sidebar/Sidebar";

// const Area = () => {
//   const [CityName, setCityName] = useState("");
//   const [cityId, setCityId] = useState("");
//   const [areaName, setAreaName] = useState("");
//   const [cities, setCities] = useState([]);
//   const [areas, setAreas] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchCities();
//     fetchAreas();
//   }, []);

//   const fetchAreas = async () => {
//     try {
//       setIsLoading(true);
//       const response = await axios.get(`${VINOOTNEW}/api/areas`);
//       setAreas(response.data);
//     } catch (error) {
//       console.error("Failed to fetch areas", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fetchCities = async () => {
//     try {
//       const response = await axios.get(`${VINOOTNEW}/api/cities`);
//       setCities(response.data);
//     } catch (error) {
//       console.error("Failed to fetch cities", error);
//     }
//   };

//   const handleStateChange = (e) => {
//     const selectedState = cities.find((city) => city.name === e.target.value);
//     if (selectedState) {
//       setCityName(selectedState.name);
//       setCityId(selectedState._id);
//       setCityId(selectedState.city_id);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const selectedCity = cities.find((city) => city.name === CityName);
//       if (!selectedCity) {
//         console.error("Selected state not found");
//         return;
//       }
//       // Generate unique ID
//       const existingAreas = await axios.get(`${VINOOTNEW}/api/areas`);
//       const count = existingAreas.data.length;
//       const area_id = generateUniqueId(areaName, count + 0);

//       const response = await axios.post(`${VINOOTNEW}/api/areas`, {
//         cityId: selectedCity._id,
//         areaName: areaName,
//         city_id: selectedCity.city_id,
//         area_id: area_id,
//       });

//       if (response.status === 201) {
//         console.log("Area added successfully");
//         alert("Area added successfully");
//         navigate("/");
//       } else {
//         console.error("Failed to add area");
//       }
//     } catch (error) {
//       console.error("Failed to add area", error);
//       if (error.response && error.response.status === 400) {
//         alert("Area already exists in this city");
//       }
//     }
//   };

//   const toggleStatus = async (areaId, currentStatus) => {
//     try {
//       const newStatus = currentStatus === "active" ? "inactive" : "active";

//       const response = await axios.post(
//         `${VINOOTNEW}/api/areas/${areaId}/toggle`,
//         {
//           status: newStatus,
//         }
//       );

//       if (response.status === 200) {
//         console.log("Area status updated successfully");
//         fetchAreas();
//       } else {
//         console.error("Failed to toggle area status");
//       }
//     } catch (error) {
//       console.error("Failed to toggle area status", error);
//       alert("Failed to toggle area status");
//     }
//   };

//   const generateUniqueId = (name, count) => {
//     const abbreviation = name.substring(0, 3).toUpperCase();
//     const paddedCount = (count + 1).toString().padStart(3, "0");
//     const id = abbreviation + paddedCount;
//     return id;
//   };

//   return (
//     <div className="area-total">
//       <div><Sidebar /></div>
//       <div className="area-right" >
//       <h1 >Area Master</h1>

//         <form className="area-form" onSubmit={handleSubmit}>
//           <div>
//             <label>
//               Select City:
//               <select value={CityName} onChange={handleStateChange}>
//                 <option value="">Select a city</option>
//                 {cities.map((city) => (
//                   <option key={city._id} value={city.name}>
//                     {city.name}
//                   </option>
//                 ))}
//               </select>
//             </label>
//           </div>
//           <div>
//             <label>
//               Area Name:
//               <input
//                 type="text"
//                 value={areaName}
//                 onChange={(e) => setAreaName(e.target.value)}
//               />
//             </label>
//           </div>
//           <button type="submit">Submit</button>
//         </form>

//       <h2 className="area_list_heading">Areas List</h2>

//         <div>
//           {isLoading ? (
//             <p>Loading cities...</p>
//           ) : (
//               <table className="area-table">
//                 <thead>
//                   <tr>
//                     <th>Area Name</th>
//                     <th>Status</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {areas.map((area) => (
//                     <tr key={area._id}>
//                       <td>{area.name}</td>
//                       <td>{area.status}</td>
//                       <td>
//                         <button onClick={() => toggleStatus(area._id, area.status)}>
//                           {area.status === "active" ? "Inactive" : "Active"}
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Area;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Area.css";
// import { useNavigate } from "react-router-dom";
import { VINOOTNEW } from "../../Helper/Helper";
import Sidebar from "../Sidebar/Sidebar";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

const Area = () => {
  const [cityName, setCityName] = useState("");
  const [cityId, setCityId] = useState("");
  const [areaName, setAreaName] = useState("");
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cityError, setCityError] = useState("");
  const [areaError, setAreaError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const presentTime = new Date().toLocaleString();

  // const navigate = useNavigate();
  // Get user ID from local storage
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchCities();
    fetchAreas();
  }, []);

  const fetchAreas = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${VINOOTNEW}/api/areas`);
      setAreas(response.data);
    } catch (error) {
      console.error("Failed to fetch areas", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await axios.get(`${VINOOTNEW}/api/cities`);

      const activeCities = response.data.filter(
        (city) => city.status === "active"
      );
      setCities(activeCities);
      // setCities(response.data);
    } catch (error) {
      console.error("Failed to fetch cities", error);
    }
  };

  const handleCityChange = (e) => {
    const selectedCity = cities.find((city) => city.name === e.target.value);
    if (selectedCity) {
      setCityName(selectedCity.name);
      setCityId(selectedCity._id);
    }
    validateCityName(e.target.value);
  };

  const handleAreaChange = (e) => {
    setAreaName(e.target.value);
    validateAreaName(e.target.value);
  };

  const validateCityName = (value) => {
    if (value.length < 4 || value.length > 100) {
      setCityError("City name must be between 4 and 100 characters.");
    } else {
      setCityError("");
    }
  };

  const validateAreaName = (value) => {
    if (value.length < 3 || value.length > 60) {
      setAreaError("Area name must be between 3 and 60 characters.");
    } else {
      setAreaError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cityError || areaError) {
      alert("Please fix the errors before submitting.");
      return;
    }
    try {
      const selectedCity = cities.find((city) => city.name === cityName);
      if (!selectedCity) {
        console.error("Selected city not found");
        return;
      }
      const existingAreas = await axios.get(`${VINOOTNEW}/api/areas`);
      const count = existingAreas.data.length;
      const area_id = generateUniqueId(areaName, count + 0);

      const response = await axios.post(`${VINOOTNEW}/api/areas`, {
        cityId: selectedCity._id,
        areaName: areaName,
        city_id: selectedCity.city_id,
        area_id: area_id,
        createdBy: userId, // Set createdBy field
        createdAt: presentTime, // Set createdAt field
        modifiedBy: userId, // Set modifiedBy field
        modifiedAt: presentTime, // Set modifiedAt field
      });

      if (response.status === 201) {
        console.log("Area added successfully");
        alert("Area added successfully");
        // navigate("/");
      } else {
        console.error("Failed to add area");
      }
    } catch (error) {
      console.error("Failed to add area", error);
      if (error.response && error.response.status === 400) {
        alert("Area already exists in this city");
      }
    }
  };

  const toggleStatus = async (areaId, currentStatus) => {
    try {
      const updatedStatus = currentStatus === "active" ? "inactive" : "active";
      const response = await axios.put(
        `${VINOOTNEW}/api/areas/${areaId}/toggle`,
        {
          status: updatedStatus,
          modifiedBy: userId,
          modifiedAt: presentTime,
        }
      );

      if (response.status === 200) {
        // Find the index of the area that was toggled
        const areaIndex = areas.findIndex((area) => area._id === areaId);

        // Create a new array with the updated status
        const updatedAreas = [...areas];
        updatedAreas[areaIndex].status = updatedStatus;

        // Update the state with the new array
        setAreas(updatedAreas);
      } else {
        console.error("Failed to toggle area status");
      }
    } catch (error) {
      console.error("Failed to toggle area status:", error);
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
  const currentPlans = areas.slice(indexOfFirstPlan, indexOfLastPlan);

  // Calculate total pages
  const totalPages = Math.ceil(areas.length / itemsPerPage);

  return (
    <div className="area-total">
      <div>
        <Sidebar />
      </div>
      <div className="area-right">
        <h1>Area Master</h1>
        <form className="area-form" onSubmit={handleSubmit}>
          <div>
            <label>
              Select City: <span style={{ color: "red" }}>*</span>
              <select value={cityName} onChange={handleCityChange}>
                <option value="">Select a city</option>
                {cities.map((city) => (
                  <option key={city._id} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>
            </label>
            {cityError && <div className="error-message">{cityError}</div>}
          </div>
          <div>
            <label>
              Area Name: <span style={{ color: "red" }}>*</span>
              <input type="text" value={areaName} onChange={handleAreaChange} />
            </label>
            {areaError && <div className="error-message">{areaError}</div>}
          </div>
          <button type="submit">Submit</button>
        </form>

        <h2 className="area_list_heading">Areas List</h2>
        <div>
          {isLoading ? (
            <p>Loading areas...</p>
          ) : (
            <table className="area-table">
              <thead>
                <tr>
                  <th>Area Name</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentPlans.map((area) => (
                  <tr key={area._id}>
                    <td>{area.name}</td>
                    <td>{area.status}</td>
                    <td>
                      <button
                        onClick={() => toggleStatus(area._id, area.status)}>
                        {area.status === "active" ? "inactive" : "active"}
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

export default Area;
