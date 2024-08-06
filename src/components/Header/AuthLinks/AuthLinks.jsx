import React from 'react';
import { Link } from 'react-router-dom';

const AuthLinks = ({ handleLogout }) => (
  <>
    <li>
      <Link to='/Calendar' id='calendar-link' className='nav-link'>Calendario</Link>
    </li>
    <li>
      <Link to='/Profile' id='profile-link' className='nav-link'>Mi perfil</Link>
    </li>
    <li>
      <button onClick={handleLogout} id='logout-button' className='nav-link'>Cerrar sesión</button>
    </li>
  </>
);

export default AuthLinks;