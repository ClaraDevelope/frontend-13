import React, { useState } from 'react';
import { 
  Box, Text, Heading, Stack, Input, Button, 
  useColorModeValue, FormControl, FormLabel, Alert, AlertIcon, AlertTitle 
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import useApiCall from '../../hooks/useApiCall/useApiCall'; 

const Personal = ({ user }) => {
  const [successMessage, setSuccessMessage] = useState('');
  const token = user.token;
  const callApi = useApiCall();

  const { register, handleSubmit, setError, clearErrors, reset, formState: { errors } } = useForm();
  
  const onSubmit = async (data) => {
    const { newPassword, confirmPassword } = data;

    if (newPassword !== confirmPassword) {
      setError('confirmPassword', { type: 'manual', message: 'Las contraseñas no coinciden' });
      return;
    }

    const payload = {
      password: newPassword
    };

    try {
      const response = await callApi({
        method: 'PATCH',
        endpoint: `/auth/${user._id}/update`, 
        body: payload,
        token: token
      });

      console.log('Respuesta del servidor:', response); 

      if (response && response.profile) {
        setSuccessMessage('Contraseña cambiada con éxito'); 
        clearErrors();
        reset(); 
      } else {
        console.error('Error al cambiar la contraseña:', response.message || 'Error desconocido');
      }
    } catch (error) {
      console.error('Error en la llamada a la API:', error);
    }
  };

  return (
    <Box
      width="100%"
      height="100%"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      bg={useColorModeValue('white', 'gray.800')}
    >
      <Stack direction="column" spacing={4} align="center" textAlign="center" p={4}>
        <Heading fontSize={'xl'}>Datos de perfil:</Heading>
        <Text color={useColorModeValue('gray.700', 'gray.400')}>{user.profile.email}</Text>
        
        {successMessage && (
          <Alert status="success" borderRadius="md" mb={4}>
            <AlertIcon />
            <AlertTitle>{successMessage}</AlertTitle>
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl id="new-password" isInvalid={!!errors.newPassword}>
            <FormLabel>Nueva contraseña</FormLabel>
            <Input
              type="password"
              placeholder="Introduce tu nueva contraseña"
              {...register('newPassword', { required: 'La nueva contraseña es obligatoria' })}
            />
            {errors.newPassword && <Text color="red.500">{errors.newPassword.message}</Text>}
          </FormControl>

          <FormControl id="confirm-password" isInvalid={!!errors.confirmPassword}>
            <FormLabel>Repetir contraseña</FormLabel>
            <Input
              type="password"
              placeholder="Repite la nueva contraseña"
              {...register('confirmPassword', { required: 'La confirmación de la contraseña es obligatoria' })}
            />
            {errors.confirmPassword && <Text color="red.500">{errors.confirmPassword.message}</Text>}
          </FormControl>

          <Button colorScheme="orange" mt={4} type="submit">
            Cambiar contraseña
          </Button>
        </form>
      </Stack>
    </Box>
  );
};

export default Personal;

