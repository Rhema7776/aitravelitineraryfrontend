// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const ItineraryForm = () => {
//   const navigate = useNavigate();

//   const [destination, setDestination] = useState('');
//   const [days, setDays] = useState(1);
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleLogout = () => {
//     localStorage.removeItem('access_token');
//     localStorage.removeItem('refresh_token');
//     navigate('/login');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setResult(null);
//     setError('');

//     const accessToken = localStorage.getItem('access_token');
//     if (!accessToken) {
//       setError("You are not logged in. Please login again.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await fetch('http://127.0.0.1:8000/api/itinerary/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${accessToken}`,
//         },
//         body: JSON.stringify({ destination, days }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to generate itinerary. Make sure you are logged in.');
//       }

//       const data = await response.json();
//       setResult(data);
//       setDestination('');
//       setDays(1);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded-lg">
//       <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Generate Travel Itinerary</h2>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           placeholder="Destination"
//           value={destination}
//           onChange={(e) => setDestination(e.target.value)}
//           required
//           className="w-full px-4 py-2 border rounded"
//         />

//         <input
//           type="number"
//           min="1"
//           value={days}
//           onChange={(e) => setDays(e.target.value)}
//           required
//           className="w-full px-4 py-2 border rounded"
//         />

//         <button
//           type="submit"
//           disabled={loading}
//           className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50 flex items-center justify-center gap-2"
//         >
//           {loading ? (
//             <>
//               <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
//               Generating...
//             </>
//           ) : (
//             'Generate'
//           )}
//         </button>

//         {error && <p className="text-red-500 text-sm">{error}</p>}
//       </form>

//       {result && (
//         <div key={result.id || Date.now()} className="mt-6 p-4 bg-gray-50 border rounded">
//           <h3 className="text-xl font-semibold mb-2">
//             Itinerary for {result.destination} ({result.days} day{result.days > 1 ? 's' : ''})
//           </h3>
//           <p className="text-gray-600 text-sm mb-2">
//             <strong>Generated:</strong> {new Date(result.created_at).toLocaleString()}
//           </p>
//           <pre className="whitespace-pre-wrap text-sm bg-gray-100 p-3 rounded">
//             {result.generated_plan}
//           </pre>
//         </div>
//       )}

//       <div className="mt-6 flex justify-between">
//         <button
//           onClick={handleLogout}
//           className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//         >
//           Logout
//         </button>

//         <button
//           onClick={() => navigate('/history')}
//           className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//         >
//           View Past Itineraries
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ItineraryForm;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ItineraryForm() {
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState(1);
  const [generatedPlan, setGeneratedPlan] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGenerate = async (e) => {
    e.preventDefault();
    setError('');
    setGeneratedPlan('');

    const token = localStorage.getItem('access_token');

    if (!token) {
      setError('You must be logged in to generate an itinerary.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/itinerary/', {
      // const response = await fetch('https://aitravelitinerary.onrender.com/api/itinerary/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          destination,
          days: parseInt(days),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate itinerary. Make sure you are logged in.');
      }

      const data = await response.json();
      setGeneratedPlan(data.generated_plan);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
  };

  return (
    <div>
      <h2>Generate Travel Itinerary</h2>
      <form onSubmit={handleGenerate}>
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          required
        /><br />
        <input
          type="number"
          min="1"
          placeholder="Days"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          required
        /><br />
        <button type="submit" style={{ background: '#007bff', color: '#fff', padding: '10px', width: '100%' }}>
          Generate
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {generatedPlan && (
        <div>
          <h3>Generated Itinerary</h3>
          <p>{generatedPlan}</p>
        </div>
      )}

      <br />
      <button onClick={handleLogout}>Logout</button>
      <button onClick={() => navigate('/history')}>View Past Itineraries</button>
    </div>
  );
}

export default ItineraryForm;
