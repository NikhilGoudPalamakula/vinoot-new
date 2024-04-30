// import React, { useState } from "react";
// import axios from "axios"; // Import Axios
// import { useNavigate } from "react-router-dom";
// import { VINOOTNEW } from "../../Helper/Helper";
// import SuperSidebar from "../Sidebar/Sidebar";
// const States = () => {
//   const [stateName, setStateName] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       // Fetch the current count of states
//       const existingStates = await axios.get(
//         `${VINOOTNEW}/api/states`
//       );
//       const count = existingStates.data.length;

//       // Generate unique ID
//       const state_id = generateUniqueId(stateName, count + 0);

//       const response = await axios.post(`${VINOOTNEW}/api/states`, {
//         state_id: state_id,
//         name: stateName,
//       });
//       if (response.status === 201) {
//         console.log("State added successfully");
//         alert("State added successfully");
//         navigate("/Cities");
//       } else {
//         console.error("Failed to add state");
//       }
//     } catch (error) {
//       console.error("Failed to add state", error);
//       if (error.response && error.response.status === 400) {
//         // If the state already exists, show an alert to the user
//         alert("State already exists");
//       }
//     }
//   };

//   // Function to generate unique ID
//   const generateUniqueId = (name, count) => {
//     const abbreviation = name.substring(0, 3).toUpperCase(); // Get first three letters and convert to uppercase
//     const paddedCount = (count + 1).toString().padStart(3, "0"); // Increment count and pad with zeros
//     const id = abbreviation + paddedCount; // Generate unique ID
//     return id;
//   };

//   return (
//     <>
//     <SuperSidebar/>
//     <div>
      
//       <form onSubmit={handleSubmit}>
//         <label>
//           State Name:
//           <input
//             type="text"
//             value={stateName}
//             onChange={(e) => setStateName(e.target.value)}
//           />
//         </label>
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//     </>
//   );
// };

// export default States;



// State.js
import React, { useState, useEffect } from "react";
import './State.css';
import axios from "axios"; // Import Axios
import { useNavigate } from "react-router-dom";
import { VINOOTNEW } from "../../Helper/Helper";
import Sidebar from "../Sidebar/Sidebar";

const States = () => {
  const [stateName, setStateName] = useState("");
  const [states, setStates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStates();
  }, []);

  const fetchStates = async () => {
    try {
      const response = await axios.get(`${VINOOTNEW}/api/states`);
      setStates(response.data);
    } catch (error) {
      console.error("Failed to fetch states", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const existingStates = await axios.get(`${VINOOTNEW}/api/states`);
      const count = existingStates.data.length;
      const state_id = generateUniqueId(stateName, count + 0);
      const response = await axios.post(`${VINOOTNEW}/api/states`, {
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
        alert("State already exists");
      }
    }
  };

  const toggleStateStatus = async (stateId, currentState) => {
    try {
      const updatedStatus = currentState === "Active" ? "Inactive" : "Active";
      await axios.post(`${VINOOTNEW}/api/states/${stateId}/toggle`, {
        status: updatedStatus,
      });
      fetchStates(); // Refresh states after status update
    } catch (error) {
      console.error("Failed to toggle state status", error);
      alert("Failed to toggle state status");
    }
  };

  const generateUniqueId = (name, count) => {
    const abbreviation = name.substring(0, 3).toUpperCase();
    const paddedCount = (count + 1).toString().padStart(3, "0");
    const id = abbreviation + paddedCount;
    return id;
  };

  return (
    <div style={{display:'flex'}}>
      <div><Sidebar/></div>
      <div className="Appss" style={{marginLeft:'45%',marginTop:'3%'}}>
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
        <table className="tabss">
          <thead>
            <tr>
              <th>State</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {states.map((state) => (
              <tr key={state._id}>
                <td>{state.name}</td>
                <td>{state.status === "active" ? "Active" : "Inactive"}</td>
                <td>
                  <button
                    onClick={() => toggleStateStatus(state._id, state.status)}
                  >
                    {state.status === "active" ? "InActive" : "Active"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default States;