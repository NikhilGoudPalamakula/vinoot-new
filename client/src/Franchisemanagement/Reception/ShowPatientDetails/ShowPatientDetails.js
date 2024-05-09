import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ShowPatientDetails = () => {
  const [patientDetails, setPatientDetails] = useState(null);
  const { patientId } = useParams();

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get(
         ` http://localhost:5001/api/patients/${patientId}`
        );
        setPatientDetails(response.data);
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };

    fetchPatientDetails();
  }, [patientId]);

  if (!patientDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Patient Details</h1>
      <p>Name: {patientDetails.patient_name}</p>
      <p>patientId: {patientDetails.patient_id}</p>
      <p>mobile Number: {patientDetails.mobile_number}</p>
    </div>
  );
};

export default ShowPatientDetails;