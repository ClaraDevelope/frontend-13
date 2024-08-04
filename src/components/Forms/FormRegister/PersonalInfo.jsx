import React from 'react';
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
          <Input type="password" placeholder="Contraseña" {...register('password')} />
          <InputRightElement h="full">
            <Button variant="ghost">
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

export default PersonalInfo