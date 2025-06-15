import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      navigate('/itinerary');
    }
  }, [navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // const response = await fetch('https://aitravelitinerary.onrender.com/api/register/', {
      const response = await fetch('https://127.0.0.1:8000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Signup failed. Try another username.');
      }

      // Auto-navigate to login on success
      navigate('/login');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>Already have an account? <button onClick={() => navigate('/login')}>Login</button></p>
    </div>
  );
};

export default SignupForm;
