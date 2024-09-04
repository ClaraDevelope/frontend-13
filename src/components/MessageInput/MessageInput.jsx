import React from 'react';
import { Input, Button, HStack } from '@chakra-ui/react';

const MessageInput = ({ message, setMessage, handleSendMessage }) => (
  <HStack spacing={2}>
    <Input placeholder="Escribe un mensaje..." value={message} onChange={(e) => setMessage(e.target.value)} />
    <Button onClick={handleSendMessage} colorScheme="blue">
      Enviar
    </Button>
  </HStack>
);

export default MessageInput;

