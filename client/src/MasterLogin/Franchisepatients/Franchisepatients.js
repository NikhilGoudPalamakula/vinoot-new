import React, { useState, useEffect } from "react";
import axios from "axios";
import SuperSidebar from "../../Masterdata/Sidebar/Sidebar";
import './Franchisepatients.css'
const Franchisepatients = () => {

    const [patients, setPatients] = useState([]);

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/allfranchisepatients'); // Assuming your server exposes a route '/api/patients' to fetch patients
                setPatients(response.data);
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        };

        fetchPatients();
    }, []);


    // -------------------------

    const [billingData, setBillingData] = useState([]);

    useEffect(() => {
        const fetchBillingData = async () => {
          try {
            const response = await axios.get("http://localhost:5001/api/billingdatasuperadmin");
            setBillingData(response.data);
          } catch (error) {
            console.error("Error fetching billing data:", error);
          }
        };
      
        fetchBillingData();
      }, []);

    return (
        <div  className="allfr-pattotal">
            <div>
                  <SuperSidebar/>
            </div>
            <div className="allfr-right" >
                <h2>All franchises Patients Information</h2>
                {/* <table>
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
                        {patients.map((patient) => (
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
                </table> */}

<table>
          <thead>
            <tr> 
              {/* <th>Date</th> */}
              {/* <th>Bill Number</th> */}
              <th>Patient Name</th>
              <th>Patient MobileNumber</th>
              <th>Doctor</th>
              <th>Plan Type</th>
              <th>Days</th>
              {/* <th>Price</th> */}
              {/* <th>Amount Paid</th> */}
              {/* <th>Remaining Amount</th> */}
              {/* <th>Remaining Amount</th> */}
            </tr>
          </thead>
          <tbody>
            {billingData.map((billing) => (
              <tr key={billing._id}>
                  {/* <td>{billing.currentDate}</td> */}
                  {/* <td>{billing.bill_number}</td> */}
                  <td>{billing.patient_name}</td>
                  <td>{billing.mobile_number}</td>
                  <td>{billing.doctor}</td>
                <td>{billing.plan_name}</td>
                <td>{billing.days}</td>
                  {/* <td>{billing.price}</td> */}
                  {/* <td>{billing.amountPaid}</td> */}
                {/* <td>{billing.remainingAmount}</td> */}
                {/* <td>{billing.remainingAmount}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
            </div>
        </div>
    )
}

export default Franchisepatients