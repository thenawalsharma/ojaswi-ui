import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';


const baseUrl = process.env.REACT_APP_API_BASE_URL;
const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    userName: '',
    lastName: '',
    phone1: '',
    altPhoneNumber: '',
    emailAddress: '',
    address: '',
    password: '',
    createdBy: 'System'
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await axios.post(`${baseUrl}/User/sign-up`, formData); // 🔁 Change to your API URL
      setMessage('User registered successfully! ✅');
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data || 'Signup failed ❌');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <h2 className="mb-4">Sign Up</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            <input type="text" name="firstName" className="form-control mb-2" placeholder="First Name" onChange={handleChange} required />
          </div>
          <div className="col">
            <input type="text" name="lastName" className="form-control mb-2" placeholder="Last Name" onChange={handleChange} />
          </div>
        </div>
         <input type="text" name="userName" className="form-control mb-2" placeholder="UserName" onChange={handleChange} required />
        <input type="text" name="phone1" className="form-control mb-2" placeholder="Phone Number" onChange={handleChange} required />
        <input type="text" name="altPhoneNumber" className="form-control mb-2" placeholder="Alternate Phone" onChange={handleChange} />
        <input type="email" name="emailAddress" className="form-control mb-2" placeholder="Email" onChange={handleChange} required />
        <input type="text" name="address" className="form-control mb-2" placeholder="Address" onChange={handleChange} />
        <input type="password" name="password" className="form-control mb-2" placeholder="Password" onChange={handleChange} required />
        <p className="mt-3">
            Already have an account? <Link to="/login">Sign In</Link>
        </p>
        <button type="submit" className="btn btn-primary w-100">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
