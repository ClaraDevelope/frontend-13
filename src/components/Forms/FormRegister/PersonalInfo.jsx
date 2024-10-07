import React, { useState } from 'react'; // Importa useState
import { useFormContext } from 'react-hook-form';
import { 
  FormControl, 
  FormLabel, 
  Input, 
  Button, 
  InputGroup, 
  InputRightElement 
} from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';

const PersonalInfo = () => {
  const { register } = useFormContext();
  const [showPassword, setShowPassword] = useState(false); 

  const handleClick = () => {
    setShowPassword((prev) => !prev); 
  };

  return (
    <>
      <FormControl id="name" isRequired>
        <FormLabel>Nombre</FormLabel>
        <Input type="text" placeholder="Nombre" {...register('name')} />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input type="email" placeholder="Email" {...register('email')} />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Contraseña</FormLabel>
        <InputGroup>
          <Input 
            type={showPassword ? 'text' : 'password'} 
            placeholder="Contraseña" 
            {...register('password')} 
          />
          <InputRightElement h="full">
            <Button variant="ghost" onClick={handleClick}>
              <ViewIcon />
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="img">
        <FormLabel>Imagen de perfil</FormLabel>
        <Input type="file" {...register('img')} />
      </FormControl>
    </>
  );
};

export default PersonalInfo;
