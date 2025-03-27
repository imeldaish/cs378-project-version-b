import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <ul className='navbar-nav'>
        <li className='nav-item ms-3'><NavLink to="/" end>Home</NavLink></li>
        <li className='nav-item ms-3'><NavLink to="/suggestions">Suggestions</NavLink></li>
        <li className='nav-item ms-3'><NavLink to="/journalList">Journal List</NavLink></li>
        <li className='nav-item ms-3'><NavLink to="/journalEntry">Journal Entry</NavLink></li>
      </ul>
    </nav>
  );
}

export default Navbar;
