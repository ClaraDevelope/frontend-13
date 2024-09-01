import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi'; 
import { MenuList } from '@chakra-ui/react';

const AuthLinks = ({ handleLogout, onMenuItemClick }) => (
  <MenuList>
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
      <Link to='/Contacts' id='calendar-link' className='nav-link' onClick={onMenuItemClick}>
        Contactos
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
      style={{ display: 'flex', alignItems: 'center', cursor:'pointer' }}
    >
      <FiLogOut style={{ marginRight: '8px' }} />
      Cerrar sesión
    </li>
  </MenuList>
);

export default AuthLinks;
