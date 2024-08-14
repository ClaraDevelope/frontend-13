import React from 'react';
import { Box, Heading, Stack, Avatar, Button, useColorModeValue } from '@chakra-ui/react';
import './Wellcome.css'

const Wellcome = ({ user }) => {
  const handleChangeImage = () => {
    console.log('Cambiar imagen de perfil');
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
        <Avatar size="xl" src={user.profile.img} alt="avatar" mb={4} />
        <Heading fontSize={'xl'}>Hola de nuevo {user.profile.name}</Heading>
        <Button colorScheme="pink" mt="80px" onClick={handleChangeImage} className='wellcome-button'>
          Cambiar imagen de perfil
        </Button>
      </Stack>
    </Box>
  );
};

export default Wellcome;
