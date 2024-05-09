// import React, { useState, useEffect } from "react";
// import ReceptionSidebar from "./ReceptionSidebar/ReceptionSidebar";
// import axios from "axios";
// import "./Recepttion.css";

// import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
// import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
// import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
// import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

// const Reception = () => {
//   const [billingData, setBillingData] = useState([]);

//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(3);

//   useEffect(() => {
//     const fetchBillingData = async () => {
//       try {
//         const frid = localStorage.getItem("franchiseID");
//         if (frid) {
//           const response = await axios.get(
//             `http://localhost:5001/api/billing${frid}`
//           );
//           setBillingData(response.data);
//         } else {
//           console.error("FranchiseID not found in localStorage");
//         }
//       } catch (error) {
//         console.error("Error fetching billing data:", error);
//       }
//     };

//     fetchBillingData();
//   }, []);

//   // Pagination handlers
//   const handlePageChange = (pageNumber) => {
//     setCurrentPage(pageNumber);
//   };

//   // Get current plans
//   const indexOfLastPlan = currentPage * itemsPerPage;
//   const indexOfFirstPlan = indexOfLastPlan - itemsPerPage;
//   const currentPlans = billingData.slice(indexOfFirstPlan, indexOfLastPlan);

//   // Calculate total pages
//   const totalPages = Math.ceil(billingData.length / itemsPerPage);
//   return (
//     <div className="recp-total">
//       <div>
//         <ReceptionSidebar />
//       </div>
//       <div className="recp-dash-table">
//         <h1>Patients Billing Details</h1>
//         <table>
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Bill Number</th>
//               <th>Patient Name</th>
//               <th>Patient MobileNumber</th>
//               <th>Doctor</th>
//               <th>Plan Type</th>
//               <th>Days</th>
//               <th>Price</th>
//               <th>Amount Paid</th>
//               <th>Remaining Amount</th>
//               <th>Details</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentPlans.map((billing) => (
//               <tr key={billing._id}>
//                 <td>{billing.currentDate}</td>
//                 <td>{billing.bill_number}</td>
//                 <td>{billing.patient_name}</td>
//                 <td>{billing.mobile_number}</td>
//                 <td>{billing.doctor}</td>
//                 <td>{billing.plan_name}</td>
//                 <td>{billing.days}</td>
//                 <td>{billing.price}</td>
//                 <td>{billing.amountPaid}</td>
//                 <td>{billing.remainingAmount}</td>
//                 <td><button>Details</button></td>
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

// export default Reception;




import React, { useState, useEffect } from "react";
import ReceptionSidebar from "./ReceptionSidebar/ReceptionSidebar";
import axios from "axios";
import "./Recepttion.css";
import { useNavigate } from "react-router-dom"; // import ShowPatientDetails from "./Patientdetails/ShowPatientDetails";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

const Reception = () => {
  const [billingData, setBillingData] = useState([]);
  // const [selectedPatientId, setSelectedPatientId] = useState(null); // State to store selected patient ID

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const navigate = useNavigate();

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
  const handleDetailsClick = async (patientId) => {
    navigate(`/showPatient/${patientId}`);
  };

  // Get current plans
  const indexOfLastPlan = currentPage * itemsPerPage;
  const indexOfFirstPlan = indexOfLastPlan - itemsPerPage;
  const currentPlans = billingData.slice(indexOfFirstPlan, indexOfLastPlan);

  // Calculate total pages
  const totalPages = Math.ceil(billingData.length / itemsPerPage);
  return (
    <div className="recp-total">
      <div>
        <ReceptionSidebar />
      </div>
      <div className="recp-dash-table">
        <h1>Patients Billing Details</h1>
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
              <th>Details</th>
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
                <td>
                  <button
                    onClick={() => handleDetailsClick(billing.patient_id)}>
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

export default Reception;
