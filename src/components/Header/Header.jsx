import React from 'react';
import './Header.css';
import { useAuth } from '../../providers/AuthProvider';
import TitleAndLogo from './TitleAndLogo/TitleAndLogo';
import AuthLinks from './AuthLinks/AuthLinks';
import NonAuthLinks from './NotAuthLinks/NotAuthLinks';
import { useNavigate } from 'react-router-dom';
import { Menu, MenuButton, MenuList, Button, useDisclosure } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import InputSearchUsers from '../InputSearchUsers/InputSearchUsers';

const Header = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogout = () => {
    logout();
    navigate('/Home');
  };

  const handleMenuItemClick = () => {
    onClose();  
  };

  return (
    <header className="header">
      <TitleAndLogo to={isAuthenticated ? '/Principal' : '/Home'} />
      {isAuthenticated ? (
        <>
        <InputSearchUsers user={user}/>
        <Menu isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
         <MenuButton
            as={Button}
            color="#2B5555"
            variant="ghost"
            rightIcon={<ChevronDownIcon />}
            sx={{
              _hover: {
                bg: 'teal.700',
                color: 'white',
              },
              _active: {
                bg: 'teal.800',
                color: 'white',
              },
            }}
          >
            {user.profile.name}
          </MenuButton>
          <MenuList>
            <AuthLinks handleLogout={handleLogout} onMenuItemClick={handleMenuItemClick} />
          </MenuList>
        </Menu>
        </>
      ) : (
        <ul>
          <NonAuthLinks />
        </ul>
      )}
    </header>
  );
};

export default Header;

