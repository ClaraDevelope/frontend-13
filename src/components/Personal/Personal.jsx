import React, { useState } from 'react';
import { Box, Text, Heading, Stack, Input, Button, useColorModeValue, FormControl, FormLabel } from '@chakra-ui/react';

const Personal = ({ user }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    // Lógica para cambiar la contraseña
    console.log('Contraseña cambiada:', newPassword);
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

        <FormControl id="new-password">
          <FormLabel>Nueva contraseña</FormLabel>
          <Input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Introduce tu nueva contraseña"
          />
        </FormControl>

        <FormControl id="confirm-password">
          <FormLabel>Repetir contraseña</FormLabel>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Repite la nueva contraseña"
          />
        </FormControl>

        <Button colorScheme="pink" onClick={handlePasswordChange}>
          Cambiar contraseña
        </Button>
      </Stack>
    </Box>
  );
};

export default Personal;


