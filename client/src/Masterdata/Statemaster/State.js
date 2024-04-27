import React, { useState } from "react";
import axios from "axios"; // Import Axios
import { useNavigate } from "react-router-dom";

const States = () => {
  const [stateName, setStateName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Fetch the current count of states
      const existingStates = await axios.get(
        "http://localhost:5000/api/states"
      );
      const count = existingStates.data.length;

      // Generate unique ID
      const state_id = generateUniqueId(stateName, count + 0);

      const response = await axios.post("http://localhost:5000/api/states", {
        state_id: state_id,
        name: stateName,
      });
      if (response.status === 201) {
        console.log("State added successfully");
        alert("State added successfully");
        navigate("/Cities");
      } else {
        console.error("Failed to add state");
      }
    } catch (error) {
      console.error("Failed to add state", error);
      if (error.response && error.response.status === 400) {
        // If the state already exists, show an alert to the user
        alert("State already exists");
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
        <label>
          State Name:
          <input
            type="text"
            value={stateName}
            onChange={(e) => setStateName(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default States;
