import React from 'react';
import { NavLink } from 'react-router-dom';
import { IconHome, IconPlant2, IconTargetArrow, IconBook } from '@tabler/icons-react';

function Navbar() {
  return (
    <nav className="navbar">
      <ul className='navbar-nav'>
        <li><NavLink to="/" end><IconHome color="#000000" width="32" height="32"/></NavLink></li>
        <li><NavLink to="/suggestions"><IconPlant2 color="#000000" width="32" height="32"/></NavLink></li>
        <li><NavLink to="/journalList"><IconTargetArrow color="#000000" width="32" height="32"/></NavLink></li>
        <li><NavLink to="/journalEntry"><IconBook color="#000000" width="32" height="32"/></NavLink></li>
      </ul>
    </nav>
  );
}

export default Navbar;
