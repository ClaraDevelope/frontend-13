import React from 'react'
import { Box, Text, Link, Stack, HStack, IconButton, Divider } from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaPhone } from "react-icons/fa";

const Footer = () => {
  return (
    <Box
      bg="var(--color-dark-blue-2)"
      color="white"
      py={8}
      px={5}
    >
      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={8}
        justifyContent={{ base: "center", md: "space-between" }}
        alignItems={{ base: "center", md: "start" }}
      >
        <Stack spacing={4} flex={{ base: 1, md: 2 }}>
          <Text fontSize="lg" fontWeight="bold">MenstruApp</Text>
          <Text fontSize="sm">
            © {new Date().getFullYear()} MenstruApp
          </Text>
          <HStack spacing={4}>
            <Link href="mailto:info@menstruapp.com" isExternal>
              <IconButton
                aria-label="Email"
                icon={<FaEnvelope />}
                variant="ghost"
                colorScheme="whiteAlpha"
                _hover={{ bg: "gray.600" }}
              />
            </Link>
            <Link href="tel:+123456789" isExternal>
              <IconButton
                aria-label="Phone"
                icon={<FaPhone />}
                variant="ghost"
                colorScheme="whiteAlpha"
                _hover={{ bg: "gray.600" }}
              />
            </Link>
          </HStack>
        </Stack>
        
        <Stack spacing={4} flex={{ base: 1, md: 2 }}>
          <Text fontSize="lg" fontWeight="bold">Enlaces Útiles</Text>
          <Stack spacing={2}>
            <Link href="/#" color="whiteAlpha.800">Sobre Nosotros</Link>
            <Link href="/#" color="whiteAlpha.800">Servicios</Link>
            <Link href="/#" color="whiteAlpha.800">Política de Privacidad</Link>
            <Link href="/#" color="whiteAlpha.800">Contacto</Link>
          </Stack>
        </Stack>

        <Stack spacing={4} flex={{ base: 1, md: 2 }}>
          <Text fontSize="lg" fontWeight="bold">Síguenos</Text>
          <HStack spacing={4}>
            <Link href="https://facebook.com" isExternal>
              <IconButton
                aria-label="Facebook"
                icon={<FaFacebook />}
                variant="ghost"
                colorScheme="whiteAlpha"
                _hover={{ bg: "gray.600" }}
              />
            </Link>
            <Link href="https://twitter.com" isExternal>
              <IconButton
                aria-label="Twitter"
                icon={<FaTwitter />}
                variant="ghost"
                colorScheme="whiteAlpha"
                _hover={{ bg: "gray.600" }}
              />
            </Link>
            <Link href="https://instagram.com" isExternal>
              <IconButton
                aria-label="Instagram"
                icon={<FaInstagram />}
                variant="ghost"
                colorScheme="whiteAlpha"
                _hover={{ bg: "gray.600" }}
              />
            </Link>
          </HStack>
        </Stack>
      </Stack>
      
      <Divider my={6} borderColor="gray.600" />
      
      <Stack spacing={4} align="center">
        <Text fontSize="sm">
          Designed and developed by <Link href="https://github.com/ClaraDevelope" color="teal.300" isExternal>Clara Manzano</Link>.
        </Text>
      </Stack>
    </Box>
  )
}

export default Footer
