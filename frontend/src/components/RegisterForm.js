import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = ({ onRegister, onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate passwords match
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }

    try {
      // First register the user
      const registerResponse = await axios.post('http://localhost:8080/auth/register', {
        email,
        password
      });
      
      if (registerResponse.status === 200) {
        // Automatically log in the user after successful registration
        try {
          const loginResponse = await axios.post('http://localhost:8080/auth/login', {
            email,
            password
          });
          
          if (loginResponse.data && loginResponse.data.token) {
            localStorage.setItem('token', loginResponse.data.token);
            alert('Registration successful! Welcome to Task Manager!');
            onRegister(); // This will log the user in and go to dashboard
          } else {
            alert('Registration successful! Please login.');
            onSwitchToLogin();
          }
        } catch (loginErr) {
          console.error('Auto-login failed:', loginErr);
          alert('Registration successful! Please login.');
          onSwitchToLogin();
        }
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        alert('Registration failed: ' + err.response.data.message);
      } else {
        alert('Error connecting to backend');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2 style={{ textAlign: 'center', color: '#1677f5' }}>Register</h2>
      
      <div style={inputGroup}>
        <label style={labelStyle}>Email</label>
        <input 
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
          required
        />
      </div>
      
      <div style={inputGroup}>
        <label style={labelStyle}>Password</label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
          required
          minLength="6"
        />
      </div>
      
      <div style={inputGroup}>
        <label style={labelStyle}>Confirm Password</label>
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={inputStyle}
          required
          minLength="6"
        />
      </div>
      
      <button type="submit" style={buttonStyle}>Register</button>
      
      <div style={{ textAlign: 'center', marginTop: '15px' }}>
        <span style={{ color: '#666' }}>Already have an account? </span>
        <button 
          type="button" 
          onClick={onSwitchToLogin}
          style={linkButtonStyle}
        >
          Login here
        </button>
      </div>
    </form>
  );
};

const formStyle = {
  maxWidth: '400px',
  margin: '50px auto',
  padding: '50px',
  borderRadius: '10px',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#fff',
};

const inputGroup = {
  marginBottom: '20px',
};

const labelStyle = {
  display: 'block',
  marginBottom: '8px',
  fontWeight: 'bold',
  color: '#333',
};

const inputStyle = {
  width: '80%',
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  fontSize: '16px',
  display: 'block',
  margin: '0 auto',
};

const buttonStyle = {
  width: '92%',
  padding: '10px',
  backgroundColor: '#1677f5',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  fontSize: '16px',
  cursor: 'pointer',
  display: 'block',
  margin: '20px auto 0 auto',
};

const linkButtonStyle = {
  background: 'none',
  border: 'none',
  color: '#1677f5',
  cursor: 'pointer',
  textDecoration: 'underline',
  fontSize: '14px',
};

export default RegisterForm;
