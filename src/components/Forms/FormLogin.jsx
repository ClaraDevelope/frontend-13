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
import { useAuth } from '../../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';
import useApiCall from '../../hooks/useApiCall/useApiCall';

const FormLogin = () => {
  const methods = useForm();
  const { handleSubmit, formState: { errors } } = methods;
  const [errorMessage, setErrorMessage] = React.useState('');
  const { login } = useAuth(); 
  const navigate = useNavigate();
  const apiCall = useApiCall()


  const onSubmit = async (data) => {
    setErrorMessage(''); 

    try {
      const response = await apiCall({
        method: 'POST',
        endpoint: '/auth/login',
        body: data
      });

      console.log('Respuesta del login:', response);

      if (response.token && response.user) {

        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));

        login(response.token, response.user);


        navigate('/Principal');
      } else {
        throw new Error('Token o datos del usuario no recibidos en la respuesta.');
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      setErrorMessage('Error al iniciar sesión. Por favor, verifica tus datos.');
    }
  };

  return (
    <Container maxW="md" p={6} mt="10" mb="130px" borderWidth={1}  borderRadius="lg"  boxShadow="lg"  bg="var(--color-white)" position="relative" zIndex="999">
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
            <Button colorScheme="orange" type="submit" size="lg" width="full">Iniciar sesión</Button>
          </VStack>
        </form>
      </FormProvider>
      <Text textAlign="center" mt={4}>
        ¿No tienes una cuenta? <Link color="blue.500" href="/register">Regístrate</Link>
      </Text>
    </Container>
  );
};

export default FormLogin;