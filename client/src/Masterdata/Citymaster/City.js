import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
// import States from "../components/States";
import { useNavigate } from "react-router-dom";
import { VINOOTNEW } from "../../Helper/Helper";
const Cities = () => {
  const [stateName, setStateName] = useState("");
  const [stateId, setStateId] = useState("");
  const [cityName, setCityName] = useState("");
  const [states, setStates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch states data when component mounts
    const fetchStates = async () => {
      try {
        const response = await axios.get(`${VINOOTNEW}/api/states`);
        setStates(response.data);
      } catch (error) {
        console.error("Failed to fetch states", error);
      }
    };
    fetchStates();
  }, []);

  const handleStateChange = (e) => {
    const selectedState = states.find((state) => state.name === e.target.value);
    if (selectedState) {
      setStateName(selectedState.name);
      setStateId(selectedState._id);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Find the selected state by name
      const selectedState = states.find((state) => state.name === stateName);
      if (!selectedState) {
        console.error("Selected state not found");
        return;
      }
      const existingStates = await axios.get(
        `${VINOOTNEW}/api/cities`
      );
      const count = existingStates.data.length;
      // Generate unique ID
      const city_id = generateUniqueId(cityName, count + 0);

      const response = await axios.post(`${VINOOTNEW}/api/cities`, {
        stateId: selectedState._id, // Use _id of the selected statess
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
        // If the state already exists, show an alert to the user
        alert("City already exists in this state");
      }
    }
  };
  // Function to generate unique ID
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
    </div>
  );
};

export default Cities;
