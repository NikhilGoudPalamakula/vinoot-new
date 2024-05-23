import React, { useState, useEffect } from "react";
import axios from "axios";
import SuperSidebar from "../../Masterdata/Sidebar/Sidebar";
import "./Franchisepatients.css";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { VINOOTNEW } from "../../Helper/Helper";
const Franchisepatients = () => {
  const [patients, setPatients] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get(
          `${VINOOTNEW}/api/allfranchisepatients`
        ); // Assuming your server exposes a route '/api/patients' to fetch patients
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);

  // Pagination handlers
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Get current plans
  const indexOfLastPlan = currentPage * itemsPerPage;
  const indexOfFirstPlan = indexOfLastPlan - itemsPerPage;
  const currentPlans = patients.slice(indexOfFirstPlan, indexOfLastPlan);

  // Calculate total pages
  const totalPages = Math.ceil(patients.length / itemsPerPage);

  // -------------------------

  return (
    <div className="allfr-pattotal">
      <div>
        <SuperSidebar />
      </div>
      <div className="allfr-right">
        <h2>All franchises Patients Information</h2>
        <table>
          <thead>
            <tr>
              <th>Patient ID</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Date of Birth</th>
              <th>Email</th>
              <th>Mobile Number</th>
              <th>State</th>
              <th>City</th>
              <th>Area</th>
              <th>Address</th>
              <th>Created By</th>
              <th>Franchise Name</th>
              <th>Franchise ID</th>
            </tr>
          </thead>
          <tbody>
            {currentPlans.map((patient) => (
              <tr key={patient._id}>
                <td>{patient.patient_id}</td>
                <td>{patient.patient_name}</td>
                <td>{patient.gender}</td>
                <td>{patient.dob}</td>
                <td>{patient.email}</td>
                <td>{patient.mobile_number}</td>
                <td>{patient.state}</td>
                <td>{patient.city}</td>
                <td>{patient.area}</td>
                <td>{patient.address}</td>
                <td>{patient.createdBy}</td>
                <td>{patient.franchiseName}</td>
                <td>{patient.FranchiseID}</td>
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

export default Franchisepatients;
