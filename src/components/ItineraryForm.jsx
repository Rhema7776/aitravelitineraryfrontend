import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ItineraryForm = () => {
  const navigate = useNavigate();

  const [destination, setDestination] = useState('');
  const [days, setDays] = useState(1);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setError('');

    // ✅ Check if offline before continuing
    if (!navigator.onLine) {
      setError("You're offline. Please reconnect to the internet.");
      return;
    }

    const accessToken = localStorage.getItem('access_token');
    //Validating  token before making request
    if (!accessToken || accessToken === 'undefined') {
      setError("You are not logged in. Please login again.");
      setLoading(false);
      navigate('/login');
      return;
    }
    
    // if (!accessToken || accessToken === 'undefined') {
    //   setError("Invalid or missing token. Please log in again.");
    //   return;
    // }
    // if (!accessToken) {
    //   setError("You are not logged in. Please login again.");
    //   setLoading(false);
    //   return;
    // }

    try {
      const response = await fetch('https://aitravelitinerary.onrender.com/api/itinerary/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ destination, days }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate itinerary.');
      }

      const data = await response.json();
      setResult(data);
      setDestination('');
      setDays(1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Generate Travel Itinerary</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded"
        />

        <input
          type="number"
          min="1"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
              Generating...
            </>
          ) : (
            'Generate'
          )}
        </button>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>

      {result && (
        <div key={result.id || Date.now()} className="mt-6 p-4 bg-gray-50 border rounded">
          <h3 className="text-xl font-semibold mb-2">
            Itinerary for {result.destination} ({result.days} day{result.days > 1 ? 's' : ''})
          </h3>
          <p className="text-gray-600 text-sm mb-2">
            <strong>Generated:</strong> {new Date(result.created_at).toLocaleString()}
          </p>
          <pre className="whitespace-pre-wrap text-sm bg-gray-100 p-3 rounded">
            {result.generated_plan}
          </pre>
        </div>
      )}

      <div className="mt-6 flex justify-between">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>

        <button
          onClick={() => navigate('/history')}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          View Past Itineraries
        </button>
      </div>
    </div>
  );
};

export default ItineraryForm;
