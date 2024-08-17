import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa'; // Importa el icono de búsqueda
import { Input, Button, Box, List, ListItem, Image, Text, Flex } from '@chakra-ui/react'; // Componentes de Chakra UI
import useApiCall from '../../hooks/useApiCall/useApiCall'; 
// import { useAuth } from '../../providers/AuthProvider';
import './InputSearchUsers.css'
import ButtonSearchUsers from '../ButonSearchUsers/ButtonSearchUsers';

const InputSearchUsers = ({user}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const callApi = useApiCall();
  const token = user.token;

  const handleSearch = async () => {
    if (searchTerm.trim() === '') {
      setResults([]);
      setHasSearched(false);
      return;
    }

    try {
      const data = await callApi({
        method: 'GET',
        endpoint: `/auth/search?query=${encodeURIComponent(searchTerm)}`,
        token: token
      });
      setResults(data);
      setHasSearched(true);
    } catch (error) {
      console.error('Error al buscar usuarios:', error);
    }
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); 
      handleSearch();
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setResults([]);
      setSearchTerm('');
      setHasSearched(false);
    }, 100);
  };

  return (
    <Box position="relative" flex="1" maxWidth="400px" ml={4}>
      <Box as="form" onSubmit={(e) => e.preventDefault()} display="flex" alignItems="center">
        <Input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          bg="white"
          placeholder="Buscar usuarios"
          borderColor="gray.300"
          focusBorderColor="blue.500"
          size="md"
          width="auto"
          flex="1"
        />
        <Button
          onClick={handleSearch}
          colorScheme="blue"
          bg="blue.700"
          variant="solid"
          ml={2}
          size="md"
          borderRadius="md"
        >
          <FaSearch />
        </Button>
      </Box>

      {hasSearched && (
        <Box position="absolute" top="100%" left="0" width="100%" border="1px" borderColor="gray.300" borderRadius="md" bg="white" zIndex="dropdown">
          <List spacing={3} maxHeight="200px" overflowY="auto">
            {results.length > 0 ? (
              results.map((user) => (
                <ListItem key={user._id} display="flex" alignItems="center" p={2} borderBottom="1px" borderColor="gray.200">
                  <Flex flex="1" alignItems="center">
                    {user.profile.img && (
                      <Image
                        src={user.profile.img}
                        alt={user.profile.name}
                        boxSize="40px"
                        borderRadius="full"
                        mr={2}
                      />
                    )}
                    <Text fontSize="md" color="gray.800">{user.profile.name}</Text>
                  </Flex>
                  <ButtonSearchUsers token={token} userToContact={user._id}/>
                </ListItem>
              ))
            ) : (
              <ListItem p={2}>No se encontraron resultados</ListItem>
            )}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default InputSearchUsers;
