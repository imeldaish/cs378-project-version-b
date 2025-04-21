import React from 'react';
import { NavLink } from 'react-router-dom';
import { IconHome, IconPlant2, IconTargetArrow, IconBook } from '@tabler/icons-react';

function Navbar() {
  const iconSize = 32;
  const activeColor = '#49BA29'; // Green when active
  const defaultColor = '#000000'; // Black when inactive

  return (
    <nav className="navbar">
      <ul className='navbar-nav'>
        <li>
          <NavLink to="/" end>
            {({ isActive }) => (
              <IconHome color={isActive ? activeColor : defaultColor} width={iconSize} height={iconSize} />
            )}
          </NavLink>
        </li>
        <li>
          <NavLink to="/suggestions">
            {({ isActive }) => (
              <IconPlant2 color={isActive ? activeColor : defaultColor} width={iconSize} height={iconSize} />
            )}
          </NavLink>
        </li>
        <li>
          <NavLink to="/journalList">
            {({ isActive }) => (
              <IconTargetArrow color={isActive ? activeColor : defaultColor} width={iconSize} height={iconSize} />
            )}
          </NavLink>
        </li>
        <li>
          <NavLink to="/journalEntry">
            {({ isActive }) => (
              <IconBook color={isActive ? activeColor : defaultColor} width={iconSize} height={iconSize} />
            )}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;