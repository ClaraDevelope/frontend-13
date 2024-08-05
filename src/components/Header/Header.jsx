import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { useAuth } from '../../providers/AuthProvider';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate()

  const handleLogout=()=>{
    logout()
    navigate('/Home')
  }

  return (
    <header>
      <div className='title'>
        <Link to='/Home'>
        <h1 className='principal-title'>MenstruApp</h1>
        <img src="./flor.webp" alt="logo-menstruApp" className='logo'/>
        </Link>
      </div>
      <input type="text" name="" id="" />
      <ul>
        {isAuthenticated ? (
          <>
            <li>
              <Link to='/profile' id='profile-link' className='nav-link'>Mi perfil</Link>
            </li>
            <li>
              <button onClick={handleLogout} id='logout-button' className='nav-link'>Cerrar sesión</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to='/Login' id='login-link' className='nav-link'>Iniciar sesión</Link>
            </li>
            <li>
              <Link to='/Register' id='register-link'>Registrarse</Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;