import React, { useState, useEffect } from 'react';
import { VStack, Box, useToast } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import useSocket from '../../hooks/useSocket/useSocket';
import useApiCall from '../../hooks/useApiCall/useApiCall';
import { getCurrentUserId } from '../../utils/getCurrentUserId';
import MessageList from '../../components/MessageList/MessageList';
import MessageInput from '../../components/MessageInput/MessageInput';

const ChatPage = () => {
  const { receiverId } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [receiver, setReceiver] = useState(null);
  const toast = useToast();
  const callApi = useApiCall();
  const currentUserId = getCurrentUserId();

  const { sendMessage } = useSocket(receiverId, (data) => {
    setMessages(prevMessages => [...prevMessages, data]);
  });

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { success, messages } = await callApi({
          method: 'GET',
          endpoint: `/messages/${receiverId}?currentUserId=${currentUserId}`,
          token: localStorage.getItem('token'),
          server: true
        });

        if (success) {
          setMessages(messages);
          if (!receiver) {
            const receiverData = await fetchReceiverData(receiverId);
            setReceiver(receiverData);
          }
        } else {
          throw new Error('Error al obtener los mensajes del receptor');
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchReceiverData = async (id) => {
      try {
        const { profile } = await callApi({
          method: 'GET',
          endpoint: `/auth/${id}`,
          token: localStorage.getItem('token'),
        });

        return profile || null;
      } catch (error) {
        console.error(error);
        return null;
      }
    };

    if (receiverId) fetchMessages();
  }, [receiverId, currentUserId]);

  const handleSendMessage = async () => {
    if (!message.trim()) {
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
      const { success, error } = await callApi({
        method: 'POST',
        endpoint: '/send',
        token: localStorage.getItem('token'),
        body: { receiverId, text: message },
        server: true,
      });

      if (success) {
        setMessages(prevMessages => [...prevMessages, { sender: currentUserId, text: message, timestamp: new Date() }]);
        setMessage('');

        const { messages, error: fetchError } = await callApi({
          method: 'GET',
          endpoint: `/messages/${receiverId}?currentUserId=${currentUserId}`,
          token: localStorage.getItem('token'),
          server: true,
        });

        if (messages) {
          setMessages(messages);
        } else {
          toast({
            title: 'Error',
            description: fetchError || 'No se pudo obtener los mensajes actualizados.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }
      } else {
        throw new Error(error || 'No se pudo enviar el mensaje.');
      }
    } catch (error) {
      console.error(error);
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
    document.getElementById('messages-end')?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <VStack spacing={4} align="stretch" p={4} maxW="600px" mx="auto" mt={{ base: '100px', md: '0' }}>
      <Box borderWidth={1} borderRadius="lg" p={4} bg="gray.50" overflowY="scroll" h="500px" borderColor="gray.200">
        <MessageList messages={messages} currentUserId={currentUserId} receiver={receiver} />
        <Box id="messages-end" />
      </Box>
      <MessageInput message={message} setMessage={setMessage} handleSendMessage={handleSendMessage} />
    </VStack>
  );
};

export default ChatPage;