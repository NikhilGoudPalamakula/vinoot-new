// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./Franchisestaffdetails.css";

// import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
// import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
// import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
// import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

// const Franchisestaffdetails = () => {
//   const [admins, setAdmins] = useState([]);

//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(3);

//   const fetchAdmins = async () => {
//     try {
//       const frid = localStorage.getItem("FranchiseID");
//       if (frid) {
//         const response = await axios.get(
//           `http://localhost:5001/api/franchisefetchusers/${frid}`
//         );
//         setAdmins(response.data);
//       } else {
//         console.error("FranchiseID not found in localStorage");
//       }
//     } catch (error) {
//       console.error("Error fetching admins:", error);
//     }
//   };

//   useEffect(() => {
//     fetchAdmins();
//   }, []);

//   const toggleActiveState = async (id, isActive) => {
//     try {
//       const updatedBy = localStorage.getItem("username"); // Get username from localStorage
//       await axios.patch(
//         `http://localhost:5001/api/franchisestateupdate/${id}`,
//         { isActive: !isActive, updatedBy }
//       );
//       // Refresh user list after updating active state
//       fetchAdmins();
//     } catch (error) {
//       console.error("Error updating active state:", error);
//     }
//   };

//   // Pagination handlers
//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   // Get current plans
//   const indexOfLastPlan = currentPage * itemsPerPage;
//   const indexOfFirstPlan = indexOfLastPlan - itemsPerPage;
//   const currentPlans = admins.slice(indexOfFirstPlan, indexOfLastPlan);

//   // Calculate total pages
//   const totalPages = Math.ceil(admins.length / itemsPerPage);

//   return (
//     <div>
//       <div className="franchisestaffdetail">
//         {/* <h1>Franchise Staff Details</h1> */}
//         <table>
//           <thead>
//             <tr>
//               <th>Full Name</th>
//               <th>User ID</th>
//               <th>Franchise Name</th>
//               <th>Franchise ID</th>
//               <th>Designation</th>
//               <th>Email</th>
//               <th>Password</th>
//               <th>Active/Inactive</th>
//               <th>Modified By</th>
//               <th>Modified At</th>
//               <th>Created At</th>
//               <th>Created By</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentPlans.map((admin) => (
//               <tr key={admin._id}>
//                 <td>{admin.fullname}</td>
//                 <td>{admin.userId}</td>
//                 <td>{admin.franchisename}</td>
//                 <td>{admin.FranchiseID}</td>
//                 <td>{admin.designation}</td>
//                 <td>{admin.email}</td>
//                 <td>{admin.password}</td>
//                 <td>
//                   {" "}
//                   <button
//                     onClick={() => toggleActiveState(admin._id, admin.isActive)}
//                   >
//                     {admin.isActive ? "Deactivate" : "Activate"}
//                   </button>
//                 </td>
//                 <td>{admin.modifiedBy}</td>
//                 <td>{admin.modifiedAt}</td>
//                 <td>{admin.createdAt}</td>
//                 <td>{admin.createdBy}</td>
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

// export default Franchisestaffdetails;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Franchisestaffdetails.css";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

const Franchisestaffdetails = () => {
  const [admins, setAdmins] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  // const [originalAdmins, setOriginalAdmins] = useState([]);
  const [currentEditIndex, setCurrentEditIndex] = useState(-1); // Define currentEditIndex state

  const fetchAdmins = async () => {
    try {
      const frid = localStorage.getItem("FranchiseID");
      if (frid) {
        const response = await axios.get(
          `http://localhost:5001/api/franchisefetchusers/${frid}`
        );
        setAdmins(response.data);
      } else {
        console.error("FranchiseID not found in localStorage");
      }
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const toggleActiveState = async (id, isActive) => {
    try {
      const updatedBy = localStorage.getItem("username"); // Get username from localStorage
      await axios.patch(
        `http://localhost:5001/api/franchisestateupdate/${id}`,
        { isActive: !isActive, updatedBy }
      );
      // Refresh user list after updating active state
      fetchAdmins();
    } catch (error) {
      console.error("Error updating active state:", error);
    }
  };

  const handleEdit = (index) => {
    setCurrentEditIndex(index);
  };

  const handleUpdate = async (index) => {
    try {
      const updatedBy = localStorage.getItem("username");
      const updatedAdmin = admins[index];
      const response = await axios.patch(
        `http://localhost:5001/api/franchisestateupdate/${updatedAdmin._id}`,
        {
          fullname: updatedAdmin.fullname,
          password: updatedAdmin.password,
          designation: updatedAdmin.designation,
          email: updatedAdmin.email,
          updatedBy,
        }
      );
      // Reset edit state and fetch updated data
      setCurrentEditIndex(-1);
      fetchAdmins();
    } catch (error) {
      console.error("Error updating admin:", error);
    }
  };

  const handleInputChange = (e, index, key) => {
    const { value } = e.target;
    const updatedAdmins = [...admins];
    updatedAdmins[index][key] = value;
    setAdmins(updatedAdmins);
  };

  const handleCancel = () => {
    // Revert back to original admins
    setAdmins([...admins]);
    fetchAdmins();
    setCurrentEditIndex(-1); // Reset edit index
  };

  // Pagination handlers
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Get current plans
  const indexOfLastPlan = currentPage * itemsPerPage;
  const indexOfFirstPlan = indexOfLastPlan - itemsPerPage;
  const currentPlans = admins.slice(indexOfFirstPlan, indexOfLastPlan);

  // Calculate total pages
  const totalPages = Math.ceil(admins.length / itemsPerPage);

  return (
    <div>
      <div className="franchisestaffdetail">
        {/* <h1>Franchise Staff Details</h1> */}
        <table>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>User ID</th>
              <th>Franchise Name</th>
              <th>Franchise ID</th>
              <th>Designation</th>
              <th>Email</th>
              <th>Password</th>
              <th>Active/Inactive</th>
              <th>Modified By</th>
              <th>Modified At</th>
              <th>Created At</th>
              <th>Created By</th>
              <th>Edit/Update</th>
            </tr>
          </thead>
          <tbody>
            {currentPlans.map((admin, index) => (
              <tr key={admin._id}>
                <td>
                  {currentEditIndex === index ? (
                    <input
                      type="text"
                      value={admin.fullname}
                      onChange={(e) => handleInputChange(e, index, "fullname")}
                    />
                  ) : (
                    admin.fullname
                  )}
                </td>
                <td>{admin.userId}</td>
                <td>{admin.franchisename}</td>
                <td>{admin.FranchiseID}</td>
                <td>
                  {currentEditIndex === index ? (
                    <input
                      type="text"
                      value={admin.designation}
                      onChange={(e) =>
                        handleInputChange(e, index, "designation")
                      }
                    />
                  ) : (
                    admin.designation
                  )}
                </td>
                <td>
                  {currentEditIndex === index ? (
                    <input
                      type="text"
                      value={admin.email}
                      onChange={(e) => handleInputChange(e, index, "email")}
                    />
                  ) : (
                    admin.email
                  )}
                </td>
                <td>
                  {currentEditIndex === index ? (
                    <input
                      type="text"
                      value={admin.password}
                      onChange={(e) => handleInputChange(e, index, "password")}
                    />
                  ) : (
                    admin.password
                  )}
                </td>
                <td>
                  {" "}
                  <button
                    onClick={() => toggleActiveState(admin._id, admin.isActive)}
                  >
                    {admin.isActive ? "Deactivate" : "Activate"}
                  </button>
                </td>
                <td>{admin.modifiedBy}</td>
                <td>{admin.modifiedAt}</td>
                <td>{admin.createdAt}</td>
                <td>{admin.createdBy}</td>
                <td>
                  {currentEditIndex === index ? (
                    <>
                      <button onClick={() => handleUpdate(index)}>
                        Update
                      </button>
                      <button onClick={handleCancel}>Cancel</button>
                    </>
                  ) : (
                    <button onClick={() => handleEdit(index)}>Edit</button>
                  )}
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

export default Franchisestaffdetails;
