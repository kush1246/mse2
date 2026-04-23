import React from 'react';

const GrievanceList = ({ grievances, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (grievances.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <p>No grievances found.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Your Grievances</h2>
      {grievances.map((grievance) => (
        <div key={grievance._id} className="grievance-card">
          <div className="grievance-header">
            <h3 className="grievance-title">{grievance.title}</h3>
            <span className={`status-${grievance.status.toLowerCase()}`}>
              {grievance.status}
            </span>
          </div>
          <div className="grievance-meta">
            <span><strong>Category:</strong> {grievance.category}</span>
            <span><strong>Date:</strong> {formatDate(grievance.date)}</span>
          </div>
          <p>{grievance.description}</p>
          <div className="actions">
            <button 
              className="btn btn-secondary" 
              onClick={() => onEdit(grievance)}
            >
              Edit
            </button>
            <button 
              className="btn btn-danger" 
              onClick={() => onDelete(grievance._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GrievanceList;
