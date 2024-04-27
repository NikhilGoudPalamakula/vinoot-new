import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import Cities from "../Citymaster/City";
import { useNavigate } from "react-router-dom";

const Area = () => {
  const [CityName, setCityName] = useState("");
  const [cityId, setCityId] = useState("");
  const [areaName, setAreaName] = useState("");
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch states data when component mounts
    const fetchCities = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/cities");
        setCities(response.data);
      } catch (error) {
        console.error("Failed to fetch cities", error);
      }
    };
    fetchCities();
  }, []);

  const handleStateChange = (e) => {
    const selectedState = cities.find((city) => city.name === e.target.value);
    if (selectedState) {
      setCityName(selectedState.name);
      setCityId(selectedState._id);
      setCityId(selectedState.city_id);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const selectedCity = cities.find((city) => city.name === CityName);
      const existingAreas = await axios.get("http://localhost:5000/api/areas");
      const count = existingAreas.data.length;
      // Generate unique ID
      const area_id = generateUniqueId(areaName, count + 0);
      const response = await axios.post("http://localhost:5000/api/area", {
        cityId: selectedCity._id,
        areaName: areaName,
        city_id: selectedCity.city_id, // Include city_id in the request body
        area_id: area_id,
      });

      if (response.status === 201) {
        console.log("City added successfully");
        alert("area added successfully");
        navigate("/home");
      } else {
        console.error("Failed to add city");
      }
    } catch (error) {
      console.error("Failed to add city", error);
      if (error.response && error.response.status === 400) {
        // If the state already exists, show an alert to the user
        alert("Area already exists in this city");
      }
    }
  };
  const generateUniqueId = (name, count) => {
    const abbreviation = name.substring(0, 3).toUpperCase(); // Get first three letters and convert to uppercase
    const paddedCount = (count + 1).toString().padStart(3, "0"); // Increment count and pad with zeros
    const id = abbreviation + paddedCount; // Generate unique ID
    return id;
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Select City:
            <select value={CityName} onChange={handleStateChange}>
              <option value="">Select a city</option>
              {cities.map((city) => (
                <option key={city._id} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            Area Name:
            <input
              type="text"
              value={areaName}
              onChange={(e) => setAreaName(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Area;
