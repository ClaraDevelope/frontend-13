import React, { useState } from 'react';
import { Box, Heading, Stack, Input, Button, FormControl, FormLabel, useColorModeValue } from '@chakra-ui/react';

const MenstrualProfile = ({ user }) => {
  const [cycleLength, setCycleLength] = useState('');
  const [menstruationLength, setMenstruationLength] = useState('');

  const handleDataChange = () => {
    console.log('Ciclo menstrual:', cycleLength);
    console.log('Duración de la menstruación:', menstruationLength);
  };

  return (
    <Box
      width="100%"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"  // Alinea al centro en el eje transversal
      boxShadow="lg"
      p={6}
      bg={useColorModeValue('white', 'gray.800')}
    >
      <Stack direction="column" spacing={6} align="center" textAlign="center">
        <Heading fontSize="xl">Datos menstruales</Heading>

        <FormControl id="cycle-length" textAlign="center">
          <FormLabel>Duración del ciclo (días)</FormLabel>
          <Input
            type="number"
            value={cycleLength}
            onChange={(e) => setCycleLength(e.target.value)}
            placeholder="Duración del ciclo"
            size="md" 
            textAlign="center"  
            width="300px" 
          />
        </FormControl>

        <FormControl id="menstruation-length" textAlign="center">
          <FormLabel>Duración de la menstruación (días)</FormLabel>
          <Input
            type="number"
            value={menstruationLength}
            onChange={(e) => setMenstruationLength(e.target.value)}
            placeholder="Duración de la menstruación"
            size="md"  
            textAlign="center"  
            width="300px"  
          />
        </FormControl>

        <Button colorScheme="pink" onClick={handleDataChange}>
          Cambiar datos menstruales
        </Button>
      </Stack>
    </Box>
  );
};

export default MenstrualProfile;

