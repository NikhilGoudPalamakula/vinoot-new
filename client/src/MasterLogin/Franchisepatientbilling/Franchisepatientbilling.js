import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Franchisepatientbilling = () => {

    const [billingData, setBillingData] = useState([]);

  useEffect(() => {
    const fetchBillingData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/billingdatasuperadmin');
        setBillingData(response.data);
      } catch (error) {
        console.error('Error fetching billing data:', error);
      }
    };

    fetchBillingData();
  }, []);
  return (
    <div>
<div>
      <h2>All Billing Data</h2>
      <table>
        <thead>
          <tr>
            <th>Current Date</th>
            <th>Bill Number</th>
            <th>Doctor</th>
            <th>Plan Name</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {billingData.map((billing) => (
            <tr key={billing._id}>
              <td>{billing.currentDate}</td>
              <td>{billing.bill_number}</td>
              <td>{billing.doctor}</td>
              <td>{billing.plan_name}</td>
              {/* Add more table cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    </div>
  )
}

export default Franchisepatientbilling