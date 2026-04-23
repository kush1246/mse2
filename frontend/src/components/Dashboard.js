import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import GrievanceForm from './GrievanceForm';
import GrievanceList from './GrievanceList';
import SearchBar from './SearchBar';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [grievances, setGrievances] = useState([]);
  const [filteredGrievances, setFilteredGrievances] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingGrievance, setEditingGrievance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGrievances();
  }, []);

  const fetchGrievances = async () => {
    try {
      const response = await api.get('/grievances');
      setGrievances(response.data);
      setFilteredGrievances(response.data);
    } catch (error) {
      console.error('Error fetching grievances:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredGrievances(grievances);
      return;
    }

    const filtered = grievances.filter(grievance =>
      grievance.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredGrievances(filtered);
  };

  const handleAddGrievance = () => {
    setEditingGrievance(null);
    setShowForm(true);
  };

  const handleEditGrievance = (grievance) => {
    setEditingGrievance(grievance);
    setShowForm(true);
  };

  const handleDeleteGrievance = async (id) => {
    if (window.confirm('Are you sure you want to delete this grievance?')) {
      try {
        await api.delete(`/grievances/${id}`);
        fetchGrievances();
      } catch (error) {
        console.error('Error deleting grievance:', error);
        alert('Failed to delete grievance');
      }
    }
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (editingGrievance) {
        await api.put(`/grievances/${editingGrievance._id}`, formData);
      } else {
        await api.post('/grievances', formData);
      }
      setShowForm(false);
      setEditingGrievance(null);
      fetchGrievances();
    } catch (error) {
      console.error('Error saving grievance:', error);
      alert('Failed to save grievance');
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingGrievance(null);
  };

  if (loading) {
    return <div className="container">Loading...</div>;
  }

  return (
    <div className="container">
      <div className="dashboard">
        <div className="header">
          <div>
            <h1>Welcome, {user?.name}!</h1>
            <p>Student Grievance Management System</p>
          </div>
          <div>
            <button className="btn btn-secondary" onClick={logout}>
              Logout
            </button>
          </div>
        </div>

        <div className="actions" style={{ marginBottom: '2rem' }}>
          <button className="btn btn-primary" onClick={handleAddGrievance}>
            Submit New Grievance
          </button>
        </div>

        <SearchBar onSearch={handleSearch} />

        {showForm && (
          <GrievanceForm
            grievance={editingGrievance}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        )}

        <GrievanceList
          grievances={filteredGrievances}
          onEdit={handleEditGrievance}
          onDelete={handleDeleteGrievance}
        />
      </div>
    </div>
  );
};

export default Dashboard;
