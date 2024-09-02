import React from 'react';
import { Menu, MenuButton, MenuList, MenuItem, Button, useDisclosure } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../providers/AuthProvider';
import AuthLinks from '../AuthLinks/AuthLinks';

const UserMenu = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { isOpen: isMenuOpen, onOpen: onMenuOpen, onClose: onMenuClose } = useDisclosure();

  const handleLogout = () => {
    logout();
    navigate('/Home');
  };

  return (
    <Menu isOpen={isMenuOpen} onOpen={onMenuOpen} onClose={onMenuClose}>
      <MenuButton 
        as={Button}
        color="blue.700"
        variant="ghost"
        rightIcon={<HamburgerIcon />}
        padding="8px"
        _hover={{
          bg: 'blue.800',
          color: 'white',
        }}
        _active={{
          bg: 'blue.800',
          color: 'white',
        }}
      >
        {user.profile.name}
      </MenuButton>
      <AuthLinks handleLogout={handleLogout} onMenuItemClick={onMenuClose} />
    </Menu>
  );
};

export default UserMenu;


