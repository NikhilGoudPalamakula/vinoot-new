import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import FranchiseadminSidebar from "../Franchiseadminsidebar/Franchiseadminsidebar";
import "./FranchiseAdmin.css";

import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
const FranchiseAdmin = () => {
  const [billingData, setBillingData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    mobileNumber: "",
    planType: "",
    patientname: "",
    remainingAmount: ""
  });

  useEffect(() => {
    const fetchBillingData = async () => {
      try {
        const frid = localStorage.getItem("franchiseID");
        if (frid) {
          const response = await axios.get(
            `http://localhost:5001/api/billing${frid}`
          );
          setBillingData(response.data);
        } else {
          console.error("FranchiseID not found in localStorage");
        }
      } catch (error) {
        console.error("Error fetching billing data:", error);
      }
    };

    fetchBillingData();
  }, []);

  // Pagination handlers
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredData = billingData.filter(billing => {

    const remainingAmount = parseFloat(billing.remainingAmount);
    const filterValue = parseFloat(filters.remainingAmount);
    const lowercaseName = filters.patientname.toLowerCase();
    const lowercaseBillingName = billing.patient_name.toLowerCase();
    return (
      billing.currentDate.includes(filters.fromDate) &&
      billing.currentDate.includes(filters.toDate) &&
      billing.mobile_number.toString().includes(filters.mobileNumber) &&
      billing.plan_name.includes(filters.planType) &&
      lowercaseBillingName.includes(lowercaseName) &&
      // billing.remainingAmount.toString().includes(filters.remainingAmount)
      billing.plan_name.includes(filters.planType) &&
      (isNaN(filterValue) || remainingAmount >= filterValue)
    );
  });

  // Get current plans
  const indexOfLastPlan = currentPage * itemsPerPage;
  const indexOfFirstPlan = indexOfLastPlan - itemsPerPage;
  // const currentPlans = billingData.slice(indexOfFirstPlan, indexOfLastPlan);
  const currentPlans = filteredData.slice(indexOfFirstPlan, indexOfLastPlan);
  const totalPages = Math.ceil(billingData.length / itemsPerPage);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const exportToExcel = () => {
    const header = ["Date", "Bill Number", "Patient Name", "Patient Mobile Number", "Doctor", "Plan Type", "Days", "Price", "Amount Paid", "Remaining Amount"];
    const data = currentPlans.map(billing => [
      billing.currentDate,
      billing.bill_number,
      billing.patient_name,
      billing.mobile_number,
      billing.doctor,
      billing.plan_name,
      billing.days,
      billing.TotalAmount,
      billing.amountPaid,
      billing.remainingAmount
    ]);

    const ws = XLSX.utils.aoa_to_sheet([header, ...data]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Billing Data");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const excelBlob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(excelBlob, "Billing_data.xlsx");
  };

  return (
    <div className="franchise-admin-total">
      <div>
        <FranchiseadminSidebar />
      </div>
      <div className="fradmin-staffri">
        <h1>Patients Billing Details</h1>
        <button onClick={exportToExcel}>Export to Excel</button>
        <label>
          <span>From Date:</span>
          <input
            type="date"
            name="fromDate"
            value={filters.fromDate}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          <span>To Date:</span>
          <input
            type="date"
            name="toDate"
            value={filters.toDate}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          <span>Mobile Number:</span>
          <input
            type="text"
            name="mobileNumber"
            value={filters.mobileNumber}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          <span>Name:</span>
          <input
            type="text"
            name="patientname"
            value={filters.patientname}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          <span>Plan Type:</span>
          <input
            type="text"
            name="planType"
            value={filters.planType}
            onChange={handleFilterChange}
          />
        </label>
        <label>
          <span>Remaining Amount above :</span>
          <input
            type="text"
            name="remainingAmount"
            value={filters.remainingAmount}
            onChange={handleFilterChange}
          />
        </label>

        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Bill Number</th>
              <th>Patient Name</th>
              <th>Patient MobileNumber</th>
              <th>Doctor</th>
              <th>Plan Type</th>
              <th>Days</th>
              <th>Price</th>
              <th>Amount Paid</th>
              <th>Remaining Amount</th>
              {/* <th>Remaining Amount</th> */}
            </tr>
          </thead>
          <tbody>
            {currentPlans.map((billing) => (
              <tr key={billing._id}>
                <td>{billing.currentDate}</td>
                <td>{billing.bill_number}</td>
                <td>{billing.patient_name}</td>
                <td>{billing.mobile_number}</td>
                <td>{billing.doctor}</td>
                <td>{billing.plan_name}</td>
                <td>{billing.days}</td>
                <td>{billing.TotalAmount}</td>
                <td>{billing.amountPaid}</td>
                <td>{billing.remainingAmount}</td>
                {/* <td>{billing.remainingAmount}</td> */}
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

export default FranchiseAdmin;
