import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MasterUserT.css";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
const MasterUserT = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/users`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const toggleActiveState = async (id, isActive) => {
    try {
      const updatedBy = localStorage.getItem("userId"); // Get username from localStorage
      await axios.patch(`http://localhost:5001/api/users/${id}`, {
        isActive: !isActive,
        updatedBy,
      });
      // Refresh user list after updating active state
      fetchUsers();
    } catch (error) {
      console.error("Error updating active state:", error);
    }
  };
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Get current plans
  const indexOfLastPlan = currentPage * itemsPerPage;
  const indexOfFirstPlan = indexOfLastPlan - itemsPerPage;
  const currentPlans = users.slice(indexOfFirstPlan, indexOfLastPlan);

  // Calculate total pages
  const totalPages = Math.ceil(users.length / itemsPerPage);
  return (
    <>
      <div>
        {/* <h2>Master User List</h2> */}
        <table className="masterusers-table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>userId</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Date of Birth</th>
              <th>Gender</th>
              <th>User Type</th>
              <th>Active</th>
              <th>Changed By</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentPlans.map((user) => (
              <tr key={user._id}>
                <td>{user.fullName}</td>
                <td>{user.userId}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.dateOfBirth}</td>
                <td>{user.gender}</td>
                <td>{user.userType}</td>
                <td>{user.isActive ? "Active" : "Inactive"}</td>
                <td>{user.modifiedBy}</td>
                <td>
                  <button
                    className="admin-activeinactive"
                    onClick={() => toggleActiveState(user._id, user.isActive)}
                  >
                    {user.isActive ? "Deactivate" : "Activate"}
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
    </>
  );
};

export default MasterUserT;
