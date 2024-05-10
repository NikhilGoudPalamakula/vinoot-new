



 import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import './ShowFranchiseUsers.css'
import SuperSidebar from "../../Masterdata/Sidebar/Sidebar";
const ShowFranchiseUsers = () => {
  const { franchiseID } = useParams();
  const [franchiseAdmins, setFranchiseAdmins] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);

  useEffect(() => {
    const fetchFranchiseAdmins = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/franchisefetchAdmins/${franchiseID}`
        );
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
    } catch (error) {
      console.error("Error updating active state:", error);
    }
  };

  // Calculate indexes for pagination
  const indexOfLastAdmin = currentPage * itemsPerPage;
  const indexOfFirstAdmin = indexOfLastAdmin - itemsPerPage;
  const currentAdmins = franchiseAdmins.slice(indexOfFirstAdmin, indexOfLastAdmin);
  const totalPages = Math.ceil(franchiseAdmins.length / itemsPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="francadmin-details">
      <div>
        <SuperSidebar/>
      </div>
      <div className="franadmin-right">
        <h1>
       
          Franchise Admin Details </h1>
        <table>
          <thead>
            <tr>
              <th>Fullname</th>
              <th>User ID</th>
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
            {currentAdmins.map((admin) => (
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

export default ShowFranchiseUsers;
