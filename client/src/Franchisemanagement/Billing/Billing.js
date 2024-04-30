import React, { useState, useEffect } from "react";
import axios from "axios";


const Billing = () => {
    const [planName, setPlanName] = useState(""); // User input
    const [suggestions, setSuggestions] = useState([]); // Autosuggest options
    const [isLoading, setIsLoading] = useState(false); // Loading indicator
    const [gst, setGST] = useState(""); // State for GST
    const [price, setPrice] = useState(""); // State for price
    const [days, setDays] = useState(0); // State for price

  
    // Fetch suggestions when the planName changes
    useEffect(() => {
      const fetchSuggestions = async () => {
        if (planName === "") {
          setIsLoading(true);
          const response = await axios.get(
            "http://127.0.0.1:5001/api/treatment-plan",
            {
              params: { planName },
            }
          );
          setSuggestions(response.data); // Store the suggestions
          setIsLoading(false);
        } else {
          setSuggestions([]); // Clear suggestions if plans is empty
        }
      };
  
      const timeoutId = setTimeout(fetchSuggestions, 300); // Debounce
  
      return () => clearTimeout(timeoutId);
    }, [planName]);
  
    const handlePlanChange = (e) => {
      const PlanName = e.target.value;
  
      setPlanName(PlanName); // Update selected plan
      // Find the selected plan in the fetched plans
      const plan = suggestions.find((p) => p.plan_name === PlanName);
  
      if (!plan) {
        setGST(suggestions.GST); // Set GST
        setPrice(suggestions.price); // Set price
      }
    };
  
    // Handle click event on a suggestion
    const handleSuggestionClick = (suggestion) => {
      setPlanName(suggestion.plan_name);
      setGST(suggestion.GST);
      setPrice(suggestion.price);
      setDays(suggestion.days); // Set the input field to the clicked suggestion
      setSuggestions([]); // Clear suggestions after selecting one
    };

    // -----------------------

    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
  
    useEffect(() => {
      const fetchDoctors = async () => {
        try {
          const response = await axios.get("http://127.0.0.1:5001/api/doctors");
          setDoctors(response.data);
        } catch (error) {
          console.error("Error fetching doctors:", error);
        }
      };
  
      fetchDoctors();
    }, []);
  
    return (
      <div style={{ position: "relative" }}>

<div>
      <select
        options={doctors.map(doctor => ({ value: doctor, label: doctor }))}
        value={selectedDoctor}
        onChange={setSelectedDoctor}
      />
    </div>
        <input
          type="text"
          value={planName}
          onChange={handlePlanChange} // Update the planName
          placeholder="enter the plan"
        />
        {isLoading && <div>Loading...</div>}
        {suggestions.length > 0 && (
          <div
            style={{
              position: "absolute",
              backgroundColor: "white",
              border: "1px solid #ccc",
              width: "100%",
            }}>
            {suggestions.map((suggestion) => (
              <p
                value={planName}
                key={suggestion._id}
                onClick={() => handleSuggestionClick(suggestion)} // Event handler for clicks
                style={{ cursor: "pointer", padding: "5px" }}>
                {suggestion.plan_name}
              </p>
            ))}
          </div>
        )}
        {planName && (
          <div>
            <h3>Details of {planName}</h3>
            <p>GST: {gst}</p>
            <p>Days: {days}</p>
            <p>Price: Rs.{price}</p>
          </div>
        )}
      </div>
    );
  };

export default Billing