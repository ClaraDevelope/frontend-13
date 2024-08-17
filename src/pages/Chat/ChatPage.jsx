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

const ChatPage = ({ receiverId, receiverName }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
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
  const toast = useToast();

  const handleSendMessage = () => {
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
    sendMessage(message);
    setMessage('');
  };

  useEffect(() => {
    // Scroll to the bottom of the messages container when new messages arrive
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
          Conversación con {receiverName}
        </Text>
        {messages.map((msg, index) => (
          <Flex
            key={index}
            direction={msg.sender === receiverId ? 'row' : 'row-reverse'}
            mb={2}
            align="center"
          >
            <Avatar
              name={msg.sender}
              src={`https://api.adorable.io/avatars/40/${msg.sender}.png`} // Usando un servicio para avatares
              size="sm"
              mr={3}
              bg={msg.sender === receiverId ? 'blue.200' : 'green.200'}
            />
            <Box>
              <Text
                fontWeight="bold"
                color={msg.sender === receiverId ? 'blue.600' : 'green.600'}
              >
                {msg.sender}
              </Text>
              <Text>{msg.text}</Text>
              <Text fontSize="sm" color="gray.500">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </Text>
              {index < messages.length - 1 && <Divider my={2} />}
            </Box>
          </Flex>
        ))}
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
