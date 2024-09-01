import { Button, useToast } from '@chakra-ui/react';
import React from 'react';
import useApiCall from '../../hooks/useApiCall/useApiCall';

const ButtonSearchUsers = ({ token, userToContact }) => {
  const callApi = useApiCall();
  const toast = useToast();

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
    <Button ml="auto" size="sm" onClick={handleAddContact}>
      Añadir contacto
    </Button>
  );
};

export default ButtonSearchUsers;

