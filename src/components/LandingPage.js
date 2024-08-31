import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    if (role === 'employer') {
      navigate('/employer');
    } else if (role === 'employee') {
      navigate('/employee');
    }
  };

  return (
    <div className="landing-container">
      <h1>Welcome to the Freelancing Platform</h1>
      <p>Select your role to continue:</p>
      <div className="role-selection">
        <div className="role-box" onClick={() => handleRoleSelection('employer')}>
          <h2>Employer</h2>
        </div>
        <div className="role-box" onClick={() => handleRoleSelection('employee')}>
          <h2>Employee</h2>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
