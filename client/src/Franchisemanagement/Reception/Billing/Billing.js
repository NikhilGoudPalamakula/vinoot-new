
import React, { useState, useEffect } from "react";
import { VINOOTNEW } from "../../../Helper/Helper";
import axios from "axios";
import ReceptionSidebar from "../ReceptionSidebar/ReceptionSidebar";
import "./Billing.css";

const Billing = () => {
  // --------------patient details fetch---------------

  const [phoneInput, setPhoneInput] = useState(""); // User input
  const [selectedNumber, setSelectedNumber] = useState(null); // Selected plan object
  const [suggestions1, setSuggestions1] = useState([]); // Autosuggest options
  const [filteredSuggestions1, setFilteredSuggestions1] = useState([]); // Filtered suggestions based on input
  const [focusedInput1, setFocusedInput1] = useState(null);
  const [isLoading1, setIsLoading1] = useState(false); // Loading indicator

  // Fetch suggestions when the component mounts
  const [patients, setPatients] = useState([]);
  useEffect(() => {
    const fetchNumbers = async () => {
      setIsLoading(true);
      try {
        const frid = localStorage.getItem("FranchiseID");
        if (frid) {
          const response = await axios.get(
            `http://localhost:5001/api/patients${frid}`
          );
          setPatients(response.data);
          setSuggestions1(response.data);
          setFilteredSuggestions1(response.data);
          setIsLoading1(false);
        } else {
          console.error("FranchiseID not found in localStorage");
        }
      } catch (error) {
        console.error("Failed to fetch details", error);
        setIsLoading1(false);
      }
    };
    fetchNumbers();
  }, []);

  // Filter suggestions based on input value
  useEffect(() => {
    const filterSuggestions = () => {
      if (typeof phoneInput !== "string" || phoneInput.trim() === "") {
        setFilteredSuggestions1(suggestions1); // Show all suggestions if input is empty or not a string
      } else {
        const filteredDetails = suggestions1.filter((details) =>
          details.mobile_number.includes(phoneInput)
        );
        setFilteredSuggestions1(filteredDetails);
      }
    };
    filterSuggestions();
  }, [phoneInput, suggestions1]);

  const handlePlanChange1 = (e) => {
    const PhoneInput = e.target.value;
    setPhoneInput(PhoneInput); // Update selected plan
    setFocusedInput1("number");
  };

  const handlePlanSelection1 = (suggestion) => {
    const selectedNumber = suggestions1.find(
      (plan) => plan.mobile_number === suggestion
    );

    if (selectedNumber) {
      setSelectedNumber(selectedNumber); // Set the entire selected plan object
      setPhoneInput(selectedNumber.mobile_number); // Set the plan_name property of the selected suggestion
      setFocusedInput1(null); // Hide suggestion list when a suggestion is clicked
    }
  };

  // -------------------Doctor details fetch ---------------
  const [doctors, setDoctors] = useState([]);
  const [paymentType, setPaymentType] = useState(""); // State for payment type
  const [amountPaid, setAmountPaid] = useState(0); // State for amount paid

  const [selectedDoctor, setSelectedDoctor] = useState(""); // State for selected doctor


  // Function to handle doctor selection
  const handleDoctorChange = (e) => {
    const selectedDoctorId = e.target.value; // Get the selected doctor's ID
    const selectedDoctor = doctors.find(doctor => doctor._id === selectedDoctorId); // Find the doctor object based on the ID
    setSelectedDoctor(selectedDoctorId); // Update selected doctor to their ID
  };



  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const frid = localStorage.getItem("FranchiseID");
        if (frid) {
          const response = await axios.get(
            `http://localhost:5001/api/franchisefetchusers/${frid}`
          );
          // Filter doctors from the response data
          const doctorList = response.data.filter(
            (admin) => admin.designation === "Doctor"
          );
          setDoctors(doctorList);
        } else {
          console.error("FranchiseID not found in localStorage");
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  // -------------------posting of all data ----------------

  const [gst, setGST] = useState(""); // State for GST
  const [price, setPrice] = useState(""); // State for price
  const [days, setDays] = useState(0); // State for price
  const [status, setStatus] = useState(""); // State for payment status
  const [remaining, setRemainingAmount] = useState(0);
  const [planName, setPlanName] = useState(""); // User input
  const [selectedPlan, setSelectedPlan] = useState(null); // Selected plan object
  const [suggestions, setSuggestions] = useState([]); // Autosuggest options
  const [filteredSuggestions, setFilteredSuggestions] = useState([]); // Filtered suggestions based on input
  const [focusedInput, setFocusedInput] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loading indicator
  const [mobile_number, setMobile_number] = useState(false); // Loading indicator
  const [patient_id, setPatient_id] = useState(false); // Loading indicator
  const [patient_name, setPatient_name] = useState(false); // Loading indicator
  const [address, setAddress] = useState(false); // Loading indicator
  const [bill_numbers, setBill_numbers] = useState([]); // Loading indicator

  // Fetch suggestions when the planName changes
  useEffect(() => {
    const fetchPlans = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:5001/api/treatment-plan"
        );
        const activePlans = response.data.filter(
          (plan) => plan.status === "active"
        );
        setSuggestions(activePlans);
        setFilteredSuggestions(activePlans);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch plans", error);
        setIsLoading(false);
      }
    };
    fetchPlans();
  }, []);

  // Filter suggestions based on input value
  useEffect(() => {
    const filterSuggestions = () => {
      if (typeof planName !== "string" || planName.trim() === "") {
        setFilteredSuggestions(suggestions); // Show all suggestions if input is empty or not a string
      } else {
        const lowerCasePlanName = planName.toLowerCase();
        const filtered = suggestions.filter((plan) =>
          plan.plan_name.toLowerCase().includes(lowerCasePlanName)
        );
        setFilteredSuggestions(filtered);
      }
    };
    filterSuggestions();
  }, [planName, suggestions]);

  const handlePlanChange = (e) => {
    const PlanName = e.target.value;
    setPlanName(PlanName); // Update selected plan
    setFocusedInput("plan");
  };

  const handlePlanSelection = (suggestion) => {
    const selectedPlan = suggestions.find(
      (plan) => plan.plan_name === suggestion
    );

    if (selectedPlan) {
      setSelectedPlan(selectedPlan); // Set the entire selected plan object
      setPlanName(selectedPlan.plan_name); // Set the planName
      setFocusedInput(null); // Hide suggestion list when a suggestion is clicked
    }
  };

  // Update status based on the amount paid
  // useEffect(() => {
  //   if (selectedPlan) {
  //     const { price } = selectedPlan;
  //     if (amountPaid >= price) {
  //       setStatus("Paid");
  //     } else {
  //       setStatus("Unpaid");
  //     }
  //     // Calculate remaining amount
  //     const remaining = price - amountPaid;
  //     setRemainingAmount(remaining >= 0 ? remaining : 0); // Ensure remaining amount is non-negative
  //   }
  // }, [amountPaid, selectedPlan]);


  // const [status, setStatus] = useState(""); // State to hold payment status

  useEffect(() => {
    if (selectedPlan) {
      const price = parseFloat(selectedPlan.price);
      const amountPaidValue = parseFloat(amountPaid);
      const remaining = price - amountPaidValue;
      setRemainingAmount(remaining);

      // Determine payment status
      if (amountPaidValue >= price) {
        setStatus("Paid");
      } else {
        setStatus("Unpaid");
      }
    }
  }, [amountPaid, selectedPlan]);



  //-------------------Bill Numbers Fetching ----------------
  const [billingNumber, setBillingNumber] = useState("");
  const generateBillNumber = (bill_numbers) => {
    if (bill_numbers.length === 0) {
      // If there are no existing patients, start with the first ID
      return "BIL001";
    } else {
      // Extract the numeric part of the last patient ID
      const lastIDNumeric = parseInt(
        bill_numbers[bill_numbers.length - 1].bill_number.substr(3),
        10
      );
      // Increment the numeric part by 1
      const nextIDNumeric = lastIDNumeric + 1;
      // Pad the numeric part with zeros to maintain the format "PAT001"
      const nextID = "BIL" + nextIDNumeric.toString().padStart(3, "0");
      return nextID;
    }
  };


  const saveData = async () => {
    const newBillNumber = generateBillNumber(bill_numbers);
    setBillingNumber(newBillNumber);
    try {
      const createdBy = localStorage.getItem("userId");
      const franchiseName = localStorage.getItem("franchisename");
      const FranchiseID = localStorage.getItem("FranchiseID");
      const remaining = selectedPlan ? parseFloat(selectedPlan.price) - parseFloat(amountPaid) : 0; // Calculate remaining
      const currentDate = new Date().toISOString().split("T")[0];

      // Send the data to the backend API endpoint for saving
      await axios.post("http://localhost:5001/api/billing", {
        bill_number: newBillNumber, // Use the newly generated bill number
        doctor: selectedDoctor,
        plan_name: selectedPlan ? selectedPlan.plan_name : "",
        paymentType: paymentType,
        amountPaid: amountPaid,
        status: amountPaid >= selectedPlan.price ? "Paid" : "Unpaid", // Determine payment status directly here
        GST: selectedPlan ? selectedPlan.GST : "",
        price: selectedPlan ? selectedPlan.price : "",
        days: selectedPlan ? selectedPlan.days : "",
        createdBy: createdBy,
        franchiseName: franchiseName,
        FranchiseID: FranchiseID,
        remainingAmount: remaining, // Ensure remaining is sent correctly
        mobile_number: selectedNumber ? selectedNumber.mobile_number : "",
        patient_id: selectedNumber ? selectedNumber.patient_id : "",
        patient_name: selectedNumber ? selectedNumber.patient_name : "",
        address: selectedNumber ? selectedNumber.address : "",
        currentDate: currentDate,
      });

      // Reset form fields after successful save
      setPlanName("");
      setPaymentType("");
      setAmountPaid(0);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  useEffect(() => {
    fetchBillNumbers();
  }, []);

  const fetchBillNumbers = async () => {
    try {
      const frid = localStorage.getItem("FranchiseID");

      if (frid) {
        const response = await axios.get(
          `http://localhost:5001/api/billing${frid}`
        );
        setBill_numbers(response.data);
      } else {
        console.error("FranchiseID not found in localStorage");
      }
    } catch (error) {
      console.error("Error fetching billNUmbers:", error);
    }
  };

  // Initialize form data including the patient ID
  useEffect(() => {
    const newBillNumber = generateBillNumber(bill_numbers);
    setBillingNumber(newBillNumber);
  }, [bill_numbers]);

  // --------------------

  // State for the current date
  const [currentDate, setCurrentDate] = useState("");

  // Function to fetch the current date
  useEffect(() => {
    const fetchCurrentDate = () => {
      const date = new Date();
      setCurrentDate(date.toLocaleDateString());
    };
    fetchCurrentDate();
  }, []);

  const printDetails = () => {
    // Open a new window for printing
    const printWindow = window.open("", "_blank");

    // Construct the HTML content to be printed
    const htmlContent = `
      <html>
        <head>
          <title>Billing Details</title>
          <!-- Add any CSS styles for printing -->
          <style>
            /* Define your print styles here */
            /* For example, hide unnecessary elements */
            .no-print {
              display: none;
            }
          </style>
        </head>
        <body>
          <h1>Billing Details</h1>
          <p>Date: ${currentDate}</p>
          <p>Bill Number: ${billingNumber}</p>
          <p>Mobile Number: ${selectedNumber ? selectedNumber.mobile_number : ""}</p>
          <p>Patient ID: ${selectedNumber ? selectedNumber.patient_id : ""}</p>
          <p>Patient Name: ${selectedNumber ? selectedNumber.patient_name : ""}</p>
          <p>Address: ${selectedNumber ? selectedNumber.address : ""}</p>
          <p>Franchise Name: ${localStorage.getItem("franchisename")}</p>
          <p>Franchise ID: ${localStorage.getItem("FranchiseID")}</p>

          <!-- Add any other details you want to include -->
          <table>
          <tr>
            <td><b>Selected Doctor</b></td>
            <td>${selectedDoctor}</td>
          </tr>
          <tr>
            <td><b>Plan Name</b></td>
            <td>${planName}</td>
          </tr>
          <tr>
            <td><b>GST</b></td>
            <td>${selectedPlan?.GST || 'N/A'}</td>
          </tr>
          <tr>
            <td><b>Days</b></td>
            <td>${selectedPlan?.days || 'N/A'}</td>
          </tr>
          <tr>
            <td><b>Price</b></td>
            <td>${selectedPlan?.price || 'N/A'}</td>
          </tr>
          <tr>
            <td><b>Payment Type</b></td>
            <td>${paymentType || 'N/A'}</td>
          </tr>
          <tr>
            <td><b>Amount Paid</b></td>
            <td>${amountPaid || 'N/A'}</td>
          </tr>
          <tr>
            <td><b>Payment Status</b></td>
            <td>${status || 'N/A'}</td>
          </tr>
          <tr>
            <td><b>Remaining Amount</b></td>
            <td>Rs. ${remaining || 'N/A'}</td>
          </tr>
        </table>
        </body>
      </html>
    `;

    // Write the HTML content to the new window
    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();

    // Print the window
    printWindow.print();

    // Close the print window after printing
    printWindow.close();
  };
  const handleSaveAndPrint = () => {
    saveData(); // Call the saveData function to save the data
    printDetails(); // Call the printDetails function to print the data
  };

  return (
    <div className="billing-total">
      <div>
        <ReceptionSidebar />
      </div>
      <div className="billing-right">
        <article>Billing</article>
        <div className="container-fetch-mbl">
          <div>
            <label>
              <span>Date</span>
              <input type="text" value={currentDate} disabled />
            </label>
            <label>
              <span>Bill Number</span>
              <input
                type="text"
                name="bill_number"
                value={billingNumber}
              // placeholder="Bill Number"
              />
            </label>
            {/* <label>
            <span>Enter Mobile Number</span>
            <input
              type="text"
              name="planName"
              value={phoneInput}
              onChange={handlePlanChange1}
              onFocus={() => setFocusedInput1("plan")}
              placeholder="Enter mobile number"
            />
            {isLoading && <div className="loading-fetch-mbl">Loading...</div>}
            {focusedInput1 === "number" && filteredSuggestions1.length > 0 && (
              <div className="suggestions-fetch-mbl">
                {filteredSuggestions1.map((suggestion) => (
                  <p
                    key={suggestion._id}
                    className="suggestion-item-fetch-mbl"
                    onClick={() => handlePlanSelection1(suggestion.mobile_number)}
                  >
                    {suggestion.mobile_number}
                  </p>
                ))}
              </div>
            )}
          </label> */}

            <label>
              <span>Enter Mobile Number</span>
              <input
                type="text"
                name="planName"
                value={phoneInput}
                onChange={handlePlanChange1}
                onFocus={() => setFocusedInput1("plan")}
                placeholder="Enter mobile number"
              />
              {isLoading && <div className="loading-fetch-mbl">Loading...</div>}
              {focusedInput1 === "number" &&
                filteredSuggestions1.length > 0 && (
                  <div
                    className="suggestions-fetch-mbl"
                    style={{
                      position: "absolute",
                      backgroundColor: "white",
                      border: "1px solid #ccc",
                      width: "15%",
                      marginTop: "55px",
                      height: "13vh",
                      overflowY: "auto",
                    }}>
                    {filteredSuggestions1.map((suggestion) => (
                      <p
                        key={suggestion._id}
                        className="suggestion-item-fetch-mbl"
                        onClick={() =>
                          handlePlanSelection1(suggestion.mobile_number)
                        }>
                        {suggestion.mobile_number}
                      </p>
                    ))}
                  </div>
                )}
            </label>

            <label>
              <span>Patient ID</span>
              <input
                type="text"
                value={selectedNumber ? selectedNumber.patient_id : ""}
                disabled
              />
            </label>
            <label>
              <span>Patient Name</span>
              <input
                type="text"
                value={selectedNumber ? selectedNumber.patient_name : ""}
                disabled
              />
            </label>
            <label>
              <span>Address</span>
              <input
                type="text"
                value={selectedNumber ? selectedNumber.address : ""}
                disabled
              />
            </label>
          </div>

          <div>
            <label>
              <span>Franchise Name</span>
              <input
                type="text"
                value={localStorage.getItem("franchisename")}
                disabled
              />
            </label>
            <label>
              <span> Franchise ID</span>
              <input
                type="text"
                value={localStorage.getItem("FranchiseID")}
                disabled
              />
            </label>
          </div>
        </div>

        <div className="billig-below">
          {/* ----------------------doctor selection ------------------ */}
          {/* <h1>Select Doctor:</h1> */}

          <div>
            {/* <input
            type="text"
            name="planName"
            value={planName}
            onChange={handlePlanChange} // Update the planName
            onFocus={() => setFocusedInput("plan")}
            placeholder="enter the plan"
          />
          {isLoading && <div>Loading...</div>}
          {focusedInput === "plan" && filteredSuggestions.length > 0 && (
            <div
              className="overflow-scroll"
              style={{
                position: "absolute",
                backgroundColor: "white",
                border: "1px solid #ccc",
                width: "15%",
              }}>
              {filteredSuggestions.map((suggestion) => (
                <p
                  key={suggestion._id}
                  className="suggestion"
                  onClick={() => handlePlanSelection(suggestion.plan_name)}
                  // Event handler for clicks
                  style={{ cursor: "pointer", padding: "5px" }}>
                  {suggestion.plan_name}
                </p>
              ))}
            </div>
          )} */}
            <table className="plan-table">
              <thead>
                <tr>
                  <th>Select Doctor</th>
                  <th>Plan Name</th>
                  <th>GST</th>
                  <th>Days</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>


                    <select value={selectedDoctor} onChange={handleDoctorChange}>
                      <option value="">Select Doctor</option>
                      {doctors.map((doctor) => (
                        <option key={doctor._id} value={doctor.fullname}>
                          {doctor.fullname}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      className="bill-tplanselecet"
                      type="text"
                      name="planName"
                      value={planName}
                      onChange={handlePlanChange} // Update the planName
                      onFocus={() => setFocusedInput("plan")}
                      placeholder="enter the plan"
                    />
                    {isLoading && <div>Loading...</div>}
                    {focusedInput === "plan" &&
                      filteredSuggestions.length > 0 && (
                        <div
                          className="overflow-scroll"
                          style={{
                            position: "absolute",
                            backgroundColor: "white",
                            border: "1px solid #ccc",
                            width: "25%",
                            height: "13vh",
                            overflowY: "auto",
                          }}>
                          {filteredSuggestions.map((suggestion) => (
                            <p
                              key={suggestion._id}
                              className="suggestion"
                              onClick={() =>
                                handlePlanSelection(suggestion.plan_name)
                              }
                              // Event handler for clicks
                              style={{ cursor: "pointer", padding: "5px" }}>
                              {suggestion.plan_name}
                            </p>
                          ))}
                        </div>
                      )}

                    {/* <input
                    type="text"
                    value={selectedPlan ? selectedPlan.plan_name : ''}
                    disabled
                  /> */}
                  </td>
                  <td>
                    <input
                      type="text"
                      value={selectedPlan ? selectedPlan.GST : ""}
                      disabled
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={selectedPlan ? selectedPlan.days : ""}
                      disabled
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={selectedPlan ? selectedPlan.price : ""}
                      disabled
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="billin-below-1">
            <table className="billing-last-table">
              <thead>
                <tr>
                  <th>Payment type</th>
                  <th>Amount paid</th>
                  <th>Payment Status</th>
                  <th>Remaining Amount: Rs.</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <select
                      value={paymentType}
                      onChange={(e) => setPaymentType(e.target.value)}
                    >
                      <option value="">Select Payment Type</option>
                      <option value="Cash">Cash</option>
                      <option value="Card">Card</option>
                    </select>
                  </td>
                  <td>
                    <input
                      type="number"
                      value={amountPaid}
                      onChange={(e) => setAmountPaid(e.target.value)}
                    />
                  </td>
                  <td>
                    <input value={status} readOnly />
                  </td>
                  <td>
                    <input value={remaining} readOnly />
                  </td>
                </tr>
              </tbody>
            </table>

          </div>

          <button className="btnbilling" onClick={handleSaveAndPrint}>
            Save & Print
          </button>
        </div>
      </div>
    </div>
  );
};

export default Billing;
