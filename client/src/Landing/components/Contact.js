
import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import './Contact.css';
import { VT_URL } from '../../../Helper/Helper';
import BackButton from '../../Login/BackButton';


const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [branch, setBranch] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to your backend server with the form data
      const response = await axios.post(`${VT_URL}/api/Contact `, {
        name,
        email,
        branch,
        message,
      });

      setName('');
      setEmail('');
      setBranch('');
      setMessage('');
      
      window.alert('Submitted Succesfully');
      console.log('Server Response:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (

    <div className='cont-container'>
      <BackButton />
      <div className='contact-total'>
        <form className='landing-contact-form'>

          <h1>Contact Us</h1>
          <div>
            <label className='label-name1' htmlFor='name'>Name</label>
            <input className='input-field1' type='text' id='name' name='name' value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div>
            <label className='label-name1' htmlFor='email'>Email</label>
            <input className='input-field1' type='email' id='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div>
            <label className='label-name1' htmlFor='branch'>Branch</label>
            <input className='input-field1' type='branch' id='branch' name='branch' value={branch} onChange={(e) => setBranch(e.target.value)} />
          </div>

          <div>
            <label className='label-name1' htmlFor='message'>Message</label>
            <textarea className='text-contact1' id='message' name='message' value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>

          <button type='submit' className='con-btn' onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;