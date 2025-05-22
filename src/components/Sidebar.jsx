import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Link to="/Locations" className="icon-button" aria-label="Location">
        <svg width="24" height="24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
          <path d="M12 21s-6-7-6-11a6 6 0 1 1 12 0c0 4-6 11-6 11z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      </Link>
      <Link to="/Dashboard" className="icon-button" aria-label="Users">
        <svg width="24" height="24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
          <path d="M17 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M7 21v-2a4 4 0 0 1 3-3.87" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </Link>
    </div>
  );
};

export default Sidebar;
