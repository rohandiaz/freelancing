import React from 'react';
import './EmployerDashboard.css';

function EmployerDashboard() {
  // Dummy candidate data
  const candidates = [
    { id: 1, name: 'John Doe', skills: 'React, JavaScript, CSS' },
    { id: 2, name: 'Jane Smith', skills: 'Node.js, Express, MongoDB' },
    { id: 3, name: 'Alice Johnson', skills: 'UI/UX Design, Figma, Adobe XD' },
  ];

  return (
    <div className="dashboard-container">
      <h1>Employer Dashboard</h1>
      <p>Here are some candidates matching your required skills:</p>
      <ul className="candidate-list">
        {candidates.map(candidate => (
          <li key={candidate.id}>
            <strong>{candidate.name}</strong> - Skills: {candidate.skills}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmployerDashboard;
