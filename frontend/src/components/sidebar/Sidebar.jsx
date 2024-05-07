import React from 'react';
import './Sidebar.css';
import Logo from '../../imgs/confirmation_number_FILL0_wght400_GRAD0_opsz24.png';
import { SidebarData } from '../../Data/Data';
import { UilSignOutAlt } from '@iconscout/react-unicons';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthConsumer from "../../context/authContext"; // Import useNavigate and useLocation

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {logout} = AuthConsumer()
  const isTechnician = sessionStorage.getItem('isTechnician') === "true"
  const isSuperAdmin = sessionStorage.getItem('isSuperAdmin') === "true"

  // Function to handle menu item click
  const handleItemClick = (heading) => {
    // Generate a route path based on the item heading
    const path = `/${heading.toLowerCase().replace(/\s+/g, '-')}`;
    navigate(path); // Navigate to the specified path
  };
  const handleLogout = () => {
    logout()
    navigate('/')
  }

  // Function to determine if the menu item is active
  const isActive = (heading) => {
    const path = `/${heading.toLowerCase().replace(/\s+/g, '-')}`;
    return location.pathname === path;
  };

  const hasAccess = (roles) => {
    if (roles === 1) {
      return isTechnician || isSuperAdmin;
    } else if (roles === 2) {
      return isSuperAdmin;
    } else {
      return true;
    }
  }


  return (
    <div className="Sidebar">
      <div className="logo">
        <img src={Logo} alt="logo" />
        <span>Tic<span>K</span>et CRM</span>
      </div>
      <div className="menu">
        {SidebarData.map((item, index) => (
          hasAccess(item.roles) &&
          <div
            key={index}
            className={`menuItem ${isActive(item.heading) ? 'active' : ''}`}
            onClick={() => handleItemClick(item.heading)}
          >
            <item.icon />
            <span>{item.heading}</span>
          </div>
        ))}
        <div className="menuItem" onClick={() => handleLogout()}>
          <UilSignOutAlt />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
