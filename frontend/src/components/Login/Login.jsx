import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { authState } from '../../recoil/authState';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [auth, setAuth] = useRecoilState(authState);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {   
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, {
        email,
        password
      });
      const { token, userId, userName } = response.data;
      localStorage.setItem('token', token);
      setAuth({ isAuthenticated: true, token, loggedInUser: userId, loggedInUserName: userName });
      navigate('/');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
      console.error(err.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="forgot-password">
        <Link to="/forgot-password">Forgot Password?</Link>
      </div>
    </div>
  );
};

export default Login;
