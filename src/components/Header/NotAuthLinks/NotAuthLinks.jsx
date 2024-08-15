import { Button } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

const NonAuthLinks = () => (
  <>
    <li>
      <Link to='/Login' id='login-link' className='nav-link'>Iniciar sesión</Link>
    </li>
    <li>
      <Link to='/Register' id='register-link'>
      <Button 
        colorScheme='orange' 
        variant='solid'
        // background="pink.500"
        >
      Registrarse
  </Button>
      </Link>
    </li>
  </>
);

export default NonAuthLinks;