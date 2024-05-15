import React, { useState, useEffect } from "react";
import "./FranchiseAdmintable.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../../Masterdata/Sidebar/Sidebar";
import "./FranchiseAdmintable.css";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
const FranchiseAdmintable = () => {
  const [admins, setAdmins] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/franchisefetchAdmin"
      );
      // Filter admins whose designation is "FranchiseAdmin"
      const filteredAdmins = response.data.filter(
        (admin) => admin.designation === "FranchiseAdmin"
      );
      setAdmins(filteredAdmins);
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  };

  const toggleActiveState = async (id, isActive) => {
    try {
      const updatedBy = localStorage.getItem("userId");
      await axios.patch(
        `http://localhost:5001/api/franchisestateupdate/${id}`,
        { isActive: !isActive, updatedBy }
      );
      fetchAdmins();
    } catch (error) {
      console.error("Error updating active state:", error);
    }
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
    <div className="franchise-details">
      <div>
        <Sidebar />
      </div>
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
            {currentPlans.map((admin) => (
              <tr key={admin._id}>
                <td>{admin.fullname}</td>
                <td>{admin.userId}</td>
                <td>{admin.franchisename}</td>
                <td>{admin.FranchiseID}</td>
                <td>{admin.designation}</td>
                <td>{admin.email}</td>
                <td>{admin.password}</td>
                <td>{admin.isActive ? "Active" : "Inactive"}</td>
                <td>
                  <button
                    className="farnchiseadmin-activebtn"
                    onClick={() => toggleActiveState(admin._id, admin.isActive)}
                  >
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

export default FranchiseAdmintable;
