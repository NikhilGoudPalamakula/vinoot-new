
import React, { useState, useEffect } from 'react';
import { VINOOTNEW } from '../../../Helper/Helper';
import axios from "axios";
import ReceptionSidebar from '../ReceptionSidebar/ReceptionSidebar';
import './Billing.css'


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
  const [remainingAmount, setRemainingAmount] = useState(0);
  // Function to handle doctor selection
  const handleDoctorChange = (e) => {
    setSelectedDoctor(e.target.value); // Update selected doctor
  };

  useEffect(() => {
    fetch(`${VINOOTNEW}/api/doctors`)
      .then(response => response.json())
      .then(doctorsData => {
        console.log('Fetched doctors:', doctorsData);
        setDoctors(doctorsData);
      })
      .catch(error => console.error('Error fetching doctors:', error));
  }, []);

  // -------------------posting of all data ----------------


  const [gst, setGST] = useState(""); // State for GST
  const [price, setPrice] = useState(""); // State for price
  const [days, setDays] = useState(0); // State for price
  const [status, setStatus] = useState(""); // State for payment status


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
  const [bill_number, setBill_number] = useState(false); // Loading indicator

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
  useEffect(() => {
    if (selectedPlan) {
      const { price } = selectedPlan;
      if (amountPaid >= price) {
        setStatus("Paid");
      } else {
        setStatus("Unpaid");
      }
      // Calculate remaining amount
      const remaining = price - amountPaid;
      setRemainingAmount(remaining >= 0 ? remaining : 0); // Ensure remaining amount is non-negative
    }
  }, [amountPaid, selectedPlan]);



  const saveData = async () => {
    try {

      const createdBy = localStorage.getItem("userId");
      const franchiseName = localStorage.getItem("franchisename");
      const FranchiseID = localStorage.getItem("FranchiseID");

      const remaining = price - amountPaid;
      const currentDate = new Date().toISOString().split('T')[0];
      // Send the data to your backend API endpoint for saving
      await axios.post('http://localhost:5001/api/billing', {
        bill_number:bill_number,
        doctor: selectedDoctor,
        plan_name: selectedPlan ? selectedPlan.plan_name : '', // Use selectedPlan.planName
        paymentType: paymentType,
        amountPaid: amountPaid,
        status: status,
        GST: selectedPlan ? selectedPlan.GST : '',
        price: selectedPlan ? selectedPlan.price : '',
        days: selectedPlan ? selectedPlan.days : '',
        createdBy: createdBy,
        franchiseName: franchiseName,
        FranchiseID: FranchiseID,
        remainingAmount: remaining,
        mobile_number: selectedNumber ? selectedNumber.mobile_number : '',
        patient_id: selectedNumber ? selectedNumber.patient_id : '',
        patient_name: selectedNumber ? selectedNumber.patient_name : '',
        address: selectedNumber ? selectedNumber.address : '',
        currentDate: currentDate

      });

      // Optionally, you can reset the form fields after successful save
      setPlanName("");
      setPaymentType("");
      setAmountPaid(0);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };


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
  return (

    <div className='billing-total'>
      <div  >
        <ReceptionSidebar />
      </div>
      <div className='billing-right'>

        <div className="container-fetch-mbl">

          <label  > <input type= "text"
          name= "bill_number"
          value={bill_number}
          placeholder='Bill Number' />  <span>Bill Number</span> </label>
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
          <div className="details-fetch-mbl">
            <label>Mobile Number:</label>
            <input
              type="text"
              value={selectedNumber ? selectedNumber.mobile_number : ''}
              disabled
            />
            <label>Patient ID:</label>
            <input
              type="text"
              value={selectedNumber ? selectedNumber.patient_id : ''}
              disabled
            />
            <label>Patient Name:</label>
            <input
              type="text"
              value={selectedNumber ? selectedNumber.patient_name : ''}
              disabled
            />
            <label>Address:</label>
            <input
              type="text"
              value={selectedNumber ? selectedNumber.address : ''}
              disabled
            />
          </div>
        </div>


        <label>
          <input type="text" value={currentDate} disabled />
          <span>Date</span>
        </label>

        <label>
          <input type="text" value={localStorage.getItem("franchisename")} disabled />
          Franchise Name
        </label>
        <label>
          <input type="text" value={localStorage.getItem("FranchiseID")} disabled />
          Franchise ID
        </label>



        {/* ----------------------doctor selection ------------------ */}
        <h1>Select Doctor:</h1>

        <select value={selectedDoctor} onChange={handleDoctorChange}>
          <option>Select Doctor</option>
          {doctors.map(doctor => (
            <option key={doctor._id} value={doctor._id}>{doctor.username}</option>
          ))}
        </select>


        <div>
          <input
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
                width: "100%",
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
          )}
          <table className="plan-table">
            <thead>
              <tr>
                <th>Plan Name</th>
                <th>GST</th>
                <th>Days</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    value={selectedPlan ? selectedPlan.plan_name : ''}
                    disabled
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={selectedPlan ? selectedPlan.GST : ''}
                    disabled
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={selectedPlan ? selectedPlan.days : ''}
                    disabled
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={selectedPlan ? selectedPlan.price : ''}
                    disabled
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>


        <div>
          <div>
            <p>Payment type</p>
            <select value={paymentType} onChange={(e) => setPaymentType(e.target.value)}>
              <option value="">Select Payment Type</option>
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
            </select>
          </div>
          <div>
            <p>Amount paid</p>
            <input type="number" value={amountPaid} onChange={(e) => setAmountPaid(e.target.value)} />
          </div>
          <div>
            <p>Status: {status}</p>
          </div>
          <div>
            <p>Remaining amount: Rs.{remainingAmount}</p>
          </div>
        </div>


        <button className='btnbilling' onClick={saveData}>Save</button>
      </div>
    </div>
  );
}

export default Billing;



