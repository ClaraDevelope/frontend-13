import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/es'; 
import { Box, Flex, Menu, MenuButton, MenuList, MenuItem, IconButton, Badge, Avatar, Text, Button, useDisclosure, useBreakpointValue } from '@chakra-ui/react';
import { BellIcon, HamburgerIcon } from '@chakra-ui/icons';
import { useAuth } from '../../providers/AuthProvider'; 
import TitleAndLogo from './TitleAndLogo/TitleAndLogo';
import AuthLinks from './AuthLinks/AuthLinks';
import InputSearchUsers from '../InputSearchUsers/InputSearchUsers';
import { useNavigate } from 'react-router-dom';
import useApiCall from '../../hooks/useApiCall/useApiCall';

moment.locale('es'); 

const Header = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const { isOpen: isMenuOpen, onOpen: onMenuOpen, onClose: onMenuClose } = useDisclosure();
  const { isOpen: isNotificationOpen, onOpen: onNotificationOpen, onClose: onNotificationClose } = useDisclosure();
  const navigate = useNavigate();
  const isSmallScreen = useBreakpointValue({ base: true, md: false });
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const callApi = useApiCall();

  useEffect(() => {
    if (isAuthenticated) {
      fetchNotifications();
    }
  }, [isAuthenticated]);

  const fetchNotifications = async () => {
    try {
      const data = await callApi({
        method: 'GET',
        endpoint: '/notifications/',
        token: user?.token,
      });
      setNotifications(data);
      setUnreadCount(data.filter(n => n.status === 'pending').length);
    } catch (error) {
      console.error('Error al obtener notificaciones:', error);
    }
  };

  const handleNotificationResponse = async (notificationId, response) => {
    try {
      await callApi({
        method: 'POST',
        endpoint: `/notifications/respond/${notificationId}`,
        body: { response },
        token: user?.token,
      });
      fetchNotifications();
    } catch (error) {
      console.error('Error al responder a la notificación:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/Home');
  };

  const handleMenuItemClick = () => {
    onMenuClose();
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
          <Flex alignItems="center">
            <Menu isOpen={isNotificationOpen} onOpen={onNotificationOpen} onClose={onNotificationClose}>
              <MenuButton
                as={IconButton}
                icon={<BellIcon />}
                aria-label="Notificaciones"
                color="blue.700"
                bg="transparent"
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
                position="relative"
              >
                {unreadCount > 0 && (
                  <Badge
                    colorScheme="red"
                    position="absolute"
                    top="-1"
                    right="-1"
                    borderRadius="full"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </MenuButton>
              <MenuList>
                {notifications.length > 0 ? (
                  notifications.map(notification => (
                    <Box key={notification._id}>
                      <MenuItem
                        bg={notification.status === 'pending' ? 'gray.100' : 'white'}
                        _hover={{ bg: 'gray.200' }}
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        p={3}
                      >
                        <Flex width="full" alignItems="center">
                          <Avatar
                            size="sm"
                            src={notification.sender.profile.img}
                            mr={3}
                          />
                          <Box flex="1">
                            <Text fontWeight="bold">
                              {`Solicitud de contacto de ${notification.sender.profile.name}`}
                            </Text>
                            <Text fontSize="sm" color="gray.600">
                              {moment(notification.createdAt).fromNow()}
                            </Text>
                          </Box>
                          <Flex ml={2}>
                            <Button
                              colorScheme="green"
                              size="sm"
                              onClick={() => handleNotificationResponse(notification._id, 'accepted')}
                              mr={2}
                            >
                              Aceptar
                            </Button>
                            <Button
                              colorScheme="red"
                              size="sm"
                              onClick={() => handleNotificationResponse(notification._id, 'rejected')}
                            >
                              Rechazar
                            </Button>
                          </Flex>
                        </Flex>
                      </MenuItem>
                    </Box>
                  ))
                ) : (
                  <MenuItem>No tienes notificaciones</MenuItem>
                )}
              </MenuList>
            </Menu>

            <Menu isOpen={isMenuOpen} onOpen={onMenuOpen} onClose={onMenuClose}>
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
          <InputSearchUsers user={user} />
        </Box>
      )}
    </Box>
  );
};

export default Header;
