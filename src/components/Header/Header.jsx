import React from 'react';
import './Header.css';
import { useAuth } from '../../providers/AuthProvider';
import TitleAndLogo from './TitleAndLogo/TitleAndLogo';
import AuthLinks from './AuthLinks/AuthLinks';
import NonAuthLinks from './NotAuthLinks/NotAuthLinks';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate()

  const handleLogout=() =>{
    logout()
    navigate('/Home')
  }

  return (
    <header>
      <TitleAndLogo to={isAuthenticated ? '/Principal' : '/Home'} />
      <input type="text" name="" id="" />
      <ul>
        {isAuthenticated ? <AuthLinks handleLogout={handleLogout} /> : <NonAuthLinks />}
      </ul>
    </header>
  );
};

export default Header;