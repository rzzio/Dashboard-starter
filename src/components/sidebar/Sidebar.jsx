import React from 'react';
import './Sidebar.css';
import Logo from '../../imgs/confirmation_number_FILL0_wght400_GRAD0_opsz24.png';
import { SidebarData } from '../../Data/Data';
import { UilSignOutAlt } from '@iconscout/react-unicons';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useNavigate and useLocation

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Function to handle menu item click
  const handleItemClick = (heading) => {
    // Generate a route path based on the item heading
    const path = `/${heading.toLowerCase().replace(/\s+/g, '-')}`;
    navigate(path); // Navigate to the specified path
  };

  // Function to determine if the menu item is active
  const isActive = (heading) => {
    const path = `/${heading.toLowerCase().replace(/\s+/g, '-')}`;
    return location.pathname === path;
  };

  return (
    <div className="Sidebar">
      <div className="logo">
        <img src={Logo} alt="logo" />
        <span>Tic<span>K</span>et CRM</span>
      </div>
      <div className="menu">
        {SidebarData.map((item, index) => (
          <div
            key={index}
            className={`menuItem ${isActive(item.heading) ? 'active' : ''}`}
            onClick={() => handleItemClick(item.heading)}
          >
            <item.icon />
            <span>{item.heading}</span>
          </div>
        ))}
        <div className="menuItem" onClick={() => navigate('/login')}>
          <UilSignOutAlt />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
