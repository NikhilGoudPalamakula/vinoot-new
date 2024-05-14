

import React, { useState, useEffect } from "react";
import ReceptionSidebar from "./ReceptionSidebar/ReceptionSidebar";
import axios from "axios";
import "./Recepttion.css";
import { useNavigate } from "react-router-dom";


import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { FaFileCsv } from "react-icons/fa6";
import { VINOOTNEW } from "../../Helper/Helper";
const Reception = () => {
  const [billingData, setBillingData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [filters, setFilters] = useState({
    fromDate: "",
    toDate: "",
    mobileNumber: "",
    planType: "",
    patientname: "",
    remainingAmount: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBillingData = async () => {
      try {
        const frid = localStorage.getItem("franchiseID");
        if (frid) {
          const response = await axios.get(
            `${VINOOTNEW}/api/billing${frid}`
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDetailsClick = async (patientId) => {
    navigate(`/showPatient/${patientId}`);
  };

  const filteredData = billingData.filter((billing) => {
    const remainingAmount = parseFloat(billing.remainingAmount);
    const filterValue = parseFloat(filters.remainingAmount);
    const lowercaseName = filters.patientname.toLowerCase();
    const lowercaseBillingName = billing.patient_name.toLowerCase();
    const currentDate = new Date(billing.currentDate);
    const fromDate = filters.fromDate ? new Date(filters.fromDate) : null;
    const toDate = filters.toDate ? new Date(filters.toDate) : null;

    return (
      (!fromDate || currentDate >= fromDate) &&
      (!toDate || currentDate <= toDate) &&
      billing.mobile_number.toString().includes(filters.mobileNumber) &&
      billing.plan_name.includes(filters.planType) &&
      lowercaseBillingName.includes(lowercaseName) &&
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
    const csvData = currentPlans.map((billing) => ({
      Date: billing.currentDate,
      "Bill Number": billing.bill_number,
      "Patient ID": billing.patient_id,
      "Patient Name": billing.patient_name,
      "Patient Mobile Number": billing.mobile_number,
      Doctor: billing.doctor,
      Therapist: billing.therapist,
      "Plan Type": billing.plan_name,
      Days: billing.days,
      Price: billing.TotalAmount,
      "Amount Paid": billing.amountPaid,
      "Remaining Amount": billing.remainingAmount,
    }));

    const csvContent =
      "data:text/csv;charset=utf-8," +
      Object.keys(csvData[0]).join(",") +
      "\n" +
      csvData.map((row) => Object.values(row).join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "billing_data.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className="recp-total">
      <div>
        <ReceptionSidebar />
      </div>
      <div className="recp-dash-table">
        <div className="recep-dash-fi">
          <h1>Patients Billing Details</h1>
        <button  onClick={exportToCSV}><FaFileCsv className="xlsiocn2" /></button> 
          {/* <button  onClick={exportToCSV}><FaFileCsv/></button> */}
        </div>
        <div className="recep-dash-filter">
          <div className="recep-dash-filter-1">
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
          <div className="recep-dash-filter-11">
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
              <th>Date</th>
              <th>Bill Number</th>
              <th>Patient ID</th>
              <th>Patient Name</th>
              <th>Patient MobileNumber</th>
              <th>Doctor</th>
              <th>Therapist</th>
              <th>Plan Type</th>
              <th>Days</th>
              <th>Price</th>
              <th>Amount Paid</th>
              <th>Remaining Amount</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {currentPlans.map((billing) => (
              <tr key={billing._id}>
                <td>{billing.currentDate}</td>
                <td>{billing.bill_number}</td>
                <td>{billing.patient_id}</td>
                <td>{billing.patient_name}</td>
                <td>{billing.mobile_number}</td>
                <td>{billing.doctor}</td>
                <td>{billing.therapist}</td>
                <td>{billing.plan_name}</td>
                <td>{billing.days}</td>
                <td>{billing.TotalAmount}</td>
                <td>{billing.amountPaid}</td>
                <td>{billing.remainingAmount}</td>
                <td>
                  <button
                    onClick={() => handleDetailsClick(billing.patient_id)}
                  >
                    Details
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

export default Reception;

