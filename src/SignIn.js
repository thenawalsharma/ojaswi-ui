import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const baseUrl = process.env.REACT_APP_API_BASE_URL;
const SignIn = () => {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const response = await axios.post(`{baseUrl}/user/signin`, {
        emailAddress,
        password
      });

      const { token, name, userId } = response.data;

      // ✅ Store token in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', name);
      localStorage.setItem('userId', userId);

      // ✅ Redirect to dashboard or home
      //navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setMessage('Invalid credentials ❌');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '400px' }}>
      <h2>Sign In</h2>
      {message && <div className="alert alert-danger">{message}</div>}
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            value={emailAddress}
            onChange={(e) => setEmailAddress(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="text-center mt-3">
        Don't have an account? <Link to="/signup">Sign up</Link>
      </div>
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
};

export default SignIn;
