import { Box, Button } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import '../Header.css'

const NonAuthLinks = () => (
  <Box as="ul" className="non-auth-links">
    <li>
      <Link to='/Login' id='login-link' className='nav-link'>Iniciar sesión</Link>
    </li>
    <li>
      <Link to='/Register' id='register-link'>
      <Button 
        colorScheme='orange' 
        variant='solid'
        >
      Registrarse
  </Button>
      </Link>
    </li>
  </Box>
);

export default NonAuthLinks;