import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainDash from '../components/MainDash/MainDash';
import Cards from '../components/Cards/Cards';
import BasicTable from '../components/Table/SingleTable';
import Sidebar from '../components/sidebar/Sidebar';
import Button from '@mui/material/Button';  // Import the Button component from Material-UI
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation

const Home = () => {
  const navigate = useNavigate();

  const handleCreateTicket = () => {
    navigate('/create-ticket'); // Navigate to the create ticket page or modal
  };

  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar />
        <div style={{ padding: 30 }}> 
          <Button 
            variant="contained"
            color="primary"
            onClick={handleCreateTicket}
            style={{
             marginTop:0,
              left: 1300,
              marginBottom: 0,
              backgroundColor: '#007FFF',  // Custom blue color
              padding: '10px 20px',  // Custom padding
            }}
          >
            Create Ticket
          </Button>
          <MainDash />
        </div>
      </div>
    </div>
  );
}

export default Home;
