import React from 'react';
import {
  Box,
  Flex,
  Button,
  Menu,
  MenuButton,
  useDisclosure,
  useBreakpointValue,
} from '@chakra-ui/react';
import { ChevronDownIcon, HamburgerIcon } from '@chakra-ui/icons';
import { useAuth } from '../../providers/AuthProvider'; 
import TitleAndLogo from './TitleAndLogo/TitleAndLogo';
import AuthLinks from './AuthLinks/AuthLinks';
import InputSearchUsers from '../InputSearchUsers/InputSearchUsers';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  const handleLogout = () => {
    logout();
    navigate('/Home');
  };

  const handleMenuItemClick = () => {
    onClose();
  };

  return (
    <Box
      as="header"
      position="absolute"
      zIndex="999"
      width="100%"
      padding="30px"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexWrap="wrap"
    >
      <Flex
        direction="row"
        alignItems="center"
        position="relative"
        width="full"
        maxW="container.xl"
        justifyContent="space-between"
      >
        <Flex
          direction="row"
          alignItems="center"
          position="relative"
          mr={isSmallScreen ? '0' : '30px'}
          flex="1"
        >
             <TitleAndLogo to={isAuthenticated ? '/Principal' : '/Home'} />
        </Flex>
        
        {!isSmallScreen && isAuthenticated && (
          <Box flex="1" mx="20px">
            <InputSearchUsers />
          </Box>
        )}
        
        {isAuthenticated && (
          <Menu isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
            <MenuButton
              as={Button}
              color="blue.700"
              variant="ghost"
              rightIcon={<HamburgerIcon />}
              sx={{
                _hover: {
                  bg: 'blue.800',
                  color: 'white',
                },
                _active: {
                  bg: 'blue.800',
                  color: 'white',
                },
              }}
            >
              {user.profile.name}
            </MenuButton>
            <AuthLinks handleLogout={handleLogout} onMenuItemClick={handleMenuItemClick} />
          </Menu>
        )}
      </Flex>
      
      {isSmallScreen && isAuthenticated && (
        <Box
          width="full"
          display="flex"
          flexDirection="column"
          alignItems="stretch"
          mt="10px"
        >
          <InputSearchUsers user={user} />
        </Box>
      )}
    </Box>
  );
};

export default Header;

