import React from 'react';
import { Box, Flex, useBreakpointValue } from '@chakra-ui/react';
import { useAuth } from '../../providers/AuthProvider';
import TitleAndLogo from './TitleAndLogo/TitleAndLogo';
import InputSearchUsers from '../InputSearchUsers/InputSearchUsers';
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
          <Flex alignItems="center" position="relative">
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




// import React, { useState, useEffect } from 'react';
// import moment from 'moment';
// import 'moment/locale/es'; 
// import { Box, Flex, Menu, MenuButton, MenuList, MenuItem, Badge, Avatar, Text, Button, useDisclosure, useBreakpointValue } from '@chakra-ui/react';
// import { BellIcon, HamburgerIcon } from '@chakra-ui/icons';
// import { useAuth } from '../../providers/AuthProvider'; 
// import TitleAndLogo from './TitleAndLogo/TitleAndLogo';
// import AuthLinks from './AuthLinks/AuthLinks';
// import InputSearchUsers from '../InputSearchUsers/InputSearchUsers';
// import { useNavigate } from 'react-router-dom';
// import useApiCall from '../../hooks/useApiCall/useApiCall';

// moment.locale('es'); 

// const Header = () => {
//   const { isAuthenticated, logout, user } = useAuth();
//   const { isOpen: isMenuOpen, onOpen: onMenuOpen, onClose: onMenuClose } = useDisclosure();
//   const { isOpen: isNotificationOpen, onOpen: onNotificationOpen, onClose: onNotificationClose } = useDisclosure();
//   const navigate = useNavigate();
//   const isSmallScreen = useBreakpointValue({ base: true, md: false });
//   const [notifications, setNotifications] = useState([]);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const callApi = useApiCall();
//   const token = user?.token;

//   useEffect(() => {
//     if (isAuthenticated) {
//       fetchNotifications();
//     }
//   }, [isAuthenticated]);

//   const fetchNotifications = async () => {
//     try {
//       const data = await callApi({
//         method: 'GET',
//         endpoint: '/notifications/',
//         token
//       });
//       setNotifications(data);
//       setUnreadCount(data.filter(n => n.status === 'pending').length);
//     } catch (error) {
//       console.error('Error al obtener notificaciones:', error);
//     }
//   };

//   const handleNotificationResponse = async (notificationId, response) => {
//     try {
//       await callApi({
//         method: 'POST',
//         endpoint: `/notifications/respond/${notificationId}`,
//         body: { response },
//         token: user?.token,
//       });
//       fetchNotifications();
//     } catch (error) {
//       console.error('Error al responder a la notificación:', error);
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     navigate('/Home');
//   };

//   const handleMenuItemClick = () => {
//     onMenuClose();
//   };

//   return (
//     <Box
//       as="header"
//       position="absolute"
//       zIndex="999"
//       width="100%"
//       padding="30px"
//       display="flex"
//       justifyContent="space-between"
//       alignItems="center"
//       flexWrap="wrap"
//     >
//       <Flex
//         direction="row"
//         alignItems="center"
//         position="relative"
//         width="full"
//         maxW="container.xl"
//         justifyContent="space-between"
//       >
//         <Flex
//           direction="row"
//           alignItems="center"
//           position="relative"
//           mr={isSmallScreen ? '0' : '30px'}
//           flex="1"
//         >
//           <TitleAndLogo to={isAuthenticated ? '/Principal' : '/Home'} />
//         </Flex>
        
//         {!isSmallScreen && isAuthenticated && (
//           <Box flex="1" mx="20px">
//             <InputSearchUsers />
//           </Box>
//         )}
        
//         {isAuthenticated && (
//           <Flex alignItems="center" position="relative">
//             <Box
//               as="button"
//               aria-label="Notificaciones"
//               color="blue.700"
//               bg="transparent"
//               position="relative"
//               borderRadius="50%"
//               padding="5px"
//               sx={{
//                 _hover: {
//                   bg: 'blue.800',
//                   color: 'white',
//                 },
//                 _active: {
//                   bg: 'blue.800',
//                   color: 'white',
//                 },
//               }}
//               onClick={onNotificationOpen}
//             >
//               <BellIcon boxSize={6} />
//               {unreadCount > 0 && (
//                 <Badge
//                   colorScheme="red"
//                   position="absolute"
//                   top="20px"
//                   right="20px"
//                   borderRadius="50%"
//                   zIndex="9999"
//                   fontSize="0.7em"
//                   padding="1px 6px"
//                   backgroundColor="red.500"
//                   color="white"
//                 >
//                   {unreadCount}
//                 </Badge>
//               )}
//             </Box>
//             <Menu isOpen={isNotificationOpen} onClose={onNotificationClose}>
//               <MenuList position="absolute"
//               top="10"
//               right="-100"
//               >
//                 {notifications.length > 0 ? (
//                   notifications.map(notification => (
//                     <Box key={notification._id}>
//                       <MenuItem
//                         bg={notification.status === 'pending' ? 'gray.100' : 'white'}
//                         _hover={{ bg: 'gray.200' }}
//                         display="flex"
//                         flexDirection="column"
//                         alignItems="center"
//                         p={3}
//                       >
//                         <Flex 
//                         width="full" 
//                         alignItems="center"
//                         direction="column"
//                         >
//                           <Avatar
//                             size="sm"
//                             src={notification.sender.profile.img}
//                             mr={3}
//                           />
//                           <Box flex="1">
//                             <Text fontWeight="bold">
//                               {`Solicitud de contacto de ${notification.sender.profile.name}`}
//                             </Text>
//                             <Text fontSize="sm" color="gray.600" ml="60px" >
//                               {moment(notification.createdAt).fromNow()}
//                             </Text>
//                           </Box>
//                           <Flex mt={2}>
//                             <Button
//                               colorScheme="green"
//                               size="sm"
//                               onClick={() => handleNotificationResponse(notification._id, 'accepted')}
//                               mr={2}
//                             >
//                               Aceptar
//                             </Button>
//                             <Button
//                               colorScheme="red"
//                               size="sm"
//                               onClick={() => handleNotificationResponse(notification._id, 'rejected')}
//                             >
//                               Rechazar
//                             </Button>
//                           </Flex>
//                         </Flex>
//                       </MenuItem>
//                     </Box>
//                   ))
//                 ) : (
//                   <MenuItem>No tienes notificaciones</MenuItem>
//                 )}
//               </MenuList>
//             </Menu>

//             <Menu isOpen={isMenuOpen} onOpen={onMenuOpen} onClose={onMenuClose}>
//               <MenuButton
//                 as={Button}
//                 color="blue.700"
//                 variant="ghost"
//                 rightIcon={<HamburgerIcon />}
//                 sx={{
//                   _hover: {
//                     bg: 'blue.800',
//                     color: 'white',
//                   },
//                   _active: {
//                     bg: 'blue.800',
//                     color: 'white',
//                   },
//                 }}
//               >
//                 {user.profile.name}
//               </MenuButton>
//               <AuthLinks handleLogout={handleLogout} onMenuItemClick={handleMenuItemClick} />
//             </Menu>
//           </Flex>
//         )}
//       </Flex>
      
//       {isSmallScreen && isAuthenticated && (
//         <Box
//           width="full"
//           display="flex"
//           flexDirection="column"
//           alignItems="stretch"
//           mt="10px"
//         >
//           <InputSearchUsers user={user} />
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default Header;


