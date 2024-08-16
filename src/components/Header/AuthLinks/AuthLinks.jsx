import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi'; // Importa el ícono de cerrar sesión

const AuthLinks = ({ handleLogout, onMenuItemClick }) => (
  <>
    <li>
      <Link to='/Principal' id='calendar-link' className='nav-link' onClick={onMenuItemClick}>
        Principal
      </Link>
    </li>
    <li>
      <Link to='/Social' id='calendar-link' className='nav-link' onClick={onMenuItemClick}>
        Social
      </Link>
    </li>
    <li>
      <Link to='/Calendar' id='calendar-link' className='nav-link' onClick={onMenuItemClick}>
        Calendario
      </Link>
    </li>
    <li>
      <Link to='/Profile' id='profile-link' className='nav-link' onClick={onMenuItemClick}>
        Mi perfil
      </Link>
    </li>
    <li 
      onClick={() => { handleLogout(); onMenuItemClick(); }} 
      id='logout-button' 
      className='nav-link' 
      style={{ display: 'flex', alignItems: 'center', cursor:'pointer' }} // Flex container to align icon and text
    >
      <FiLogOut style={{ marginRight: '8px' }} /> {/* Add some margin between icon and text */}
      Cerrar sesión
    </li>
  </>
);

export default AuthLinks;
