import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ShowPatientDetails = () => {
  // const [patientDetails, setPatientDetails] = useState(null);
  // const { patientId } = useParams();

  // useEffect(() => {
  //   const fetchPatientDetails = async () => {
  //     try {
  //       const response = await axios.get(
  //        ` http://localhost:5001/api/billings/${patientId}`
  //       );
  //       setPatientDetails(response.data);
  //     } catch (error) {
  //       console.error("Error fetching patient details:", error);
  //     }
  //   };

  //   fetchPatientDetails();
  // }, [patientId]);

  // if (!patientDetails) {
  //   return <div>Loading...</div>;
  // }

// ---------------



const [patientDetails, setPatientDetails] = useState(null);
  const [patientInstallments, setPatientInstallments] = useState(null);
  const [subtractedAmount, setSubtractedAmount] = useState(0);
  const [updatedRemainingAmount, setUpdatedRemainingAmount] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState("Unpaid");
  const { patientId } = useParams();

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/billings/${patientId}`
        );
        setPatientDetails(response.data);
        setUpdatedRemainingAmount(response.data?.remainingAmount.toFixed(2)); // Initialize with remaining amount
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };

    fetchPatientDetails();
  }, [patientId]);

  useEffect(() => {
    const fetchPatientInstallments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/installment/${patientId}`
        );
        setPatientInstallments(response.data);
      } catch (error) {
        console.error("Error fetching patient installments:", error);
      }
    };

    fetchPatientInstallments();
  }, [patientId]);

  useEffect(() => {
    // Calculate updated remaining amount whenever subtractedAmount changes
    const newRemainingAmount = patientDetails?.remainingAmount - subtractedAmount;
    // Round up to the nearest amount if the difference is 0.99
    const roundedAmount = Math.round(newRemainingAmount * 100) / 100;
    setUpdatedRemainingAmount(roundedAmount.toFixed(2));

    // Check if the remaining amount is zero or less to update payment status
    if (newRemainingAmount <= 0) {
      setPaymentStatus("Paid");
    } else {
      setPaymentStatus("Unpaid");
    }
  }, [subtractedAmount, patientDetails?.remainingAmount]);

  const handleAmountChange = (e) => {
    setSubtractedAmount(Number(e.target.value)); // Convert input value to a number
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const updatedInstallment = {
      //   ...patientInstallments[0], // Assuming you're updating the first installment
      //   remainingAmount: updatedRemainingAmount
      // };

      const newInstallmentData = {
        patient_id: patientDetails.patient_id,
        remainingAmount: updatedRemainingAmount,
        mobile_number: patientDetails.mobile_number,
        patient_name: patientDetails.patient_name,
        bill_number: patientDetails.bill_number,
        // Add other fields as needed
      };

      const response = await axios.post(
        `http://localhost:5001/api/installments`,
        newInstallmentData
      );

      console.log("New installment created:", response.data);
    alert("New installment paid successfully!");

      // await axios.post(`http://localhost:5001/api/installment/update`, updatedInstallment);
      // alert("Remaining amount updated successfully!");
      // You can also fetch the updated installments again here to reflect the changes
    } catch (error) {
      console.error("Error to pay new installment:", error);
    alert("Error to pay new installment. Please try again.");
    }
  };

  if (!patientDetails || !patientInstallments) {
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

      <p>from installments collection</p>
      <h1>Patient Installments</h1>
        {patientInstallments.map((installment, index) => (
          <div key={index}>
            <p>Patient ID: {installment.patient_id}</p>
            <p>Payment Type: {installment.paymentType}</p>
            <p>AMount Paid: {installment.amountPaid}</p>
            <p>Payment status: {installment.status}</p>
            <p>Remaining Amount: {installment.remainingAmount}</p>
            <p>Mobile Number: {installment.mobile_number}</p>
            <p>Patient Name: {installment.patient_name}</p>
            <p>Bill Number: {installment.bill_number}</p>
            <p>Current date: {installment.currentDate}</p>
          </div>
        ))}
      <form onSubmit={handleSubmit}>
          <label>
            <span>Enter Amount to Subtract:</span>
            <input
              type="number"
              name="amountPaid"
              onChange={handleAmountChange}
              required
            />
          </label>
          <input
            type="text"
            name="remainingAmount"
            value={updatedRemainingAmount}
            readOnly
          />
          <input
            type="text"
            value={paymentStatus}
            readOnly
          />
          <button type="submit">Submit</button>
        </form>
       
    </div>
    </div>
  );
};

export default ShowPatientDetails;