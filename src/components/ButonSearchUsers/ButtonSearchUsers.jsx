import { Button, useToast } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import useApiCall from '../../hooks/useApiCall/useApiCall';
import useNotifications from '../../hooks/useNotifications/useNotifications';

const ButtonSearchUsers = ({ token, userToContact }) => {
  const callApi = useApiCall();
  const toast = useToast();
  const { contacts } = useNotifications(); 
  const [requestSent, setRequestSent] = useState(false);
  const [isContact, setIsContact] = useState(false);

  useEffect(() => {
    if (contacts.length > 0) {
      const contactExists = contacts.some(contact => {
        console.log(`Verificando si el usuario con ID ${contact.user._id} es igual al usuario buscado ${userToContact}`);
        return contact.user._id === userToContact;
      });
      
      if (contactExists) {
        setIsContact(true);
      }
    }
  }, [contacts, userToContact]);

  const handleAddContact = async () => {
    try {
      const response = await callApi({
        method: 'POST',
        endpoint: `/auth/add/${userToContact}`,
        token: token,
      });
      
      toast({
        title: 'Solicitud enviada',
        description: response.message,
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });

      setRequestSent(true);
    } catch (error) {
      toast({
        title: 'Error al enviar solicitud',
        description: 'No se pudo enviar la solicitud. Intenta de nuevo más tarde.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  return (
    <Button
      ml="auto"
      size="sm"
      onClick={handleAddContact}
      isDisabled={requestSent} 
      colorScheme={isContact ? 'green' : requestSent ? 'black' : 'blue'} 
      variant={requestSent ? 'outline' : 'solid'} 
      sx={isContact ? { pointerEvents: 'none', opacity: 1 } : {}}
    >
      {isContact ? 'Ya es tu contacto' : requestSent ? 'Solicitud enviada' : 'Añadir contacto'}
    </Button>
  );
};

export default ButtonSearchUsers;






