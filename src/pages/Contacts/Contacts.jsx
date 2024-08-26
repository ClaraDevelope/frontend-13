import React, { useEffect, useState } from 'react';
import { Card, Text, Box, Avatar, SimpleGrid } from '@chakra-ui/react';
import useApiCall from '../../hooks/useApiCall/useApiCall';
import { useAuth } from '../../providers/AuthProvider';
import ButtonToChat from '../../components/ButtonToChat/ButtonToChat';
import { useNavigate } from 'react-router-dom';

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const callApi = useApiCall();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await callApi({
          method: 'GET',
          endpoint: '/auth/contacts',
          token: user?.token,
        });
        setContacts(response.contacts); 
      } catch (error) {
        console.error('Error al obtener los contactos:', error);
      }
    };

    fetchContacts();
  }, [user?.token]);

  const handleChatClick = (user) => { 
    navigate(`/Chat/${user._id}`); 
  };

  return (
    <SimpleGrid 
      columns={{ base: 1, sm: 2, md: 3, lg: 4 }} 
      spacing={4} 
      m={{ base: '100px 0', md: '20px 100px' }}
    >
      {contacts.map((contact) => (
        <Card
          key={contact.user._id}
          p={4}
          boxShadow="md"
          display="flex"
          alignItems="center"
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
            <Text fontWeight="bold">{contact.user.profile.name}</Text>
            <Text fontSize="sm" color="gray.500">{contact.user.profile.email}</Text>
          </Box>
          <ButtonToChat user={contact.user} onClick={() => handleChatClick(contact.user)} />
        </Card>
      ))}
    </SimpleGrid>
  );
};

export default Contacts;
