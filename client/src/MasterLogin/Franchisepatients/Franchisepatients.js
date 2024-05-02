import React, { useState, useEffect } from "react";
import axios from "axios";

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

    return (
        <div>
            <div>
                  
            </div>
            <div>
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
                </table>
            </div>
        </div>
    )
}

export default Franchisepatients