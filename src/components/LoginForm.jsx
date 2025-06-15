import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
 
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    try {
      // const response = await fetch('https://127.0.0.1:8000/api/token/', {
      const response = await fetch('https://aitravelitinerary.onrender.com/api/token/', {
      
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        throw new Error('Invalid credentials');
      }
  
      const data = await response.json();
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
  
      // //redirect to the itinerary form after successful login
      // navigate('/itinerary');
      // ✅ Slight delay to ensure storage sync before navigation
      setTimeout(() => {
        navigate('/itinerary');
      }, 100); // 100 milliseconds

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <button type="submit">Login</button>

        <p>New user? <button onClick={() => navigate('/signup')}>Sign up here</button></p>

      </form>
    </div>
  );
}

export default LoginForm;
