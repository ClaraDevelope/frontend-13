import React from 'react';
import moment from 'moment';
import 'moment/locale/es'; 
import {
  Box, Badge, Menu, MenuList, MenuItem, Flex, Avatar, Text, Button, useDisclosure,
  useMediaQuery
} from '@chakra-ui/react';
import { BellIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import useNotifications from '../../../hooks/useNotifications/useNotifications';

moment.locale('es');

const NotificationMenu = () => {
  const {
    notifications,
    unreadCount,
    handleNotificationResponse,
    markNotificationAsRead,
    setContacts
  } = useNotifications();
  
  const { isOpen: isNotificationOpen, onOpen: onNotificationOpen, onClose: onNotificationClose } = useDisclosure();
  const navigate = useNavigate();
  const [isLargerThan400] = useMediaQuery("(max-width: 400px)");

  const handleNotificationClick = async (notification) => {
    if (notification.type === 'message') {
      await markNotificationAsRead(notification._id); 
      navigate(`/chat/${notification.sender._id}`);
    }
    onNotificationClose(); 
  };

  const handleContactResponse = async (notification, response) => {
    await handleNotificationResponse(notification._id, response);
    if (response === 'accepted') {
      setContacts(prevContacts => [...prevContacts, notification.sender]);
    }
    onNotificationClose(); 
  };

  return (
    <Box position="relative">
      <Menu isOpen={isNotificationOpen} onClose={onNotificationClose}>
        <Button
          role="button"
          aria-label="Notificaciones"
          color='blue.700'
          backgroundColor='transparent'
          borderRadius='50%'
          padding='10px 2px'
          cursor='pointer'
          display='flex'
          alignItems='center'
          position='relative'
          _hover={{ bg: 'blue.800', color: 'white' }}
          _active={{ bg: 'blue.800', color: 'white' }}
          onClick={onNotificationOpen} 
        >
          <BellIcon boxSize={6}/>
          {unreadCount > 0 && (
            <Badge
              colorScheme="red"
              position="absolute"
              top="25px"
              right="25px"
              borderRadius="50%"
              zIndex="9999"
              fontSize="0.7em"
              padding="5px 8px 3px 8px"
              backgroundColor="red.500"
              color="white"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
        <MenuList
          position="absolute"
          top="40px"
          right="-10"
          left={isLargerThan400 ? "-220" : "auto"}
          minWidth="300px"
        >
          {notifications.length > 0 ? (
            notifications.map(notification => (
              <MenuItem
                key={notification._id}
                bg={notification.status === 'pending' ? 'gray.100' : 'white'}
                _hover={{ bg: 'gray.200' }}
                display="flex"
                flexDirection="column"
                alignItems="center"
                p={3}
                onClick={() => handleNotificationClick(notification)} 
              >
                <Flex width="full" alignItems="center" direction="column">
                  <Avatar
                    size="sm"
                    src={notification.sender.profile.img}
                    mr={3}
                  />
                  <Box flex="1">
                    <Text fontWeight="bold">
                      {notification.type === 'contact_request'
                        ? `Solicitud de contacto de ${notification.sender.profile.name}`
                        : `Nuevo mensaje de ${notification.sender.profile.name}`}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      {moment(notification.createdAt).fromNow()}
                    </Text>
                  </Box>
                  {notification.type === 'contact_request' && (
                    <Flex mt={2}>
                      <Button
                        colorScheme="green"
                        size="sm"
                        onClick={() => handleContactResponse(notification, 'accepted')}
                        mr={2}
                      >
                        Aceptar
                      </Button>
                      <Button
                        colorScheme="red"
                        size="sm"
                        onClick={() => handleContactResponse(notification, 'rejected')}
                      >
                        Rechazar
                      </Button>
                    </Flex>
                  )}
                </Flex>
              </MenuItem>
            ))
          ) : (
            <MenuItem>No tienes notificaciones</MenuItem>
          )}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default NotificationMenu;













