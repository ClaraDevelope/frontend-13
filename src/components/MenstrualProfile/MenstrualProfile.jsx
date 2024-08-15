import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Box, Heading, Stack, Input, Button, FormControl, FormLabel, 
  useColorModeValue, Alert, AlertIcon, AlertTitle 
} from '@chakra-ui/react';
import useApiCall from '../../hooks/useApiCall/useApiCall';

const MenstrualProfile = ({ user }) => {
  const [successMessage, setSuccessMessage] = useState('');
  const { register, handleSubmit, reset } = useForm();
  const callApi = useApiCall();
  const token = user.token;
  
  const onSubmit = async (data) => {
    try {
      const result = await callApi({
        method: 'POST',
        endpoint: '/cycle/new',
        body: data,
        token: token,
      });

      console.log('Respuesta de la API:', result);
      

      setSuccessMessage('Datos menstruales cambiados con éxito');
      reset();
    } catch (error) {
      console.error('Error al cambiar los datos menstruales:', error);
    }
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
      alignItems="center"
      boxShadow="lg"
      p={6}
      bg={useColorModeValue('white', 'gray.800')}
    >
      {/* Muestra el Alert si hay un mensaje de éxito */}
      {successMessage && (
        <Alert status="success" borderRadius="md" mb={4}>
          <AlertIcon />
          <AlertTitle>{successMessage}</AlertTitle>
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="column" spacing={6} align="center" textAlign="center">
          <Heading fontSize="xl">Datos menstruales</Heading>

          <FormControl id="cycle-length" textAlign="center">
            <FormLabel>Duración del ciclo (días)</FormLabel>
            <Input
              type="number"
              placeholder="Ej: 28 (días)"
              size="md"
              textAlign="center"
              width="300px"
              {...register('averageCycleLength', { required: true })}
            />
          </FormControl>

          <FormControl id="menstruation-length" textAlign="center">
            <FormLabel>Duración de la menstruación (días)</FormLabel>
            <Input
              type="number"
              placeholder="Ej: 4 (días)"
              size="md"
              textAlign="center"
              width="300px"
              {...register('averagePeriodLength', { required: true })}
            />
          </FormControl>

          <Button colorScheme="orange" type="submit">
            Cambiar datos menstruales
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default MenstrualProfile;
