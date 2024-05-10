import React, { useState, useEffect } from "react";
// import "../Franchisedetails/FranchiseAdmintable.css";
import axios from "axios";
import { useParams } from "react-router-dom";
// import Sidebar from "../../Masterdata/Sidebar/Sidebar";
// import "./FranchiseAdmintable.css";
// import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
// import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
// import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
// import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
const ShowFranchiseUsers = () => {
  //   const [admins, setAdmins] = useState([]);
  //   const [currentPage, setCurrentPage] = useState(1);
  //   const [itemsPerPage] = useState(3);
  const { franchiseID } = useParams();
  const [franchiseAdmins, setFranchiseAdmins] = useState([]);

  useEffect(() => {
    const fetchFranchiseAdmins = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/franchisefetchAdmins/${franchiseID}`
        );
        // Filter admins whose designation is "FranchiseAdmin"
        const filteredAdmins = response.data.filter(
          (admin) => admin.designation === "FranchiseAdmin"
        );
        setFranchiseAdmins(filteredAdmins);
      } catch (error) {
        console.error("Error fetching franchise admins:", error);
      }
    };

    fetchFranchiseAdmins();
  }, [franchiseID]);

  //   useEffect(() => {
  //     fetchAdmins();
  //   }, [franchisename]);

  //   const fetchAdmins = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:5001/api/franchisefetchAdmin"
  //       );
  //       // Filter admins whose designation is "FranchiseAdmin"
  //       const filteredAdmins = response.data.filter(
  //         (admin) => admin.designation === "FranchiseAdmin"
  //       );
  //       setFranchiseAdmins(filteredAdmins);
  //     } catch (error) {
  //       console.error("Error fetching admins:", error);
  //     }
  //   };

  const toggleActiveState = async (id, isActive) => {
    try {
      const updatedBy = localStorage.getItem("userId");
      await axios.patch(
        `http://localhost:5001/api/franchisestateupdate/${id}`,
        { isActive: !isActive, updatedBy }
      );
      setFranchiseAdmins((prevAdmins) =>
        prevAdmins.map((admin) =>
          admin._id === id ? { ...admin, isActive: !isActive } : admin
        )
      );
      //   fetchAdmins();
    } catch (error) {
      console.error("Error updating active state:", error);
    }
  };

  //   const totalPages = Math.ceil(franchiseAdmins.length / itemsPerPage);
  return (
    <div className="franchise-details">
      {/* <div>
        <Sidebar />
      </div> */}
      <div className="franchise-admin-rights">
        <h1>Franchise Details</h1>
        <table className="tabf">
          <thead>
            <tr>
              <th>fullname</th>
              <th>userId</th>
              <th>Franchise Name</th>
              <th>Franchise ID</th>
              <th>Designation</th>
              <th>Email</th>
              <th>Password</th>
              <th>Is Active</th>
              <th>Action</th>
              <th>Modified By</th>
              <th>Modified At</th>
              <th>Created At</th>
              <th>Created By</th>
            </tr>
          </thead>
          <tbody>
            {franchiseAdmins.map((admin) => (
              <tr key={admin._id}>
                <td>{admin.fullname}</td>
                <td>{admin.userId}</td>
                <td>{admin.franchisename}</td>
                <td>{admin.franchiseID}</td>
                <td>{admin.designation}</td>
                <td>{admin.email}</td>
                <td>{admin.password}</td>
                <td>{admin.isActive ? "Active" : "Inactive"}</td>
                <td>
                  <button
                    className="farnchiseadmin-activebtn"
                    onClick={() =>
                      toggleActiveState(admin._id, admin.isActive)
                    }>
                    {admin.isActive ? "Deactivate" : "Activate"}
                  </button>
                </td>
                <td>{admin.modifiedBy}</td>
                <td>{admin.modifiedAt}</td>
                <td>{admin.createdAt}</td>
                <td>{admin.createdBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <div className="paginationss">
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
        </div> */}
      </div>
    </div>
  );
};

export default ShowFranchiseUsers;
