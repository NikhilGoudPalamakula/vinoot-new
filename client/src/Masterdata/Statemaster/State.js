// // State.js
// import React, { useState, useEffect } from "react";
// import './State.css';
// import axios from "axios"; // Import Axios
// import { useNavigate } from "react-router-dom";
// import { VINOOTNEW } from "../../Helper/Helper";
// import Sidebar from "../Sidebar/Sidebar";

// const States = () => {
//   const [stateName, setStateName] = useState("");
//   const [states, setStates] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchStates();
//   }, []);

//   const fetchStates = async () => {
//     try {
//       const response = await axios.get(`${VINOOTNEW}/api/states`);
//       setStates(response.data);
//     } catch (error) {
//       console.error("Failed to fetch states", error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const existingStates = await axios.get(`${VINOOTNEW}/api/states`);
//       const count = existingStates.data.length;
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
//         alert("State already exists");
//       }
//     }
//   };

//   const toggleStateStatus = async (stateId, currentState) => {
//     try {
//       const updatedStatus = currentState === "Active" ? "Inactive" : "Active";
//       await axios.post(`${VINOOTNEW}/api/states/${stateId}/toggle`, {
//         status: updatedStatus,
//       });
//       fetchStates(); // Refresh states after status update
//     } catch (error) {
//       console.error("Failed to toggle state status", error);
//       alert("Failed to toggle state status");
//     }
//   };

//   const generateUniqueId = (name, count) => {
//     const abbreviation = name.substring(0, 3).toUpperCase();
//     const paddedCount = (count + 1).toString().padStart(3, "0");
//     const id = abbreviation + paddedCount;
//     return id;
//   };

//   return (
//     <div className="states-total">
//       <div><Sidebar/></div>
//       <div className="staes-right" >
//       <h1 >State Master</h1>
//         <form className="states-form" onSubmit={handleSubmit}>
//           <label>
//             State Name:
//             <input
//               type="text"
//               value={stateName}
//               onChange={(e) => setStateName(e.target.value)}
//             />
//           </label>
//           <button type="submit">Submit</button>
//         </form>

//       <h2 className="states_list_heading">States List</h2>

//         <table className="states-table">
//           <thead>
//             <tr>
//               <th>State</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {states.map((state) => (
//               <tr key={state._id}>
//                 <td>{state.name}</td>
//                 <td>{state.status === "active" ? "Active" : "Inactive"}</td>
//                 <td>
//                   <button
//                     onClick={() => toggleStateStatus(state._id, state.status)}
//                   >
//                     {state.status === "active" ? "InActive" : "Active"}
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default States;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { VINOOTNEW } from "../../Helper/Helper";
import Sidebar from "../Sidebar/Sidebar";
import "./State.css";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
const States = () => {
  const navigate = useNavigate();

  const [stateName, setStateName] = useState("");
  const [states, setStates] = useState([]);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  // Get user ID from local storage
  const userId = localStorage.getItem("userId");

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

  const handleSelect = (event) => {
    const inputValue = event.target.value;
    setStateName(inputValue);
    if (inputValue.length < 3 || inputValue.length > 60) {
      setError("State name must be between 3 and 60 characters.");
    } else {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error) {
      alert("Please fix the error before submitting.");
      return;
    }

    try {
      const existingStates = await axios.get(`${VINOOTNEW}/api/states`);
      const count = existingStates.data.length;
      const state_id = generateUniqueId(stateName, count + 0);
      const response = await axios.post(`${VINOOTNEW}/api/states`, {
        state_id: state_id,
        name: stateName,
        createdBy: userId, // Set createdBy field
        createdAt: new Date(), // Set createdAt field
        modifiedBy: userId, // Set modifiedBy field
        modifiedAt: new Date(), // Set modifiedAt field
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
      const updatedStatus = currentState === "active" ? "inactive" : "active";
      await axios.put(`${VINOOTNEW}/api/states/${stateId}/toggle`, {
        status: updatedStatus,
        modifiedBy: userId, // Set modifiedBy field
        modifiedAt: new Date(), // Set modifiedAt field
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

  // Pagination handlers
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Get current plans
  const indexOfLastPlan = currentPage * itemsPerPage;
  const indexOfFirstPlan = indexOfLastPlan - itemsPerPage;
  const currentPlans = states.slice(indexOfFirstPlan, indexOfLastPlan);

  // Calculate total pages
  const totalPages = Math.ceil(states.length / itemsPerPage);

  return (
    <div className="states-total">
      <div>
        <Sidebar />
      </div>
      <div className="staes-right">
        <h1>State Master</h1>
        <form className="states-form" onSubmit={handleSubmit}>
          <label>
            State Name: <span style={{ color: "red" }}>*</span>
            <input type="text" value={stateName} onChange={handleSelect} />
          </label>
          {error && <div style={{ color: "red" }}>{error}</div>}
          <button type="submit">Submit</button>
        </form>

        <h2 className="states_list_heading">States List</h2>

        <table className="states-table">
          <thead>
            <tr>
              <th>State</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentPlans.map((state) => (
              <tr key={state._id}>
                <td>{state.name}</td>
                <td>{state.status === "active" ? "active" : "inactive"}</td>
                <td>
                  <button
                    onClick={() => toggleStateStatus(state._id, state.status)}>
                    {state.status === "active" ? "inActive" : "active"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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
  );
};

export default States;
