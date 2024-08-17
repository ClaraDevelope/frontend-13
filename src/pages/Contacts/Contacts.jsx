import React, { useEffect, useState } from 'react';
import { Card, Button, Image, Text, Box, VStack, Avatar } from '@chakra-ui/react';
import useApiCall from '../../hooks/useApiCall/useApiCall';
import { useAuth } from '../../providers/AuthProvider';
import ButtonToChat from '../../components/ButtonToChat/ButtonToChat';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const callApi = useApiCall();
  const {user} = useAuth()
  const token = user.token

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await callApi({
          method: 'GET',
          endpoint: '/auth/contacts',
          token: token,
        });
        setContacts(response.contacts); 
      } catch (error) {
        console.error('Error al obtener los contactos:', error);
      }
    };

    fetchContacts();
  }, [token]);

  
  return (
    <VStack spacing={4} align="stretch"  mt="100px" mb="50px">
      {contacts.map((contact) => (
        <Card
          key={contact.user._id}
          mb={4}
          p={4}
          boxShadow="md"
          display="flex"
          alignItems="center"
          maxW={{ base: '100%', md: '400px' }} 
          w="full" 
          mx="auto"
        >
          <Avatar
           size="lg"
            src={contact.user.profile.img || 'https://via.placeholder.com/50'}
            alt={contact.user.profile.name}
            boxSize="50px"
            borderRadius="full"
            mr={4}
          />
          <Box flex="1">
            <Text fontWeight="bold">{contact.user.profile.name}</Text> {/* Nombre del contacto */}
            <Text fontSize="sm" color="gray.500">{contact.user.profile.email}</Text> {/* Email del contacto */}
          </Box>
         <ButtonToChat userId={contact.user._id}/>
        </Card>
      ))}
    </VStack>
  );
};

export default Contacts;
