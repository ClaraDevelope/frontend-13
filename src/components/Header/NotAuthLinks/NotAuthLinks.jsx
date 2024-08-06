import React from 'react';
import { Link } from 'react-router-dom';

const NonAuthLinks = () => (
  <>
    <li>
      <Link to='/Login' id='login-link' className='nav-link'>Iniciar sesión</Link>
    </li>
    <li>
      <Link to='/Register' id='register-link'>Registrarse</Link>
    </li>
  </>
);

export default NonAuthLinks;