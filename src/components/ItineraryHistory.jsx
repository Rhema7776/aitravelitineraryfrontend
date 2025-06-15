import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ItineraryHistory() {
  const [page, setPage] = useState(1);
  const [next, setNext] = useState(null);
  const [previous, setPrevious] = useState(null);

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    // axios.get(`https://aitravelitinerary.onrender.com/api/history/?page=${page}`, {
    axios.get(`https://127.0.0.1:8000/api/history/?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then((response) => {
        setHistory(response.data.results);
        setNext(response.data.next);
        setPrevious(response.data.previous);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to load itinerary history.");
        setLoading(false);
      });
  }, [page]);

  if (loading) return <p>Loading history...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Itinerary History</h2>
      {history.length === 0 ? (
        <p>No itineraries yet.</p>
      ) : (
        <ul>
          {history.map((item) => (
            <li key={item.id}>
              <strong>{item.destination}</strong> - {item.days} days  
              <br />
              Requested at: {new Date(item.created_at).toLocaleString()}
              <br />
              <button onClick={() => alert(item.generated_plan)}>View Full Itinerary</button>
              <hr />
            </li>
          ))}
        </ul>
      )}

      {/* Pagination buttons */}
      <div>
        {previous && <button onClick={() => setPage(page - 1)}>Previous</button>}
        {next && <button onClick={() => setPage(page + 1)}>Next</button>}
      </div>
    </div>
  );
}

export default ItineraryHistory;
