import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Input,
  VStack,
  HStack,
  Text,
  Divider,
  useToast,
  Avatar,
  Flex,
} from '@chakra-ui/react';
import useSocket from '../../hooks/useSocket/useSocket';
import useApiCall from '../../hooks/useApiCall/useApiCall';
import { useParams } from 'react-router-dom';

const ChatPage = () => {
  const { receiverId } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [receiver, setReceiver] = useState(null);

  const toast = useToast();
  const callApi = useApiCall();

  const getCurrentUserId = () => {
    const userFromStorage = localStorage.getItem('user');
    if (userFromStorage) {
      try {
        const parsedUser = JSON.parse(userFromStorage);
        return parsedUser._id;
      } catch (error) {
        console.error('Error al parsear el usuario desde localStorage:', error);
        return null;
      }
    }
    return null;
  };

  const currentUserId = getCurrentUserId();

  const { sendMessage } = useSocket(receiverId, (data) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        sender: data.sender,
        text: data.text,
        timestamp: data.timestamp,
      },
    ]);
  });

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const result = await callApi({
          method: 'GET',
          endpoint: `/messages/${receiverId}?currentUserId=${currentUserId}`,
          token: localStorage.getItem('token'),
          server: true
        });

        console.log('Respuesta de la API para mensajes:', result);

        if (result.success) {
          setMessages(result.messages);

          if (!receiver) {
            const receiverData = await fetchReceiverData(receiverId);
            setReceiver(receiverData);
          }
        } else {
          console.error('Error al obtener los mensajes del receptor');
        }
      } catch (error) {
        console.error('Error al obtener los mensajes del receptor:', error);
      }
    };

    const fetchReceiverData = async (id) => {
      try {
        const response = await callApi({
          method: 'GET',
          endpoint: `/auth/${id}`,
          token: localStorage.getItem('token'),
        });

        console.log('Respuesta de la API para receptor:', response);

        if (response && response.profile) {
          return response.profile;
        } else {
          throw new Error('Datos del receptor no encontrados');
        }
      } catch (error) {
        console.error('Error al obtener los datos del receptor:', error);
        return null;
      }
    };

    if (receiverId) {
      fetchMessages();
    }
  }, [receiverId, currentUserId]);

  const handleSendMessage = async () => {
    if (message.trim() === '') {
      toast({
        title: 'Error',
        description: 'No puedes enviar un mensaje vacío.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await callApi({
        method: 'POST',
        endpoint: '/send',
        token: localStorage.getItem('token'),
        body: {
          receiverId,
          text: message,
        },
        server: true
      });

      if (response.success) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: currentUserId,
            text: message,
            timestamp: new Date(),
          },
        ]);
        setMessage('');
      } else {
        toast({
          title: 'Error',
          description: response.error || 'No se pudo enviar el mensaje.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      toast({
        title: 'Error',
        description: 'Error en la conexión al servidor.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    const messagesEnd = document.getElementById('messages-end');
    if (messagesEnd) {
      messagesEnd.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <VStack spacing={4} align="stretch" p={4} maxW="600px" mx="auto">
      <Box
        borderWidth={1}
        borderRadius="lg"
        p={4}
        bg="gray.50"
        overflowY="scroll"
        h="500px"
        borderColor="gray.200"
      >
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Conversación con {receiver ? receiver.name : 'Desconocido'}
        </Text>
        {messages.map((msg, index) => {
          const isUserMessage = msg.sender.id === currentUserId;
          const senderName = isUserMessage ? 'Tú' : (msg.sender.name || 'Desconocido');
          return (
            <Flex
              key={index}
              direction={isUserMessage ? 'row-reverse' : 'row'}
              mb={2}
              align="flex-start"
              justify={isUserMessage ? 'flex-end' : 'flex-start'}
            >
              <Flex
                width="100%"
                direction="column"
                align={isUserMessage ? 'flex-end' : 'flex-start'}
              >
                <Flex
                  direction="row"
                  align="center"
                  bg={isUserMessage ? 'blue.100' : 'green.100'}
                  p={3}
                  borderRadius="md"
                  maxW="100%"
                  textAlign={isUserMessage ? 'right' : 'left'}
                  boxShadow="md"
                >
                  {!isUserMessage && (
                    <Avatar
                      name={senderName}
                      src={`https://api.adorable.io/avatars/40/${senderName}.png`}
                      size="sm"
                      mr={3}
                      bg="green.200"
                    />
                  )}
                  <Box flex="1">
                    <Text
                      fontWeight="bold"
                      color={isUserMessage ? 'blue.600' : 'green.600'}
                      overflowWrap="break-word"
                    >
                      {senderName}
                    </Text>
                    <Text>{msg.text}</Text>
                    <Text fontSize="sm" color="gray.500">
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </Text>
                    {index < messages.length - 1 && <Divider my={2} />}
                  </Box>
                </Flex>
              </Flex>
            </Flex>
          );
        })}
        <Box id="messages-end" />
      </Box>
      <HStack spacing={2}>
        <Input
          placeholder="Escribe un mensaje..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button onClick={handleSendMessage} colorScheme="blue">
          Enviar
        </Button>
      </HStack>
    </VStack>
  );
};

export default ChatPage;




// import React, { useState, useEffect } from 'react';
// import {
//   Box,
//   Button,
//   Input,
//   VStack,
//   HStack,
//   Text,
//   Divider,
//   useToast,
//   Avatar,
//   Flex,
// } from '@chakra-ui/react';
// import useSocket from '../../hooks/useSocket/useSocket';
// import useApiCall from '../../hooks/useApiCall/useApiCall';
// import { useParams } from 'react-router-dom';

// const ChatPage = () => {
//   const { receiverId } = useParams();
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState('');
//   const [receiver, setReceiver] = useState(null);

//   const toast = useToast();
//   const callApi = useApiCall();

//   const getCurrentUserId = () => {
//     const userFromStorage = localStorage.getItem('user');
//     if (userFromStorage) {
//       try {
//         const parsedUser = JSON.parse(userFromStorage);
//         return parsedUser._id;
        
//       } catch (error) {
//         console.error('Error al parsear el usuario desde localStorage:', error);
//         return null;
//       }
//     }
//     return null;
//   };

//   const currentUserId = getCurrentUserId();

//   const { sendMessage } = useSocket(receiverId, (data) => {
//     setMessages((prevMessages) => [
//       ...prevMessages,
//       {
//         sender: data.sender,
//         text: data.text,
//         timestamp: data.timestamp,
//       },
//     ]);
//   });

//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         const result = await callApi({
//           method: 'GET',
//           endpoint: `/messages/${receiverId}`,
//           token: localStorage.getItem('token'),
//           server: true
//         });

//         console.log('Respuesta de la API para mensajes:', result);

//         if (result.success) {
//           setMessages(result.messages);

//           if (!receiver) {
//             const receiverData = await fetchReceiverData(receiverId);
//             setReceiver(receiverData);
//           }
//         } else {
//           console.error('Error al obtener los mensajes del receptor');
//         }
//       } catch (error) {
//         console.error('Error al obtener los mensajes del receptor:', error);
//       }
//     };

//     const fetchReceiverData = async (id) => {
//       try {
//         const response = await callApi({
//           method: 'GET',
//           endpoint: `/auth/${id}`,
//           token: localStorage.getItem('token'),
//         });

//         console.log('Respuesta de la API para receptor:', response);

//         if (response && response.profile) {
//           return response.profile;
//         } else {
//           throw new Error('Datos del receptor no encontrados');
//         }
//       } catch (error) {
//         console.error('Error al obtener los datos del receptor:', error);
//         return null;
//       }
//     };

//     if (receiverId) {
//       fetchMessages();
//     }
//   }, [receiverId]);

//   const handleSendMessage = async () => {
//     if (message.trim() === '') {
//       toast({
//         title: 'Error',
//         description: 'No puedes enviar un mensaje vacío.',
//         status: 'error',
//         duration: 3000,
//         isClosable: true,
//       });
//       return;
//     }

//     try {
//       const response = await callApi({
//         method: 'POST',
//         endpoint: '/send',
//         token: localStorage.getItem('token'),
//         body: {
//           receiverId,
//           text: message,
//         },
//         server: true
//       });

//       if (response.success) {
//         setMessages((prevMessages) => [
//           ...prevMessages,
//           {
//             sender: currentUserId,
//             text: message,
//             timestamp: new Date(),
//           },
//         ]);
//         setMessage('');
//       } else {
//         toast({
//           title: 'Error',
//           description: response.error || 'No se pudo enviar el mensaje.',
//           status: 'error',
//           duration: 3000,
//           isClosable: true,
//         });
//       }
//     } catch (error) {
//       console.error('Error al enviar el mensaje:', error);
//       toast({
//         title: 'Error',
//         description: 'Error en la conexión al servidor.',
//         status: 'error',
//         duration: 3000,
//         isClosable: true,
//       });
//     }
//   };

//   useEffect(() => {
//     const messagesEnd = document.getElementById('messages-end');
//     if (messagesEnd) {
//       messagesEnd.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages]);

//   return (
//     <VStack spacing={4} align="stretch" p={4} maxW="600px" mx="auto">
//       <Box
//         borderWidth={1}
//         borderRadius="lg"
//         p={4}
//         bg="gray.50"
//         overflowY="scroll"
//         h="500px"
//         borderColor="gray.200"
//       >
//         <Text fontSize="xl" fontWeight="bold" mb={4}>
//           Conversación con {receiver ? receiver.name : 'Desconocido'}
//         </Text>
//         {messages.map((msg, index) => {
//           const isUserMessage = msg.sender === currentUserId;
//           const senderName = isUserMessage ? 'Tú' : (msg.sender?.name || 'Desconocido');
//           return (
//             <Flex
//               key={index}
//               direction={isUserMessage ? 'row-reverse' : 'row'}
//               mb={2}
//               align="flex-start"
//               justify={isUserMessage ? 'flex-end' : 'flex-start'}
//             >
//               <Flex
//                 direction="column"
//                 align={isUserMessage ? 'flex-end' : 'flex-start'}
//               >
//                 <Flex
//                   direction="row"
//                   align="center"
//                   bg={isUserMessage ? 'blue.100' : 'green.100'}
//                   p={3}
//                   borderRadius="md"
//                   width="100%"
//                   textAlign={isUserMessage ? 'right' : 'left'}
//                   boxShadow="md"
//                 >
//                   {!isUserMessage && (
//                     <Avatar
//                       name={senderName}
//                       src={`https://api.adorable.io/avatars/40/${senderName}.png`}
//                       size="sm"
//                       mr={3}
//                       bg="green.200"
//                     />
//                   )}
//                   <Box flex="1">
//                     <Text
//                       fontWeight="bold"
//                       color={isUserMessage ? 'blue.600' : 'green.600'}
//                       overflowWrap="break-word"
//                     >
//                       {senderName}
//                     </Text>
//                     <Text>{msg.text}</Text>
//                     <Text fontSize="sm" color="gray.500">
//                       {new Date(msg.timestamp).toLocaleTimeString()}
//                     </Text>
//                     {index < messages.length - 1 && <Divider my={2} />}
//                   </Box>
//                 </Flex>
//               </Flex>
//             </Flex>
//           );
//         })}
//         <Box id="messages-end" />
//       </Box>
//       <HStack spacing={2}>
//         <Input
//           placeholder="Escribe un mensaje..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <Button onClick={handleSendMessage} colorScheme="blue">
//           Enviar
//         </Button>
//       </HStack>
//     </VStack>
//   );
// };

// export default ChatPage;
