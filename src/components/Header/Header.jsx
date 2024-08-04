import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { useAuth } from '../../providers/AuthProvider';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header>
      <div className='title'>
        <h1>MenstruApp</h1>
        <img src="./flor.webp" alt="logo-menstruApp" />
      </div>
      <input type="text" name="" id="" />
      <ul>
        {isAuthenticated ? (
          <>
            <li>
              <Link to='/profile' id='profile-link'>Mi perfil</Link>
            </li>
            <li>
              <button onClick={logout} id='logout-button'>Cerrar sesión</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to='/login' id='login-link'>Iniciar sesión</Link>
            </li>
            <li>
              <Link to='/register' id='register-link'>Registrarse</Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;