import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { Container, VStack, Button, Heading, Text, Link, Alert, AlertIcon} from '@chakra-ui/react';
import  PersonalInfo from './PersonalInfo'
import HealthInfo  from './HealthInfo'
import useApiCall from '../../../hooks/useApiCall/useApiCall';
import { useAuth } from '../../../providers/AuthProvider';
import { useNavigate } from 'react-router-dom';

const FormRegister = () => {
  const methods = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      img: null,
      birthDate: '',
      averagePeriodLength: '',
      averageCycleLength: ''
    },
  });

  const { handleSubmit } = methods;
  const [errorMessage, setErrorMessage] = useState('');
  const apiCall = useApiCall()
  const { login } = useAuth(); 
  const navigate = useNavigate()

  const onSubmit = async (data) => {
    setErrorMessage('');  
    console.log("Valores del formulario:", data);
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('password', data.password);
    if (data.img && data.img.length > 0) {
      formData.append('img', data.img[0]); 
    } else {
      console.log('No se seleccionó ningún archivo');
    }
    formData.append('birthDate', data.birthDate);
    formData.append('averageCycleLength', data.averageCycleLength);
    formData.append('averagePeriodLength', data.averagePeriodLength);
  
    try {
      const registerResponse = await apiCall({
        method: 'POST',
        endpoint: '/auth/register',
        body: formData,
        isFormData: true
      });
      // console.log('Respuesta de la API:', registerResponse);
  
      const loginResponse = await apiCall({
        method: 'POST',
        endpoint: '/auth/login',
        body: {
          email: data.email,
          password: data.password
        }
      });
      // console.log('Respuesta del login:', loginResponse);
  
      login(loginResponse.token, loginResponse.user);
      navigate('/Principal');
  
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || 'Error al enviar la solicitud');
      } else {
        setErrorMessage(error.message || 'Error al enviar la solicitud');
      }
      console.error('Error al enviar la solicitud:', error);
    }
  };

  return (
    <Container maxW="md" mt="10" mb={8} p={6} borderWidth={1} borderRadius="lg" boxShadow="lg" bg="var(--color-white)">
      <Heading as="h2" size="xl" textAlign="center" mb={4}>Registrarse</Heading>
      <Text textAlign="center" mb={6}>Escribe tus datos a continuación y ¡ya puedes empezar!</Text>
      {errorMessage && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {errorMessage}
        </Alert>
      )}
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing={4}>
            <PersonalInfo />
            <HealthInfo />
            <Button colorScheme="orange" type="submit" size="lg" width="full">Registrarse</Button>
          </VStack>
        </form>
      </FormProvider>
      <Text textAlign="center" mt={4}>
        ¿Ya tienes una cuenta? <Link color="blue.500" href="Login">Inicia sesión</Link>
      </Text>
    </Container>
  );
};

export default FormRegister;