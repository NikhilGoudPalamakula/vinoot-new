import React, { useState, useEffect, useRef } from "react";
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
  const [patientError, setPatientError] = useState(""); // Error message for unregistered mobile number

  // Fetch suggestions when the component mounts
  const [patients, setPatients] = useState([]);
  useEffect(() => {
    const fetchNumbers = async () => {
      setIsLoading(true);
      try {
        const frid = localStorage.getItem("franchiseID");
        if (frid) {
          const response = await axios.get(`${VINOOTNEW}/api/patients${frid}`);
          setPatients(response.data);
          const mobileNumberSet = new Set();
          response.data.forEach((patient) => {
            mobileNumberSet.add(patient.mobile_number); // Add mobile number to the set
          });

          setSuggestions1(mobileNumberSet);
          setFilteredSuggestions1(mobileNumberSet);
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
        setSelectedNumber(null); // Reset selected number
        setPatientError(""); // Clear patient error
      } else {
        const filtered = patients.filter((patient) =>
          patient.mobile_number.includes(phoneInput)
        );

        setFilteredSuggestions1(filtered);

        // Clear patient details if the input doesn't match any suggestions
        if (
          phoneInput.trim() !== "" &&
          !filtered.some((suggestion) =>
            suggestion.mobile_number.includes(phoneInput)
          )
        ) {
          setSelectedNumber(null);
          setPatientError(
            "Mobile number not registered. Please add the patient."
          );
        } else {
          setPatientError("");
        }
      }
    };
    filterSuggestions();
  }, [phoneInput, patients, suggestions1]);

  const handlePlanChange1 = (e) => {
    const newPhoneInput = e.target.value;
    const previousPhoneInput = phoneInput;

    // Update the phoneInput state with the new value
    setPhoneInput(newPhoneInput);

    // Clear patient details if the new input value is shorter than the previous value
    if (newPhoneInput.length < previousPhoneInput.length) {
      setAdditionalField(false);
      setSelectedNumber(null);
      setPatient_id("");
      setPatient_name("");
      setAddress("");
    }

    setFocusedInput1("number");
  };
  // Step 1: Identify duplicate mobile numbers
  const mobileNumberMap = {};
  patients.forEach((patient) => {
    if (mobileNumberMap[patient.mobile_number]) {
      mobileNumberMap[patient.mobile_number].push(patient);
    } else {
      mobileNumberMap[patient.mobile_number] = [patient];
    }
  });
  // Step 2: Create a state to manage additional patient name selection
  const [additionalField, setAdditionalField] = useState(false);
  const [patientSuggestions, setPatientSuggestions] = useState([]);
  const [patientName, setPatientName] = useState("");

  const handlePlanSelection1 = (mobileNumber) => {
    // Step 2: Check if this mobile number has multiple associated patients
    const associatedPatients = mobileNumberMap[mobileNumber] || [];

    if (associatedPatients.length > 1) {
      const selectedPatient = associatedPatients[0];
      // Multiple patients with this mobile number
      setSelectedNumber(null); // Reset the selected patient
      setPatientError(""); // Reset error message
      setPhoneInput(selectedPatient.mobile_number); // Set the mobile number
      setAdditionalField(true); // Toggle visibility for additional patient name selection
      setPatientSuggestions(associatedPatients); // Set suggestions for the patient name field
    } else {
      // Only one patient with this mobile number
      const selectedPatient = associatedPatients[0];
      setSelectedNumber(selectedPatient); // Select the patient
      setPhoneInput(selectedPatient.mobile_number); // Set the mobile number
      setPatientError(""); // Clear patient error
      setAdditionalField(false); // Hide additional patient name selection
    }
    // Handle cases where mobile number has only one associated patient
    if (selectedNumber && additionalField === false) {
      // Fill patient details when only one patient is associated with the selected mobile number
      setPatient_id(selectedNumber.patient_id);
      setPatient_name(selectedNumber.patient_name);
      setAddress(selectedNumber.address);
    } else {
      setPatient_id("");
      setPatient_name("");
      setAddress("");
    }
  };
  // Function to handle patient name selection
  const handlePatientNameSelection = (patient) => {
    setSelectedNumber(patient); // Set the selected patient
    setPhoneInput(patient.mobile_number); // Set the mobile number
    setAdditionalField(false); // Hide the additional field
  };

  // -------------------Doctor details fetch ---------------
  const [doctors, setDoctors] = useState([]);
  const [paymentType, setPaymentType] = useState("Cash"); // State for payment type
  const [amountPaid, setAmountPaid] = useState(0); // State for amount paid

  const [selectedDoctor, setSelectedDoctor] = useState(""); // State for selected doctor

  // Function to handle doctor selection
  const handleDoctorChange = (e) => {
    const selectedDoctorId = e.target.value; // Get the selected doctor's ID
    // const selectedDoctor = doctors.find(doctor => doctor._id === selectedDoctorId); // Find the doctor object based on the ID
    // setSelectedDoctor(selectedDoctorId);

    setSelectedDoctor(selectedDoctorId);
    // Disable therapist selection
    setSelectedTherapist("");
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const frid = localStorage.getItem("franchiseID");
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

  // -------------------fetching therspits------------
  const [therapists, setTherapists] = useState([]);
  const [selectedTherapist, setSelectedTherapist] = useState(""); // State for selected doctor

  // Function to handle doctor selection
  const handleTherapistChange = (e) => {
    const selectedTherapistId = e.target.value; // Get the selected doctor's ID
    // const selectedTherapist = therapists.find(therapist => therapist._id === selectedTherspistId); // Find the doctor object based on the ID
    // setSelectedTherapist(selectedTherapistId);

    setSelectedTherapist(selectedTherapistId);
    // Disable doctor selection
    setSelectedDoctor("");
  };

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const frid = localStorage.getItem("franchiseID");
        if (frid) {
          const response = await axios.get(
            `http://localhost:5001/api/franchisefetchusers/${frid}`
          );
          // Filter doctors from the response data
          const therapitsList = response.data.filter(
            (admin) => admin.designation === "Therapist"
          );
          setTherapists(therapitsList);
        } else {
          console.error("FranchiseID not found in localStorage");
        }
      } catch (error) {
        console.error("Error fetching Therapists:", error);
      }
    };

    fetchTherapists();
  }, []);

  // -------------------posting of all data ----------------

  const [gst, setGST] = useState("");
  const [price, setPrice] = useState("");
  const [days, setDays] = useState(0);
  const [GSTamount, setGSTamount] = useState("");
  const [TotalAmount, setTotalAmount] = useState("");
  const [status, setStatus] = useState("");
  const [remaining, setRemainingAmount] = useState(0);
  const [planName, setPlanName] = useState("");
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [suggestions, setSuggestions] = useState([]); // Autosuggest options
  const [filteredSuggestions, setFilteredSuggestions] = useState([]); // Filtered suggestions based on input
  const [focusedInput, setFocusedInput] = useState(null);
  const [focusedInput2, setFocusedInput2] = useState(null);
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

  // Ref for suggestion box
  const suggestionBoxRef = useRef(null);

  // Function to handle click outside suggestion box
  const handleClickOutside = (event) => {
    if (
      suggestionBoxRef.current &&
      !suggestionBoxRef.current.contains(event.target)
    ) {
      // Clicked outside the suggestion box
      setFocusedInput1(null); // Reset focus for other input fields
      // setFocusedInput2(null); // Reset focus for the additional field
    }
  };

  // Add event listener for clicks outside the suggestion box
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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

  useEffect(() => {
    if (selectedPlan) {
      const TotalAmount = parseFloat(selectedPlan.TotalAmount);
      const amountPaidValue = parseFloat(amountPaid);
      const remaining = TotalAmount - amountPaidValue;
      setRemainingAmount(remaining);

      // Determine payment status
      if (amountPaidValue >= TotalAmount) {
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

  const [installments, setInstallments] = useState([]);
  const saveData = async () => {
    const newBillNumber = generateBillNumber(bill_numbers);
    setBillingNumber(newBillNumber);
    try {
      const createdBy = localStorage.getItem("userId");
      const franchiseName = localStorage.getItem("franchisename");
      const franchiseID = localStorage.getItem("franchiseID");
      const remaining = selectedPlan
        ? parseFloat(selectedPlan.TotalAmount) - parseFloat(amountPaid)
        : 0; // Calculate remaining
      const currentDate = new Date().toISOString().split("T")[0];

      // Determine payment status
      const paymentStatus = amountPaid >= price ? "Paid" : "Unpaid";

      // Send the data to the backend API endpoint for saving
      await axios.post("http://localhost:5001/api/billing", {
        bill_number: newBillNumber, // Use the newly generated bill number
        doctor: selectedDoctor,
        therapist: selectedTherapist,
        plan_name: selectedPlan ? selectedPlan.plan_name : "",
        paymentType: paymentType,
        amountPaid: amountPaid,
        status: amountPaid >= selectedPlan.price ? "Paid" : "Unpaid",
        GST: selectedPlan ? selectedPlan.GST : "",
        price: selectedPlan ? selectedPlan.price : "",
        days: selectedPlan ? selectedPlan.days : "",
        GSTamount: selectedPlan ? selectedPlan.GSTamount : "",
        TotalAmount: selectedPlan ? selectedPlan.TotalAmount : "",
        createdBy: createdBy,
        franchiseName: franchiseName,
        franchiseID: franchiseID,
        remainingAmount: remaining,
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
      const frid = localStorage.getItem("franchiseID");

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
          /* Define table styles */
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
        </style>
      </head>
      <body>
        <h1>Billing Details</h1>
        <table>
         
          <tr>
            <td>Date</td>
            <td>${currentDate}</td>
          </tr>
          <tr>
            <td>Bill Number</td>
            <td>${billingNumber}</td>
          </tr>
          <tr>
            <td>Mobile Number</td>
            <td>${selectedNumber ? selectedNumber.mobile_number : ""}</td>
          </tr>
          <tr>
            <td>Patient ID</td>
            <td>${selectedNumber ? selectedNumber.patient_id : ""}</td>
          </tr>
          <tr>
            <td>Patient Name</td>
            <td>${selectedNumber ? selectedNumber.patient_name : ""}</td>
          </tr>
          <tr>
            <td>Address</td>
            <td>${selectedNumber ? selectedNumber.address : ""}</td>
          </tr>
          <tr>
            <td>Franchise Name</td>
            <td>${localStorage.getItem("franchisename")}</td>
          </tr>
          <tr>
            <td>Franchise ID</td>
            <td>${localStorage.getItem("franchiseID")}</td>
          </tr>
          <tr>
            <td>Selected Doctor</td>
            <td>${selectedDoctor}</td>
          </tr>
          <tr>
            <td>Plan Name</td>
            <td>${planName}</td>
          </tr>
          <tr>
            <td>Days</td>
            <td>${selectedPlan?.days || "N/A"}</td>
          </tr>
          <tr>
            <td>Price</td>
            <td>${selectedPlan?.price || "N/A"}</td>
          </tr>
          <tr>
          <td>GST</td>
          <td>${selectedPlan?.GST || "N/A"}</td>
        </tr>
        <tr>
        <td>GST</td>
        <td>${selectedPlan?.GSTamount || "N/A"}</td>
      </tr>
          <tr>
            <td>Price</td>
            <td>${selectedPlan?.TotalAmount || "N/A"}</td>
          </tr>
          <tr>
            <td>Payment Type</td>
            <td>${paymentType || "N/A"}</td>
          </tr>
          <tr>
            <td>Amount Paid</td>
            <td>${amountPaid || "N/A"}</td>
          </tr>
          <tr>
            <td>Payment Status</td>
            <td>${status || "N/A"}</td>
          </tr>
          <tr>
            <td>Remaining Amount</td>
            <td>Rs. ${remaining || "N/A"}</td>
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
                readOnly
                // placeholder="Bill Number"
              />
            </label>

            <label>
              <span>
                Enter Mobile Number <span style={{ color: "red" }}>*</span>
              </span>
              <input
                type="text"
                name="planName"
                value={phoneInput}
                onChange={handlePlanChange1}
                onFocus={() => setFocusedInput1("plan")}
                placeholder="Enter mobile number"
              />
              {patientError ? (
                <div style={{ color: "red", fontSize: "0.8rem" }}>
                  {patientError}
                </div>
              ) : (
                isLoading && <div className="loading-fetch-mbl">Loading...</div>
              )}
              {focusedInput1 === "number" &&
                filteredSuggestions1.length > 0 && (
                  <div
                    ref={suggestionBoxRef}
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
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          handlePlanSelection1(suggestion.mobile_number)
                        }>
                        {suggestion.mobile_number}
                      </p>
                    ))}
                  </div>
                )}
            </label>
            {additionalField && (
              <label>
                <span>Select Patient Name</span>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  onFocus={() => setFocusedInput2("patientName")}
                  placeholder="Select patient name"
                />
                {focusedInput2 === "patientName" && (
                  <div
                    ref={suggestionBoxRef}
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
                    {patientSuggestions
                      .filter((patient) =>
                        patient.patient_name
                          .toLowerCase()
                          .includes(patientName.toLowerCase())
                      )
                      .map((patient) => (
                        <p
                          key={patient.patient_id}
                          className="suggestion-item-fetch-mbl"
                          style={{ cursor: "pointer" }}
                          onClick={() => handlePatientNameSelection(patient)}>
                          {patient.patient_name}
                        </p>
                      ))}
                  </div>
                )}
              </label>
            )}

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
                value={localStorage.getItem("franchiseID")}
                disabled
              />
            </label>
          </div>
        </div>

        <div className="billig-below">
          {/* ----------------------doctor selection ------------------ */}
          {/* <h1>Select Doctor:</h1> */}

          <div>
            <table className="plan-table">
              <thead>
                <tr>
                  <th>
                    Select Doctor <span style={{ color: "red" }}>*</span>
                  </th>
                  <th>
                    Plan Name <span style={{ color: "red" }}>*</span>
                  </th>
                  <th>GST</th>
                  <th>GST Amount</th>
                  <th>Days</th>
                  <th>Price</th>
                  <th>Total Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {/* <select value={selectedDoctor} onChange={handleDoctorChange}>
                      <option value="">Select Doctor</option>
                      {doctors.map((doctor) => (
                        <option key={doctor._id} value={doctor.fullname}>
                          {doctor.fullname}
                        </option>
                      ))}
                    </select> */}

                    <select
                      value={selectedDoctor}
                      onChange={handleDoctorChange}
                      disabled={selectedTherapist !== ""}>
                      <option value="">Select Doctor</option>
                      {doctors.map((doctor) => (
                        <option key={doctor._id} value={doctor.fullname}>
                          {doctor.fullname}
                        </option>
                      ))}
                    </select>
                    {/* <select value={selectedTherapist} onChange={handleTherapistChange}>
                      <option value="">Select therapist</option>
                      {therapists.map((therapist) => (
                        <option key={therapist._id} value={therapist.fullname}>
                          {therapist.fullname}
                        </option>
                      ))}
                    </select> */}

                    <select
                      value={selectedTherapist}
                      onChange={handleTherapistChange}
                      disabled={selectedDoctor !== ""}>
                      <option value="">Select Therapist</option>
                      {therapists.map((therapist) => (
                        <option key={therapist._id} value={therapist.fullname}>
                          {therapist.fullname}
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
                      value={selectedPlan ? selectedPlan.GSTamount : ""}
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
                  <td>
                    <input
                      type="text"
                      value={selectedPlan ? selectedPlan.TotalAmount : ""}
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
                  <th>
                    Payment type <span style={{ color: "red" }}>*</span>
                  </th>
                  <th>
                    Amount paid <span style={{ color: "red" }}>*</span>
                  </th>
                  <th>Payment Status</th>
                  <th>Remaining Amount: Rs.</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <select
                      value={paymentType}
                      onChange={(e) => setPaymentType(e.target.value)}>
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
