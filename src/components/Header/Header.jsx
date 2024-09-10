import React from 'react';
import { Box, Flex, useBreakpointValue } from '@chakra-ui/react';
import { useAuth } from '../../providers/AuthProvider';
import TitleAndLogo from './TitleAndLogo/TitleAndLogo';
import InputSearchUsers from './InputSearchUsers/InputSearchUsers';
import NotificationMenu from './NotificationMenu/NotificationMenu';
import UserMenu from './UserMenu/UserMenu';


const Header = () => {
  const { isAuthenticated } = useAuth();
  const isSmallScreen = useBreakpointValue({ base: true, md: false });

  return (
    <Box
      as="header"
      position="absolute"
      zIndex="999"
      width="100%"
      padding="20px"
      display="flex"
      justifyContent="center"  
      alignItems="center"
      flexWrap="wrap"
    >
      <Flex
        direction="row"
        alignItems="center"
        width="full"
        maxW="container.xl"  
        justifyContent="center"  
      >
        <Flex
          direction="row"
          alignItems="center"
          flex="1"
        >
          <TitleAndLogo to={isAuthenticated ? '/Principal' : '/Home'} />
        </Flex>
        
        {!isSmallScreen && isAuthenticated && (
          <Box flex="2" mx="20px"> 
            <InputSearchUsers />
          </Box>
        )}
        
        {isAuthenticated && (
          <Flex alignItems="center" position="relative" flex="1">
            <UserMenu />
            <NotificationMenu />
          </Flex>
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
          <InputSearchUsers />
        </Box>
      )}
    </Box>
  );
};

export default Header;



