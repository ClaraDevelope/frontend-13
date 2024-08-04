import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import {
  Container,
  Heading,
  Text,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
  Link
} from '@chakra-ui/react';
import apiCall from '../../utils/API/api';
import { useAuth } from '../../providers/AuthProvider';


const Login = () => {
  const methods = useForm();
  const { handleSubmit, formState: { errors } } = methods;
  const [errorMessage, setErrorMessage] = React.useState('');
  const { login } = useAuth(); 

  const onSubmit = async (data) => {
    try {
      const response = await apiCall({
        method: 'POST',
        endpoint: '/auth/login',
        body: data
      });
      console.log('Respuesta del login:', response);

      localStorage.setItem('token', response.token);
      login(); 
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      setErrorMessage('Error al iniciar sesión. Por favor, verifica tus datos.');
    }
  };

  return (
    <Container maxW="md" mt={8} p={6} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Heading as="h2" size="xl" textAlign="center" mb={4}>Iniciar sesión</Heading>
      <Text textAlign="center" mb={6}>Introduce tus datos para acceder a tu cuenta.</Text>
      {errorMessage && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {errorMessage}
        </Alert>
      )}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" placeholder="Email" {...methods.register('email', { required: true })} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Contraseña</FormLabel>
              <Input type="password" placeholder="Contraseña" {...methods.register('password', { required: true })} />
            </FormControl>
            <Button colorScheme="pink" type="submit" size="lg" width="full">Iniciar sesión</Button>
          </VStack>
        </form>
      </FormProvider>
      <Text textAlign="center" mt={4}>
        ¿No tienes una cuenta? <Link color="blue.500" href="/register">Regístrate</Link>
      </Text>
    </Container>
  );
};

export default Login;
