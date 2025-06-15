// import React from 'react';
// import ItineraryForm from './components/ItineraryForm';

// function App() {
//   return (
//     <div className="App">
//       <h1>AI Travel Planner</h1>
//       <ItineraryForm />
//     </div>
//   );
// }

// export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import ItineraryForm from './components/ItineraryForm';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<ItineraryForm />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ItineraryForm from './components/ItineraryForm';
import LoginForm from './components/LoginForm';
import PrivateRoute from './components/PrivateRoute';
import ItineraryHistory from './components/ItineraryHistory';
import SignupForm from './components/SignUpForm';

function App() {
  
  
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/login" element={<LoginForm />} />
        <Route
          path="/itinerary"
          element={
            <PrivateRoute>
              <ItineraryForm />
            </PrivateRoute>
          }
        />
        {/* Only allow access to itinerary page if authenticated */}
        <Route
          path="/history"
          element={
            <PrivateRoute>
              <ItineraryHistory />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import ItineraryForm from './components/ItineraryForm';
// import ItineraryHistory from './components/ItineraryHistory';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<ItineraryForm />} />
//         <Route path="/history" element={<ItineraryHistory />} />
//       </Routes>
//     </Router>
//   );
// }

