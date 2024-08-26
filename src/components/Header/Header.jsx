import React from 'react';
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuList,
  Button,
  useDisclosure,
  useBreakpointValue,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useAuth } from '../../providers/AuthProvider'; // Asegúrate de que este hook esté exportado correctamente
import TitleAndLogo from './TitleAndLogo/TitleAndLogo';
import AuthLinks from './AuthLinks/AuthLinks';
import NonAuthLinks from './NotAuthLinks/NotAuthLinks';
import InputSearchUsers from '../InputSearchUsers/InputSearchUsers';
import { useNavigate } from 'react-router-dom';
import './Header.css'

const Header = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/Home');
  };

  const handleMenuItemClick = () => {
    onClose();
  };

  const isSmallScreen = useBreakpointValue({ base: true, md: false });

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
        
        {!isSmallScreen && (
          <Box flex="1" mx="20px">
            <InputSearchUsers />
          </Box>
        )}
        
        {isAuthenticated ? (
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
        ) : (
          <Box as="ul">
            <NonAuthLinks />
          </Box>
        )}
      </Flex>
      
      {isSmallScreen && (
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

// import React from 'react';
// import './Header.css';
// import { useAuth } from '../../providers/AuthProvider';
// import TitleAndLogo from './TitleAndLogo/TitleAndLogo';
// import AuthLinks from './AuthLinks/AuthLinks';
// import NonAuthLinks from './NotAuthLinks/NotAuthLinks';
// import { useNavigate } from 'react-router-dom';
// import { Menu, MenuButton, MenuList, Button, useDisclosure } from '@chakra-ui/react';
// import { ChevronDownIcon } from '@chakra-ui/icons';
// import InputSearchUsers from '../InputSearchUsers/InputSearchUsers';

// const Header = () => {
//   const { isAuthenticated, logout, user } = useAuth();  
//   const navigate = useNavigate();
//   const { isOpen, onOpen, onClose } = useDisclosure();

//   const handleLogout = () => {
//     logout();
//     navigate('/Home');
//   };

//   const handleMenuItemClick = () => {
//     onClose();  
//   };

//   return (
// <header className="header">
//   <div className="title-and-logo">
//     <TitleAndLogo to={isAuthenticated ? '/Principal' : '/Home'} />
//   </div>
//   <div className="user-actions">
//     <InputSearchUsers user={user} className="input-search" />
//     <Menu isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
//       <MenuButton
//         as={Button}
//         color="#2B5555"
//         variant="ghost"
//         rightIcon={<ChevronDownIcon />}
//         sx={{
//           _hover: {
//             bg: 'teal.700',
//             color: 'white',
//           },
//           _active: {
//             bg: 'teal.800',
//             color: 'white',
//           },
//         }}
//       >
//         {user.profile.name}
//       </MenuButton>
//       <MenuList>
//         <AuthLinks handleLogout={handleLogout} onMenuItemClick={handleMenuItemClick} />
//       </MenuList>
//     </Menu>
//   </div>
// </header>

//   );
// };

// export default Header;
