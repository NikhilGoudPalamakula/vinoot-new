

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom"; // Importing useNavigate
// import SuperSidebar from "../../Masterdata/Sidebar/Sidebar";
// import './Franchisedetails.css'
// import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
// import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
// import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
// import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
// const FranchiseDetails = () => {
//   const [franchises, setFranchises] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(6);

//   const navigate = useNavigate(); // Initializing useNavigate

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
//   const usersFranchiseAdmin = (franchiseID) => {
//     navigate(`/franchise/${franchiseID}/users`);
//     console.log(franchiseID);
//   };

//     // Calculate indexes for pagination
//     const indexOfLastAdmin = currentPage * itemsPerPage;
//     const indexOfFirstAdmin = indexOfLastAdmin - itemsPerPage;
//     const franchises = franchiseAdmins.slice(indexOfFirstAdmin, indexOfLastAdmin);
//     const totalPages = Math.ceil(franchiseAdmins.length / itemsPerPage);
  
//     // Handle page change
//     const handlePageChange = (pageNumber) => {
//       setCurrentPage(pageNumber);
//     };

//   return (
//     <div className="fradetail-total">
//       <div>
//         <SuperSidebar />
//       </div>
//       <div className="fradetail-right">
//         <h1>Franchises</h1>
//         <table>
//           <thead>
//             <tr>
//               <th>Franchise Name</th>
//               <th>Franchise ID</th>
//               <th>Mobile Number</th>
//               <th>Country</th>
//               <th>State</th>
//               <th>City</th>
//               <th>Area</th>
//               <th>Address</th>
//               <th>Pincode</th>
//               <th>Status</th>
//               <th>Action</th>
//               <th>FranchiseAdmins</th>
//             </tr>
//           </thead>
//           <tbody>
//             {franchises.map((franchise) => (
//               <tr key={franchise._id}>
//                 <td>{franchise.franchisename}</td>
//                 <td>{franchise.franchiseID}</td>
//                 <td>{franchise.mobileNumber}</td>
//                 <td>{franchise.country}</td>
//                 <td>{franchise.state}</td>
//                 <td>{franchise.city}</td>
//                 <td>{franchise.area}</td>
//                 <td>{franchise.address}</td>
//                 <td>{franchise.pincode}</td>
//                 <td>{franchise.isActive ? "Active" : "Inactive"}</td>
//                 <td>
//                   <button onClick={() => toggleStatus(franchise._id)}>
//                     {franchise.isActive ? "Deactivate" : "Activate"}
//                   </button>
//                 </td>
//                 <td>
//                   <button
//                     onClick={() => usersFranchiseAdmin(franchise.franchiseID)}>
//                     FranchiseAdmins
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div className="paginationss">
//           <span onClick={() => handlePageChange(1)}>
//             <KeyboardDoubleArrowLeftIcon />
//           </span>
//           <span onClick={() => handlePageChange(currentPage - 1)}>
//             <KeyboardArrowLeftIcon />
//           </span>
//           {[...Array(totalPages)].map((_, index) => (
//             <span
//               key={index}
//               onClick={() => handlePageChange(index + 1)}
//               className={currentPage === index + 1 ? "pageactive-page" : ""}
//             >
//               {index + 1}
//             </span>
//           ))}
//           <span onClick={() => handlePageChange(currentPage + 1)}>
//             <KeyboardArrowRightIcon />
//           </span>
//           <span onClick={() => handlePageChange(totalPages)}>
//             <KeyboardDoubleArrowRightIcon />
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FranchiseDetails;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SuperSidebar from "../../Masterdata/Sidebar/Sidebar";
import './Franchisedetails.css'
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

const FranchiseDetails = () => {
  const [franchises, setFranchises] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [filterStatus, setFilterStatus] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchFranchises = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/franchise");
        setFranchises(response.data.franchises);
      } catch (error) {
        console.error("Error fetching franchises:", error);
      }
    };

    fetchFranchises();
  }, []);

  const toggleStatus = async (franchiseId) => {
    try {
      await axios.put(
        `http://localhost:5001/api/franchise/${franchiseId}/toggle`
      );

      setFranchises(
        franchises.map((franchise) => {
          if (franchise._id === franchiseId) {
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
  };

  // Calculate indexes for pagination
  const indexOfLastFranchise = currentPage * itemsPerPage;
  const indexOfFirstFranchise = indexOfLastFranchise - itemsPerPage;

    // Filter franchises based on the selected status
    const filteredFranchises = franchises.filter(franchise => {
      if (filterStatus === "") {
        return true; // Show all franchises if no status is selected
      } else {
        return franchise.isActive === (filterStatus === "Active");
      }
    });

  const currentFranchises = filteredFranchises.slice(indexOfFirstFranchise, indexOfLastFranchise);
  const totalPages = Math.ceil(filteredFranchises.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
   // Handle filter change
   const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  return (
    <div className="fradetail-total">
      <div>
        <SuperSidebar />
      </div>
      <div className="fradetail-right">
        <h1>Franchises</h1>
        <span>Filter based on active/inactive:</span>
        <select onChange={handleFilterChange} value={filterStatus}>
          <option value="">All</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
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
            {currentFranchises.map((franchise) => (
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
              className={currentPage === index + 1 ? "pageactive-page" : ""}
            >
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

export default FranchiseDetails;

