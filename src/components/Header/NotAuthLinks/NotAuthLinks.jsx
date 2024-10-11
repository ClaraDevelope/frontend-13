import { Box, Button } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import '../Header.css'

const NonAuthLinks = () => (
  <Box as="ul" className="non-auth-links" mt="30px">
    <li>
      <Link to='/Login' id='login-link'>
      <Button id='login-link' variant='outline' 
      colorScheme="whiteAlpha" color="white" boxShadow="lg" mr="10px">Iniciar sesión</Button>
      </Link>
    </li>
    <li>
      <Link to='/Register' id='register-link' >
      <Button 
        colorScheme='orange' 
        variant='solid'
        boxShadow="lg"
        >
      Registrarse
  </Button>
      </Link>
    </li>
  </Box>
);

export default NonAuthLinks;