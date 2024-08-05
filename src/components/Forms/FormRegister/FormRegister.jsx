import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import apiCall from '../../../utils/API/api';
import { Container, VStack, Button, Heading, Text, Link, Alert, AlertIcon} from '@chakra-ui/react';
import  PersonalInfo from './PersonalInfo'
import HealthInfo  from './HealthInfo'

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

  const onSubmit = async (data) => {
    setErrorMessage('');  
    console.log("Valores del formulario:", data);
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('password', data.password);
    if (data.img && data.img.length > 0) {
      formData.append('img', data.img[0]); // Aquí no necesitas .file
    } else {
      console.log('No se seleccionó ningún archivo');
    }
    formData.append('birthDate', data.birthDate);
    formData.append('averageCycleLength', data.averageCycleLength);
    formData.append('averagePeriodLength', data.averagePeriodLength);

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await apiCall({
        method: 'POST',
        endpoint: '/auth/register',
        body: formData,
        isFormData: true
      });
      console.log('Respuesta de la API:', response);
    } catch (error) {
      if (error.response && error.response.data) {
        // Mostrar mensaje de error específico del backend si está disponible
        setErrorMessage(error.response.data.message || 'Error al enviar la solicitud');
      } else {
        // Mostrar mensaje genérico de error
        setErrorMessage(error.message || 'Error al enviar la solicitud');
      }
      console.error('Error al enviar la solicitud:', error);
    }
  };

  return (
    <Container maxW="md" mt={8} mb={8} p={6} borderWidth={1} borderRadius="lg" boxShadow="lg" bg="var(--color-white)">
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
            <Button colorScheme="pink" type="submit" size="lg" width="full">Registrarse</Button>
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





// const FormRegister = () => {
//   const { register, handleSubmit } = useForm({
//     defaultValues: {
//       name: '',
//       email: '',
//       password: '',
//       img: null
//     },
//   });

//   const [showPassword, setShowPassword] = React.useState(false);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0]; 
//     if (file) {
//       return file;
//     }
//     return null;
//   }

//   const onSubmit = async (data) => {
//     console.log("Valores del formulario:", data);
//     const formData = new FormData();
//     formData.append('name', data.name);
//     formData.append('email', data.email);
//     formData.append('password', data.password);
//     if(data.img){
//       formData.append('img', data.img[0]);
//     }
//     try {
//       const response = await apiCall({
//         method: 'POST',
//         endpoint: '/auth/register',
//         body: formData,
//         isFormData: true
//       });
//       console.log('Respuesta de la API:', response);
//     } catch (error) {
//       console.error('Error al enviar la solicitud:', error);
//     }
//   };

//   return (
//     <Container maxW="md" mt={8} p={6} borderWidth={1} borderRadius="lg" boxShadow="lg">
//       <Heading as="h2" size="xl" textAlign="center" mb={4}>Registrarse</Heading>
//       <Text textAlign="center" mb={6}>Escribe tus datos a continuación y !ya puedes empezar!</Text>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <VStack spacing={4}>
//           <FormControl id="name" isRequired>
//             <FormLabel>Nombre</FormLabel>
//             <Input type="text" placeholder="Nombre" {...register('name')} />
//           </FormControl>
//           <FormControl id="email" isRequired>
//             <FormLabel>Email</FormLabel>
//             <Input type="email" placeholder="Email" {...register('email')} />
//           </FormControl>
//           <FormControl id="password" isRequired>
//             <FormLabel>Contraseña</FormLabel>
//             <InputGroup>
//               <Input type={showPassword ? "text" : "password"} placeholder="Contraseña" {...register('password')} />
//               <InputRightElement h="full">
//                 <Button variant="ghost" onClick={() => setShowPassword(!showPassword)}>
//                   {showPassword ? <ViewOffIcon /> : <ViewIcon />}
//                 </Button>
//               </InputRightElement>
//             </InputGroup>
//           </FormControl>
//           <FormControl id="img">
//           <FormLabel>Imagen de perfil</FormLabel>
//             <Input type="file" {...register('img')} onChange={handleFileChange} />
//           </FormControl>
//           <Button colorScheme="pink" type="submit" size="lg" width="full">Registrarse</Button>
//         </VStack>
//       </form>
//       <Text textAlign="center" mt={4}>
//         ¿Ya tienes una cuenta? <Link color="blue.500" href="Login">Inicia sesión</Link>
//       </Text>
//     </Container>
//   );
// };

// export default FormRegister


// import React from 'react';
// import { useForm } from 'react-hook-form';
// import apiCall from '../../../utils/API/api'
// import './FormRegister.css'
// import { Container, FormControl, FormLabel, Input, VStack, Button } from '@chakra-ui/react';

// const FormRegister = () => {
//   const { register, handleSubmit } = useForm({
//     defaultValues: {
//       name: '',
//       email: '',
//       password: '',
//       img: null
//     },
//   });

//   const handleFileChange = (e) => {
//     const file = e.target.files[0]; 
//     if (file) {
//       return file;
//     }
//     return null;
//   }

//   const onSubmit = async (data) => {
//     console.log("Valores del formulario:", data);
//     const formData = new FormData();
//     formData.append('name', data.name);
//     formData.append('email', data.email);
//     formData.append('password', data.password);
//     if(data.img){
//       formData.append('img', data.img[0]);
//     }
//     try {
//       const response = await apiCall({
//         method: 'POST',
//         endpoint: '/auth/register',
//         body: formData,
//         isFormData: true
//       });
//       console.log('Respuesta de la API:', response);
//     } catch (error) {
//       console.error('Error al enviar la solicitud:', error);
//     }
//   };
// return (
// <form onSubmit={handleSubmit(onSubmit)} className='register-form'>
// <label>Nombre</label>
// <input type="text" {...register('name')} required/>
  
//  <label>Email</label>
//  <input type="text" {...register('email')} required/>
  
//  <label>Contraseña</label>
//  <input type="password" {...register('password')} required/>
//  <input
//   type='file'
//   {...register('img')}
//    onChange={handleFileChange} 
//   />
  
//   <button type="submit">Enviar</button>
// </form> 
//   );
// };


// export default FormRegister;


{/* <Container>
      <VStack as="form" onSubmit={handleSubmit(onSubmit)} spacing={4} >
        <FormControl>
          <FormLabel >Nombre</FormLabel>
          <Input type="text" {...register('name')} />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type="email" {...register('email')} />
        </FormControl>
        <FormControl>
          <FormLabel>Contraseña</FormLabel>
          <Input type="password" {...register('password')} />
        </FormControl>
        <FormControl>
          <FormLabel>Imagen</FormLabel>
          <Input type="file" {...register('img')} />
        </FormControl>
        <Button type="submit" colorScheme="orange">
          Submit
        </Button>
      </VStack>
    </Container> */}

