import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../css/LoginForm.css'

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('Name:', name, 'Value:', value);
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://127.0.0.1:8000/api/users/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
  
      if (response.ok) {
        console.log('Login successfully');
        const userData = await response.json();
        console.log(userData);
        localStorage.setItem('authorization', userData.authorization);
        localStorage.setItem('currentuser', userData.currentuser)
        
        if (userData.isAdmin) {
          window.location.href = 'http://127.0.0.1:8000/admin/';
        } else {
          navigate('/files');
        }
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (error) {
      setError('An unexpected error occurred during login.');
      console.error('Error during login:', error);
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          name="username"
          className="input-field-login-form"
          type="text"
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        Password:
        <input
          name="password"
          className="input-field-login-form"
          type="password"
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <button type="submit" className="submit-button">Login</button>
      {error && <div className="error-message">{error}</div>}
    </form>
  );
};


export default LoginForm;
