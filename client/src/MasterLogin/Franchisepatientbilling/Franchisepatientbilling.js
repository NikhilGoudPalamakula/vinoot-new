

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { FaFileCsv } from "react-icons/fa6";
import React, { useState, useEffect } from "react";
import axios from "axios";
// import { saveAs } from "file-saver";
import SuperSidebar from "../../Masterdata/Sidebar/Sidebar";
import './Franchisepatientbilling.css'
const Franchisepatientbilling = () => {
  const [billingData, setBillingData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    franchisename: "",
    mobileNumber: "",
    planType: "",
    patientname: "",
    remainingAmount: ""
  });
 

  useEffect(() => {
    fetchBillingData();
  }, []);

  const fetchBillingData = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/billing");
      setBillingData(response.data);
    } catch (error) {
      console.error("Error fetching billing data:", error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  
  
  const filteredData = billingData.filter(billing => {

    const remainingAmount = parseFloat(billing.remainingAmount);
    const filterValue = parseFloat(filters.remainingAmount);
    const lowercaseName = filters.patientname.toLowerCase();
    const lowercaseBillingName = billing.patient_name.toLowerCase();
    const lowercasefranchise = filters.franchisename.toLowerCase();
    const lowercaseFranchsieName = billing.franchiseName.toLowerCase();
// Parse the date values for comparison
const currentDate = new Date(billing.currentDate);
const fromDate = filters.fromDate ? new Date(filters.fromDate) : null;
const toDate = filters.toDate ? new Date(filters.toDate) : null;

    return (
      (!fromDate || currentDate >= fromDate) && 
      (!toDate || currentDate <= toDate) &&
      billing.mobile_number.toString().includes(filters.mobileNumber) &&
      billing.plan_name.includes(filters.planType) &&
      lowercaseBillingName.includes(lowercaseName) &&
      lowercaseFranchsieName.includes(lowercasefranchise) &&
      billing.plan_name.includes(filters.planType) &&
      (isNaN(filterValue) || remainingAmount >= filterValue)
    );
  });

  const indexOfLastPlan = currentPage * itemsPerPage;
  const indexOfFirstPlan = indexOfLastPlan - itemsPerPage;
  const currentPlans = filteredData.slice(indexOfFirstPlan, indexOfLastPlan);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const exportToCSV = () => {
    const csvData = filteredData.map((billing) => [
      billing.franchiseName,
      billing.franchiseID,
      billing.currentDate,
      billing.bill_number,
      billing.patient_id,
      billing.patient_name,
      billing.mobile_number,
      billing.doctor,
      billing.therapist,
      billing.plan_name,
      billing.price,
      billing.TotalAmount,
      billing.remainingAmount
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      csvData.map((row) => row.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "All_franchise_Billing_data.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div  className="franbill-total">
      <div>
           <SuperSidebar/>
      </div>
      <div className="franbill-right">
        <div className="franbill-123">
       <h1> Billing Data</h1>
       <button onClick={exportToCSV}><  FaFileCsv    className="xlsiocn"/></button>   
       </div>
       <div  className="franbill-filterss">
        <div className="franbill-filterss-11">
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
        </div>
        <div  className="franbill-filterss-1">
        <label>
          <span>Franchise Name:</span>
          <input
            type="text"
            name="franchisename"
            value={filters.franchisename}
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
          <span>Patient Name:</span>
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
          <span>Remaining Amount above:</span>
          <input
            type="text"
            name="remainingAmount"
            value={filters.remainingAmount}
            onChange={handleFilterChange}
          />
        </label>
        </div>
        </div>
      <table>
        <thead>
          <tr>
          <th>Franchise Name</th>
          <th>Franchise ID</th>
            <th>Billing Date</th>
            <th>Bill Number</th>
            <th>Patient ID</th>
            <th>Patient Name</th>
            <th>Mobile Number</th>
            <th>Doctor</th>
            <th>Therapist</th>
            <th>Plan Name</th>
            <th>Price</th>
            <th>Total Amount</th>
            <th>Remaining Amount</th>
          </tr>
        </thead>
        <tbody>
          {currentPlans.map((data) => (
            <tr key={data._id}>
             <td>{data.franchiseName}</td>
              <td>{data.franchiseID}</td>
              <td>{data.currentDate}</td>
              <td>{data.bill_number}</td>
              <td>{data.patient_id}</td>
              <td>{data.patient_name}</td>
              <td>{data.mobile_number}</td>
              <td>{data.doctor}</td>
              <td>{data.therapist}</td>
              <td>{data.plan_name}</td>
              <td>{data.price}</td>
              <td>{data.TotalAmount}</td>
              <td>{data.remainingAmount}</td>
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

export default Franchisepatientbilling;

