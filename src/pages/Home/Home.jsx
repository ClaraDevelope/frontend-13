import React from 'react';
import { Flex, Box, Heading, Text, Button, Stack, Img } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import NonAuthLinks from '../../components/Header/NotAuthLinks/NotAuthLinks';
import './Home.css';

const Home = () => {
  return (
    <Flex className="landing-container" direction="column" alignItems="center">
      <Flex justifyContent="center" mt="4">
        <Box position="relative" >
        <Img
          src="/tarot.jpg"
          borderRadius="50%"
          opacity="75%"
          w="550px"
          height={{ base: "420px", md: "auto" }}  
          maxHeight="550px"
          objectFit="cover"
          zIndex={-1}
        />
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            textAlign="center"
            color="white"
          >
            <Heading as="h1" size={{ base: "xl", md: "2xl" }} mb="8"color="var(--color-white)" className="home-title"minWidth="500px" pr="10" pl="10"
            >
  Tu bienestar, nuestra comunidad
</Heading>
            <Text fontSize="xl" mb="4"  color="var(--color-light-gray)" maxWidth="350px" ml="75px" fontWeight="bold">
              Una app para monitorear tu salud y unirte a una comunidad de apoyo.
            </Text>
            <NonAuthLinks />
          </Box>
        </Box>
      </Flex>
      <Box mt="8" p="4" textAlign="center">
        <Heading as="h2" size="xl" mb="6">
          ¿Por qué unirte a nuestra comunidad?
        </Heading>
        <Stack direction={['column', 'row']} spacing="6" justifyContent="center" alignItems="center">
        <Box maxW="300px" p="4" borderWidth="1px" borderRadius="lg" bg="var(--color-background)" boxShadow="md" >
          <Heading as="h3" size="md" mb="2">Organiza tu ciclo</Heading>
          <Text>Usa el calendario integrado para planificar y gestionar cada fase de tu ciclo.</Text>
        </Box>
        <Box maxW="300px" p="4" borderWidth="1px" borderRadius="lg" bg="var(--color-background)" boxShadow="md" >
          <Heading as="h3" size="md" mb="2">Comparte y descubre</Heading>
          <Text>Publica y explora en la comunidad para aprender y compartir.</Text>
       </Box>
       <Box maxW="300px" p="4" borderWidth="1px" borderRadius="lg" bg="var(--color-background)" boxShadow="md" >
          <Heading as="h3" size="md" mb="2">Conexiones seguras</Heading>
          <Text>Mantén conversaciones privadas y significativas con tus contactos de confianza.</Text>
       </Box>
        </Stack>
      </Box>


      <Box mt="8" textAlign="center">
        <Heading as="h2" size="lg" mb="4">
          Únete a nuestra comunidad hoy
        </Heading>
        <Link to="/Register">
          <Button colorScheme="orange" size="lg" mb="20px" boxShadow="lg">
            Registrarse
          </Button>
        </Link>
      </Box>
    </Flex>
  );
};

export default Home;

