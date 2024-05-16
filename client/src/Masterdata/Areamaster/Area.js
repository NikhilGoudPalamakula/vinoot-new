

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Area.css";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Import the default styles for React Toastify
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
      // console.error("Failed to fetch areas", error);
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
      // console.error("Failed to fetch cities", error);
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

  // const validateAreaName = (value) => {
  //   if (value.length < 3 || value.length > 60) {
  //     setAreaError("Area name must be between 3 and 60 characters.");
  //   } else {
  //     setAreaError("");
  //   }
  // };

  const validateAreaName = (value) => {
    // Regular expression to match at least 3 alphabetic characters
    const alphaRegex = /[a-zA-Z]/g;
    const alphaCount = (value.match(alphaRegex) || []).length;
    
    if (alphaCount < 3) {
      setAreaError("Area name must contain at least 3 alphabetical characters.");
    } else if (value.length < 3 || value.length > 60) {
      setAreaError("Area name must be between 3 and 60 characters.");
    } else {
      setAreaError("");
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cityError || areaError) {
      toast.error("Please fix the errors before submitting", {
        position: "top-right",
        autoClose: 1500,
      });
      return;
    }
    if (!areaName.trim()) {
      toast.error("Please enter the area name.", {
        position: "top-right",
        autoClose: 1500,
      });
      return;
    }
    try {
      const selectedCity = cities.find((city) => city.name === cityName);
      if (!selectedCity) {
        toast.error("Please select a City", {
          position: "top-right",
          autoClose: 1500,
        });
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
        // console.log("Area added successfully");
        toast.success("Area added successfully", {
          position: "top-right",
          autoClose: 1500,
        });
        return;
        // navigate("/");
      } else {
        toast.error("Failed to add area", {
          position: "top-right",
          autoClose: 1500,
        });
        return;
      }
    } catch (error) {
      // console.error("Failed to add area", error);
      if (error.response && error.response.status === 400) {
        toast.error("area already exists in this city", {
          position: "top-right",
          autoClose: 1500,
        });
        return;
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
        // console.error("Failed to toggle area status");
      }
    } catch (error) {
      // console.error("Failed to toggle area status:", error);
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
      <ToastContainer />
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
            {areaError && <div  style={{ color: "red" }} className="error-message">{areaError}</div>}
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
                  <th>State Name</th>
                  <th>City Name</th>
                  <th>Area Name</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentPlans.map((area) => (
                  <tr key={area._id}>
                    <td>{area.StateName}</td>
                    <td>{area.CityName}</td>
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
