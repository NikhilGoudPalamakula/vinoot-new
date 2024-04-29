import React, { useState,useEffect } from 'react';
// import './PatientForm.css';
import axios from 'axios';
import { VINOOTNEW } from '../../Helper/Helper';
function PatientForm() {
    const [states, setStates] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dob: '',
    gender: '',
    mobileNumber: '',
    state: '',
    city: '',
    area: '',
    address: ''
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true); // Set submitting state to true
    try {
      const response = await axios.post('/api/patients', formData);
      console.log(response.data);
      alert('Form submitted successfully'); // Show success alert
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Form submission failed'); // Show error alert
    } finally {
      setSubmitting(false); // Reset submitting state after form submission
    }
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setFormData({ ...formData, state: selectedState, city: '' });
  };

//   -----------------

// Inside the useEffect hook in PatientForm component
// useEffect(() => {
//     const fetchSuggestions = async () => {
//       if (states !== "") { // Check if state is not empty
//         setIsLoading(true);
//         try {
//           const response = await axios.get(
//             // `${VINOOTNEW}/api/suggeststates`,
//             `http://127.0.0.1:5001/api/suggeststates`,
//             {
//               params: { query: states }, // Send query parameter
//             }
//           );
//           setSuggestions(response.data); // Store the suggestions
//         } catch (error) {
//           console.error('Error fetching state suggestions:', error);
//           // Handle error if needed
//         } finally {
//           setIsLoading(false);
//         }
//       } else {
//         setSuggestions([]); // Clear suggestions if states is empty
//       }
//     };

//     const timeoutId = setTimeout(fetchSuggestions, 300); // Debounce

//     return () => clearTimeout(timeoutId);
//   }, [states]);

// Inside the useEffect hook in PatientForm component

useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${VINOOTNEW}/api/suggeststates`, {
          params: { query: states },
        });
        setSuggestions(response.data);
      } catch (error) {
        console.error('Error fetching state suggestions:', error);
        // Handle error if needed
      } finally {
        setIsLoading(false);
      }
    };
  
    if (states.trim() !== '') {
      fetchSuggestions();
    } else {
      setSuggestions([]); // Clear suggestions if states is empty
    }
  }, [states]);
  


  const handleSuggestionClick = (suggestion) => {
    setStates(suggestion.state_name); // Update states state variable
    setSuggestions([]); // Clear suggestions after selecting one
};

  return (
    <form className="patient-form" onSubmit={handleSubmit}>
        <h2>ADD PATIENT</h2>
        <div className='total2'>
        <div className='inp'>
      <label>
        Patient Name:
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <label>
        Date of Birth:
        <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
      </label>
      <label>
        Gender:
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="">Select</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </label>
      <label>
        Mobile Number:
        <input type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} />
      </label>
      </div>
      <div className='inp2'>
        <p>State</p>

    {/* {isLoading && <div>Loading...</div>}
      {suggestions.length > 0 && (
        <div  className='statesfetch'>
          {suggestions.map((suggestion) => (
            <p
              value={states}
              key={suggestion._id}
              onClick={() => handleSuggestionClick(suggestion)} // Event handler for clicks
              style={{ cursor: "pointer", padding: "15px" }}>
              {suggestion.state_name}
            </p>
          ))}
        </div>
      )} */}
        {/* <p>City</p> */}
        {/* <p>Area</p> */}

        {isLoading && <div>Loading...</div>}
{!isLoading && suggestions.length > 0 && (
  <div className="suggestion-container">
    {suggestions.map((suggestion) => (
      <div
        key={suggestion._id} // Assuming _id is the unique identifier for a state
        onClick={() => handleSuggestionClick(suggestion)}
        className="suggestion-item">
        {suggestion.name} {/* Assuming name is the field to display */}
      </div>
    ))}
  </div>
)}




      <label>
        Address:
        <textarea name="address" value={formData.address} onChange={handleChange} />
      </label>
      </div>
      </div>
      <button className='btn2' type="submit" disabled={submitting}>
        {submitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}

export default PatientForm;