import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Box textAlign="center" py={10} px={6} height="50svh">
      <Heading
        display="inline-block"
        as="h1"
        size="4xl"
        bgGradient="linear(to-r, red.400, red.600)"
        backgroundClip="text"
      >
        404
      </Heading>
      <Text fontSize="2xl" mt={3} mb={2}>
        Página no encontrada
      </Text>
      <Text color={'gray.700'} mb={6}>
        Lo sentimos, la página que buscas no existe.
      </Text>
      <Button
        as={Link}
        to="/"
        colorScheme="red"
        bgGradient="linear(to-r, red.400, red.500, red.600)"
        color="white"
        variant="solid"
      >
        Volver al Inicio
      </Button>
    </Box>
  );
};

export default NotFound;
