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
         ` http://localhost:5001/api/billings/${patientId}`
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
    <div>
      <h1>Patient Details</h1>
      <p>Name: {patientDetails.patient_name}</p>
      <p>patientId: {patientDetails.patient_id}</p>
      <p>mobile Number: {patientDetails.mobile_number}</p>
      <p>Bill Number: {patientDetails.bill_number}</p>
      <p>Plan Name: {patientDetails.plan_name}</p>
      <p>Payment Type: {patientDetails.paymentType}</p>
      <p>Treatment in Days: {patientDetails.days}</p>
      <p>Amount Paid: {patientDetails.amountPaid}</p>
      <p>Payment Status: {patientDetails.status}</p>
      <p>Gst (%): {patientDetails.GST}</p>
      <p>Price: {patientDetails.price}</p>
      <p>GST Amount: {patientDetails.GSTamount}</p>
      <p>RemainingAmount: {patientDetails.remainingAmount}</p>
    </div>

    <div>
      <input value={patientDetails.remainingAmount}></input>
      <input value={patientDetails.bill_number}></input>
      <input value={patientDetails.patient_id}></input>
      <input value={patientDetails.patient_name}></input>
      <input value={patientDetails.mobile_number}></input>
      <input type="number"></input>
    </div>
    </div>
  );
};

export default ShowPatientDetails;