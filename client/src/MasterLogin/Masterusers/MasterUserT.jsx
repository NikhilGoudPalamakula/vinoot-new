

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MasterUserT.css";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { VINOOTNEW } from "../../Helper/Helper";
const MasterUserT = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [currentEditIndex, setCurrentEditIndex] = useState(-1);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${VINOOTNEW}/api/users`);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const toggleActiveState = async (id, isActive) => {
    try {
      const updatedBy = localStorage.getItem("userId");
      await axios.patch(`${VINOOTNEW}/api/users/${id}`, {
        isActive: !isActive,
        updatedBy,
      });
      fetchUsers();
    } catch (error) {
      console.error("Error updating active state:", error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEdit = (userId) => {
    const index = users.findIndex((user) => user.userId === userId);
    setCurrentEditIndex(index);
  };

  const handleUpdate = async (index) => {
    try {
      const updatedBy = localStorage.getItem("userId");
      const updatedAdmin = users[index];
      await axios.patch(`${VINOOTNEW}/api/users/${updatedAdmin._id}`, {
        fullName: updatedAdmin.fullName, // Use updatedAdmin.fullName instead of updatedAdmin.fullname
        email: updatedAdmin.email, // Use updatedAdmin.email instead of updatedAdmin.email
        password: updatedAdmin.password,
        confirmPassword: updatedAdmin.confirmPassword,
        updatedBy,
      });
      setCurrentEditIndex(-1);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  const handleInputChange = (e, index, key) => {
    const { value } = e.target;
    const updatedAdmins = [...users];
    updatedAdmins[index][key] = value;
    setUsers(updatedAdmins);
  };

  const handleCancel = () => {
    setUsers([...users]);
    fetchUsers();
    setCurrentEditIndex(-1);
  };

  const indexOfLastPlan = currentPage * itemsPerPage;
  const indexOfFirstPlan = indexOfLastPlan - itemsPerPage;
  const currentPlans = users.slice(indexOfFirstPlan, indexOfLastPlan);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  return (
    <>
      <div>
        <table className="masterusers-table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>userId</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>password</th>
              <th>Date of Birth</th>
              <th>Gender</th>
              <th>User Type</th>
              <th>Status</th>
              <th>Action</th>
              <th>Changed By</th>
              <th>Edit/Update</th>
            </tr>
          </thead>
          <tbody>
            {currentPlans.map((user, index) => (
              <tr key={user._id}>
                <td>{user.fullName}</td>
                <td>{user.userId}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.password}</td>
                <td>{user.dateOfBirth}</td>
                <td>{user.gender}</td>
                <td>{user.userType}</td>
                <td>{user.isActive ? "Active" : "Inactive"}</td>
                <td className="master-user-action">
                  {user.isActive ? (
                    <button
                      onClick={() => toggleActiveState(user._id, user.isActive)}
                    >
                      Deactivate
                    </button>
                  ) : (
                    <button
                      onClick={() => toggleActiveState(user._id, user.isActive)}
                    >
                      Activate
                    </button>
                  )}
                </td>
                <td>{user.modifiedBy}</td>
                <td className="master-user-edit">
                  <button onClick={() => handleEdit(user.userId)}>Edit</button>
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
        {currentEditIndex > -1 && (
          <div className="modal  master-user-users">
            <div className="modal-content">
              <span
                className="close"
                style={{ cursor: "pointer", fontSize: "medium" }}
                onClick={handleCancel}
              ></span>
              <h2>Edit User Details</h2>
              <div className="modal-content-div">
                <div>
                  <label htmlFor="">fullName</label>
                  <input
                    type="text"
                    value={users[currentEditIndex].fullName || ""}
                    onChange={(e) =>
                      handleInputChange(e, currentEditIndex, "fullName")
                    }
                    placeholder="fullname"
                  />
                </div>
                <div>
                  <label htmlFor="">PhoneNumber</label>
                  <input
                    type="number"
                    value={users[currentEditIndex].phoneNumber || ""}
                    onChange={(e) =>
                      handleInputChange(e, currentEditIndex, "phoneNumber")
                    }
                    placeholder="mobilenumber"
                  />
                </div>
                <div>
                  <label htmlFor="">Email</label>
                  <input
                    type="email"
                    value={users[currentEditIndex].email || ""}
                    onChange={(e) =>
                      handleInputChange(e, currentEditIndex, "email")
                    }
                    placeholder="email"
                  />
                </div>
                <div>
                  <label htmlFor="">Password</label>
                  <input
                    type="text"
                    value={users[currentEditIndex].password || ""}
                    onChange={(e) =>
                      handleInputChange(e, currentEditIndex, "password")
                    }
                    placeholder="password"
                  />
                </div>
                <div>
                  <label htmlFor="">ConfirmPassword</label>
                  <input
                    type="text"
                    value={users[currentEditIndex].confirmPassword || ""}
                    onChange={(e) =>
                      handleInputChange(e, currentEditIndex, "confirmPassword")
                    }
                    placeholder="confirmPassword"
                  />
                </div>

                <div className="update">
                  <button onClick={() => handleUpdate(currentEditIndex)}>
                    Update
                  </button>
                  <button onClick={handleCancel}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MasterUserT;
