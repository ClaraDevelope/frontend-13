import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/es'; 
import {
  Box, Badge, Menu, MenuList, MenuItem, Flex, Avatar, Text, Button, useDisclosure
} from '@chakra-ui/react';
import { BellIcon } from '@chakra-ui/icons';
import useApiCall from '../../../hooks/useApiCall/useApiCall';
import { useAuth } from '../../../providers/AuthProvider';

moment.locale('es');

const NotificationMenu = () => {
  const { user } = useAuth();
  const callApi = useApiCall();
  const token = user?.token;
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { isOpen: isNotificationOpen, onOpen: onNotificationOpen, onClose: onNotificationClose } = useDisclosure();

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  const fetchNotifications = async () => {
    try {
      const data = await callApi({
        method: 'GET',
        endpoint: '/notifications/',
        token
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

  return (
    <Box position="relative">
      <Menu isOpen={isNotificationOpen} onClose={onNotificationClose}>
        <Button
          role="button"
          aria-label="Notificaciones"
          color= 'blue.700'
            backgroundColor= 'transparent'
            borderRadius= '50%'
            padding= '10px 2px'
            cursor= 'pointer'
            display= 'flex'
            alignItems= 'center'
            position= 'relative'
            sx={{
                _hover: 
                {
                bg: 'blue.800',
                color: 'white',
                },
                _active: {
                bg: 'blue.800',
                color: 'white',
                },
              }}
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
          right="-40px"
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
              >
                <Flex width="full" alignItems="center" direction="column">
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
                  <Flex mt={2}>
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

