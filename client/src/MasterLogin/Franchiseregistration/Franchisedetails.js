// FranchiseComponent.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FranchiseDetails = () => {
  const [franchises, setFranchises] = useState([]);

  useEffect(() => {
    const fetchFranchises = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/franchise');
        setFranchises(response.data.franchises);
      } catch (error) {
        console.error('Error fetching franchises:', error);
      }
    };

    fetchFranchises();
  }, []);

  return (
    <div>
      <h1>Franchises</h1>
      <table>
        <thead>
          <tr>
            <th>Franchise Name</th>
            <th>Franchise ID</th>
            <th>Mobile Number</th>
            <th>Country</th>
            <th>State</th>
            <th>City</th>
            <th>Area</th>
            <th>Address</th>
            <th>Pincode</th>
          </tr>
        </thead>
        <tbody>
          {franchises.map((franchise) => (
            <tr key={franchise._id}>
              <td>{franchise.franchisename}</td>
              <td>{franchise.FranchiseID}</td>
              <td>{franchise.mobileNumber}</td>
              <td>{franchise.country}</td>
              <td>{franchise.state}</td>
              <td>{franchise.city}</td>
              <td>{franchise.area}</td>
              <td>{franchise.address}</td>
              <td>{franchise.pincode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FranchiseDetails;
