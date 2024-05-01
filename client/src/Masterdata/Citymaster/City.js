
import React, { useState, useEffect } from "react";
import './City.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { VINOOTNEW } from "../../Helper/Helper";
import Sidebar from "../Sidebar/Sidebar";

const Cities = () => {
  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
      setStates(response.data);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const selectedState = states.find((state) => state.name === stateName);
      if (!selectedState) {
        console.error("Selected state not found");
        return;
      }

      const existingStates = await axios.get(`${VINOOTNEW}/api/cities`);
      const count = existingStates.data.length;
      const city_id = generateUniqueId(cityName, count + 0);

      const response = await axios.post(`${VINOOTNEW}/api/cities`, {
        stateId: selectedState._id,
        cityName: cityName,
        city_id: city_id,
      });
      if (response.status === 201) {
        console.log("City added successfully");
        alert("City added successfully");
        navigate("/Area");
      } else {
        console.error("Failed to add city");
      }
    } catch (error) {
      console.error("Failed to add city", error);
      if (error.response && error.response.status === 400) {
        alert("City already exists in this state");
      }
    }
  };

  const toggleCityStatus = async (cityId, currentState) => {
    try {
      const updatedStatus = currentState === "active" ? "inactive" : "active";
      const response = await axios.post(
        `${VINOOTNEW}/api/cities/${cityId}/toggle`,
        {
          status: updatedStatus,
        }
      );
      if (response.status === 200) {
        console.log("City status updated successfully");
        fetchCities();
      } else {
        console.error("Failed to toggle city status");
      }
    } catch (error) {
      console.error("Failed to toggle city status", error);
      alert("Failed to toggle city status");
    }
  };

  const generateUniqueId = (name, count) => {
    const abbreviation = name.substring(0, 3).toUpperCase();
    const paddedCount = (count + 1).toString().padStart(3, "0");
    const id = abbreviation + paddedCount;
    return id;
  };

  return (
    <div className="city-total" >
      <div><Sidebar/></div>
      <div className="city-right" >
      <h1 >City Master</h1>
        <form className="city-form" onSubmit={handleSubmit}>
          <div>
            <label>
              Select State:
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
              City Name:
              <input
                type="text"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
              />
            </label>
          </div>
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
                {cities.map((city) => (
                  <tr key={city._id}>
                    <td>{city.name}</td>
                    <td>{city.status}</td>
                    <td>
                      <button
                        onClick={() => toggleCityStatus(city._id, city.status)}
                      >
                        {city.status === "active" ? "Inactive" : "Active"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cities;