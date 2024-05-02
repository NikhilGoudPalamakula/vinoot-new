

import React, { useState, useEffect } from 'react';
import ReceptionSidebar from './ReceptionSidebar/ReceptionSidebar';
import axios from 'axios';
import './Recepttion.css'

const Reception = () => {
  const [billingData, setBillingData] = useState([]);

  useEffect(() => {
    const fetchBillingData = async () => {
      try {
        const frid = localStorage.getItem("FranchiseID");
        if (frid) {
          const response = await axios.get(
            `http://localhost:5001/api/billing${frid}`
          );
          setBillingData(response.data);
        } else {
          console.error("FranchiseID not found in localStorage");
        }
      } catch (error) {
        console.error('Error fetching billing data:', error);
      }
    };
  
    fetchBillingData();
  }, []);
  

  return (
    <div className='recp-total'>
      <div><ReceptionSidebar /></div>
      <div  className='recp-dash-table'>
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
              {/* <th>Remaining Amount</th> */}
            </tr>
          </thead>
          <tbody>
            {billingData.map((billing) => (
              <tr key={billing._id}>
                  <td>{billing.currentDate}</td>
                  <td>{billing.bill_number}</td>
                  <td>{billing.patient_name}</td>
                  <td>{billing.mobile_number}</td>
                  <td>{billing.doctor}</td>
                <td>{billing.plan_name}</td>
                <td>{billing.days}</td>
                  <td>{billing.price}</td>
                  <td>{billing.amountPaid}</td>
                <td>{billing.remainingAmount}</td>
                {/* <td>{billing.remainingAmount}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reception;

