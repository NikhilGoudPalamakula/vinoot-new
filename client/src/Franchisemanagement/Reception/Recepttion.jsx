

import React, { useState, useEffect } from 'react';
import ReceptionSidebar from './ReceptionSidebar/ReceptionSidebar';
import axios from 'axios';
import './Recepttion.css'

const Reception = () => {
  const [billingData, setBillingData] = useState([]);

  useEffect(() => {
    const fetchBillingData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/billing');
        setBillingData(response.data);
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
        <table>
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Mobile Number</th>
              <th>Doctor Name</th>
              <th>Plan Type</th>
              <th>Price</th>
              <th>Payment Type</th>
              <th>Amount Paid</th>
              <th>Remaining Amount</th>
            </tr>
          </thead>
          <tbody>
            {billingData.map((billing) => (
              <tr key={billing._id}>
                  <td>{billing.patientName}</td>
                  <td></td>
                  <td>{billing.doctor}</td>
                <td>{billing.planName}</td>
                  <td>{billing.paymentType}</td>
                  <td>{billing.price}</td>
              
                <td>{billing.amountPaid}</td>
                <td>{billing.remainingAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Reception;

