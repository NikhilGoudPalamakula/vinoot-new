import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './ShowPatientDetails.css';
import ReceptionSidebar from "../ReceptionSidebar/ReceptionSidebar";
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
  const [paymentType, setPaymentType] = useState("Cash");
  const { patientId } = useParams();

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/billings/${patientId}`
        );
        setPatientDetails(response.data);
        // setUpdatedRemainingAmount(response.data?.remainingAmount.toFixed(2)); // Initialize with remaining amount
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
        // console.log(response.data)
        if (response.data.length > 0) {
          // Get the last installment
          const lastInstallment = response.data[response.data.length - 1];
          // Set updatedRemainingAmount with the remaining amount from the last installment
          setUpdatedRemainingAmount(lastInstallment.remainingAmount.toFixed(2));
        }
      } catch (error) {
        console.error("Error fetching patient installments:", error);
      }
    };

    fetchPatientInstallments();
  }, [patientId]);

  useEffect(() => {
    // Check if patientInstallments is not null and not empty
    if (patientInstallments && patientInstallments.length > 0) {
      // Get the last installment
      const lastInstallment = patientInstallments[patientInstallments.length - 1];
      // Calculate updated remaining amount whenever subtractedAmount changes
      const newRemainingAmount = lastInstallment.remainingAmount - subtractedAmount;
      // Round up to the nearest amount if the difference is 0.99
      const roundedAmount = Math.round(newRemainingAmount * 100) / 100;
      setUpdatedRemainingAmount(roundedAmount.toFixed(2));

      // Check if the remaining amount is zero or less to update payment status
      if (newRemainingAmount <= 0) {
        setPaymentStatus("Paid");
      } else {
        setPaymentStatus("Unpaid");
      }
    }
  }, [subtractedAmount, patientInstallments]);




  const handleAmountChange = (e) => {
    setSubtractedAmount(Number(e.target.value)); // Convert input value to a number
  };


  const handlePaymentTypeChange = (e) => {
    setPaymentType(e.target.value);
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
        paymentType: paymentType,
        amountPaid: subtractedAmount,
        status: paymentStatus,

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

  const handlePrint = () => {
    printDetails();
  };
  const printDetails = () => {
    const printWindow = window.open("", "_blank");
  
    const htmlContent = `
      <html>
        <head>
          <title>Vinoot Hair & Skin Clinic</title>
          <style>
            .no-print {
              display: none;
            }
            table {
              border-collapse: collapse;
              width: 100%;
            }
            th, td {
              border: 1px solid #dddddd;
              text-align: left;
              padding: 8px;
            }
            th {
              background-color: #f2f2f2;
            }
            .print-logo img {
              height: 100px; 
              width: 150px;
              justify-content:center;
              align-items:center;
             margin-left:-9px;
            }
          </style>
        </head>
        <body>
        <div class="print-logo">
            <img src="https://vinootherbal.com/wp-content/uploads/2024/02/grrb-1-1536x804.png" alt="logo" />
          </div>
          <h1>Patient Billing Details</h1>
          
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Patient ID</th>
                <th>Mobile Number</th>
                <th>Bill Number</th>
                <th>Plan Name</th>
                <th>Treatment in Days</th>
                <th>Price</th>
                <th>Gst (%)</th>
                <th>GST Amount</th>
                <th>Amount Paid</th>
                <th>Remaining Amount</th>
                <th>Payment Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>${patientDetails.currentDate}</td>
                <td>${patientDetails.patient_name}</td>
                <td>${patientDetails.patient_id}</td>
                <td>${patientDetails.mobile_number}</td>
                <td>${patientDetails.bill_number}</td>
                <td>${patientDetails.plan_name}</td>
                <td>${patientDetails.days}</td>
                <td>${patientDetails.price}</td>
                <td>${patientDetails.GST}</td>
                <td>${patientDetails.GSTamount}</td>
                <td>${patientDetails.amountPaid}</td>
                <td>${patientDetails.remainingAmount}</td>
                <td>${patientDetails.status}</td>
              </tr>
            </tbody>
          </table>
          <h1>Patient Bill Installments</h1>
          <table>
            <thead>
              <tr>
                <th>Paid Date</th>
                <th>Patient ID</th>
                <th>Patient Name</th>
                <th>Mobile Number</th>
                <th>Bill Number</th>
                <th>Payment Type</th>
                <th>Last Amount Paid</th>
                <th>Remaining Amount</th>
                <th>Payment Status</th>
              </tr>
            </thead>
            <tbody>
              ${patientInstallments.map((installment, index) => `
                <tr key=${index}>
                  <td>${installment.currentDate}</td>
                  <td>${installment.patient_id}</td>
                  <td>${installment.patient_name}</td>
                  <td>${installment.mobile_number}</td>
                  <td>${installment.bill_number}</td>
                  <td>${installment.paymentType}</td>
                  <td>${installment.amountPaid}</td>
                  <td>${installment.remainingAmount}</td>
                  <td>${installment.status}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `;
  
    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
  
    printWindow.print();
    printWindow.close();
  };
  
  
  
  return (
    <div>
      <div className="showpat-total">
        <div>

          <ReceptionSidebar />
        </div>
        <div className="showpat-right">
          <div  className="sowpat-above-t1">
            <h1>Patient Billing Details</h1>

            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Patient ID</th>
                  <th>Mobile Number</th>
                  <th>Bill Number</th>
                  <th>Plan Name</th>
                  <th>Treatment in Days</th>
                  <th>Price</th>
                  <th>Gst (%)</th>
                  <th>GST Amount</th>
                  <th>Amount Paid</th>
                  <th>Remaining Amount</th>
                  <th>Payment Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{patientDetails.currentDate}</td>
                  <td>{patientDetails.patient_name}</td>
                  <td>{patientDetails.patient_id}</td>
                  <td>{patientDetails.mobile_number}</td>
                  <td>{patientDetails.bill_number}</td>
                  <td>{patientDetails.plan_name}</td>
                  <td>{patientDetails.days}</td>
                  <td>{patientDetails.price}</td>
                  <td>{patientDetails.GST}</td>
                  <td>{patientDetails.GSTamount}</td>
                  <td>{patientDetails.amountPaid}</td>
                  <td>{patientDetails.remainingAmount}</td>
                  <td>{patientDetails.status}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="sowpat-above-t2">
            <h1>Patient Bill Installments</h1>
            <table>
              <thead>
                <tr>
                <th>Paid Date</th>
                  <th>Patient ID</th>
                  <th>Patient Name</th>
                  <th>Mobile Number</th>
                  <th>Bill Number</th>
                  <th>Payment Type</th>
                  <th>Last Amount Paid</th>
                  <th>Remaining Amount</th>
                  <th>Payment Status</th>
                  
                </tr>
              </thead>
              <tbody>
                {patientInstallments.map((installment, index) => (
                  <tr key={index}>
                    <td>{installment.currentDate}</td>
                    <td>{installment.patient_id}</td>
                    <td>{installment.patient_name}</td>
                    <td>{installment.mobile_number}</td>
                    <td>{installment.bill_number}</td>
                    <td>{installment.paymentType}</td>
                    <td>{installment.amountPaid}</td>
                    <td>{installment.remainingAmount}</td>
                    <td>{installment.status}</td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
        
            <form className="shwopat-belowdet" onSubmit={handleSubmit}>
              <table>
                <thead>
                  <th>Payment Type</th>
                  <th> Installment amount to pay</th>
                  <th>Remaining Amount</th>
                  <th>Payment Status</th>
                </thead>
                <tbody>
                  <td>
                    <select value={paymentType} onChange={handlePaymentTypeChange}>
                      <option value="">Select Payment Type</option>
                      <option value="Cash">Cash</option>
                      <option value="Credit Card">Credit Card</option>

                    </select>
                  </td>
                  <td>
                    <input
                      type="number"
                      name="amountPaid"
                      step="any"
                      onChange={handleAmountChange}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="remainingAmount"
                      value={updatedRemainingAmount}
                      readOnly
                    />
                  </td>


                  <td>
                    <input
                      type="text"
                      name="paymentStatus"
                      value={paymentStatus}
                      readOnly
                    />
                  </td>
                </tbody>
              </table>
              <button type="submit">Submit</button>
              <button onClick={handlePrint} style={{cursor:"pointer"}}>Print</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowPatientDetails;