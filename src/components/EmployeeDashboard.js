import React, { useState } from 'react';
import './EmployeeDashboard.css';

function EmployeeDashboard() {
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [jobs, setJobs] = useState([]);

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeUploaded(true);

      // Dummy job data based on resume (In reality, you would extract skills and fetch relevant jobs)
      const matchedJobs = [
        { id: 1, title: 'Frontend Developer' },
        { id: 2, title: 'Backend Developer' },
        { id: 3, title: 'Fullstack Developer' },
      ];
      setJobs(matchedJobs);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Employee Dashboard</h1>
      <p>Upload your resume to find jobs matching your skills:</p>
      <input type="file" onChange={handleResumeUpload} />
      {resumeUploaded && (
        <div className="job-list">
          <h3>Matching Jobs:</h3>
          <ul>
            {jobs.map(job => (
              <li key={job.id}>{job.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default EmployeeDashboard;
