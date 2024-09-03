import React from 'react';
import { Button } from '@chakra-ui/react';

const ButtonToChat = ({ user, onClick }) => {
  return (
    <Button ml="auto"
          size="sm"
          colorScheme="blue"
          bg="blue.700" onClick={() => onClick(user)}>
      Iniciar Chat
    </Button>
  );
};

export default ButtonToChat;