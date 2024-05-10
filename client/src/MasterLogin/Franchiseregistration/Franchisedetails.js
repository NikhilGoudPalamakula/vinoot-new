// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const FranchiseDetails = () => {
//   const [franchises, setFranchises] = useState([]);

//   useEffect(() => {
//     const fetchFranchises = async () => {
//       try {
//         const response = await axios.get("http://localhost:5001/api/franchise");
//         setFranchises(response.data.franchises);
//         console.log(franchises);
//       } catch (error) {
//         console.error("Error fetching franchises:", error);
//       }
//     };

//     fetchFranchises();
//   }, []);

//   // Function to handle toggling the active/deactivate status
//   const toggleStatus = async (franchiseId) => {
//     try {
//       // Make a PUT request to update the status in the backend
//       await axios.put(
//         `http://localhost:5001/api/franchise/${franchiseId}/toggle`
//       );

//       // Update the local state to reflect the change
//       // Update the local state to reflect the change
//       setFranchises(
//         franchises.map((franchise) => {
//           if (franchise._id === franchiseId) {
//             // Toggle the status
//             return { ...franchise, isActive: !franchise.isActive };
//           }
//           return franchise;
//         })
//       );
//     } catch (error) {
//       console.error("Error toggling status:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>Franchises</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Franchise Name</th>
//             <th>Franchise ID</th>
//             <th>Mobile Number</th>
//             <th>Country</th>
//             <th>State</th>
//             <th>City</th>
//             <th>Area</th>
//             <th>Address</th>
//             <th>Pincode</th>
//             <th>Status</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {franchises.map((franchise) => (
//             <tr key={franchise._id}>
//               <td>{franchise.franchisename}</td>
//               <td>{franchise.FranchiseID}</td>
//               <td>{franchise.mobileNumber}</td>
//               <td>{franchise.country}</td>
//               <td>{franchise.state}</td>
//               <td>{franchise.city}</td>
//               <td>{franchise.area}</td>
//               <td>{franchise.address}</td>
//               <td>{franchise.pincode}</td>
//               <td>{franchise.isActive ? "Active" : "Inactive"}</td>
//               <td>
//                 <button onClick={() => toggleStatus(franchise._id)}>
//                   {franchise.isActive ? "Deactivate" : "Activate"}
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default FranchiseDetails;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importing useNavigate

const FranchiseDetails = () => {
  const [franchises, setFranchises] = useState([]);

  const navigate = useNavigate(); // Initializing useNavigate

  useEffect(() => {
    const fetchFranchises = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/franchise");
        setFranchises(response.data.franchises);
        console.log(franchises);
      } catch (error) {
        console.error("Error fetching franchises:", error);
      }
    };

    fetchFranchises();
  }, []);

  // Function to handle toggling the active/deactivate status
  const toggleStatus = async (franchiseId) => {
    try {
      // Make a PUT request to update the status in the backend
      await axios.put(
        `http://localhost:5001/api/franchise/${franchiseId}/toggle`
      );

      // Update the local state to reflect the change
      // Update the local state to reflect the change
      setFranchises(
        franchises.map((franchise) => {
          if (franchise._id === franchiseId) {
            // Toggle the status
            return { ...franchise, isActive: !franchise.isActive };
          }
          return franchise;
        })
      );
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };
  const usersFranchiseAdmin = (franchiseID) => {
    navigate(`/franchise/${franchiseID}/users`);
    console.log(franchiseID);
  };

  return (
    <div>
      <h1>Franchises</h1>
      <table>
        <thead>
          <tr>
            <th>Franchise Name</th>
            <th>Franchise ID</th>
            <th>Mobile Number</th>
            <th>Country</th>
            <th>State</th>
            <th>City</th>
            <th>Area</th>
            <th>Address</th>
            <th>Pincode</th>
            <th>Status</th>
            <th>Action</th>
            <th>FranchiseAdmins</th>
          </tr>
        </thead>
        <tbody>
          {franchises.map((franchise) => (
            <tr key={franchise._id}>
              <td>{franchise.franchisename}</td>
              <td>{franchise.franchiseID}</td>
              <td>{franchise.mobileNumber}</td>
              <td>{franchise.country}</td>
              <td>{franchise.state}</td>
              <td>{franchise.city}</td>
              <td>{franchise.area}</td>
              <td>{franchise.address}</td>
              <td>{franchise.pincode}</td>
              <td>{franchise.isActive ? "Active" : "Inactive"}</td>
              <td>
                <button onClick={() => toggleStatus(franchise._id)}>
                  {franchise.isActive ? "Deactivate" : "Activate"}
                </button>
              </td>
              <td>
                <button
                  onClick={() => usersFranchiseAdmin(franchise.franchiseID)}>
                  FranchiseAdmins
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FranchiseDetails;
