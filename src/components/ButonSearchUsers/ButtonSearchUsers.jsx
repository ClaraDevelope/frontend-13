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
      setIsContact(contacts.some(contact => contact._id === userToContact));
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
    <Button ml="auto" size="sm" onClick={handleAddContact} disabled={isContact || requestSent}>
      {isContact ? 'Ya es tu contacto' : requestSent ? 'Solicitud enviada' : 'Añadir contacto'}
    </Button>
  );
};

export default ButtonSearchUsers;




