import React, { useState, useEffect } from 'react';
import { Box, Heading, Stack, Avatar, Button, useColorModeValue, Alert, AlertIcon, AlertTitle, useDisclosure } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import useApiCall from '../../hooks/useApiCall/useApiCall'; 
import { useAuth } from '../../providers/AuthProvider';
import ImageSelectionModal from '../ImageSelectionModal/ImageSelectionModal';

const Wellcome = () => {
  const { isOpen, onOpen, onClose } = useDisclosure(); 
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();
  const callApi = useApiCall();  
  const { token, user } = useAuth(); 
  const [profileImg, setProfileImg] = useState(user.profile.img);
  const [successMessage, setSuccessMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await callApi({
          method: 'GET',
          endpoint: `/auth/${user._id}`, 
          token: token,
        });
        if (response && response.profile && response.profile.img) {
          setProfileImg(response.profile.img); 
        }
      } catch (error) {
        console.error('Error al cargar los datos del usuario:', error);
      }
    };

    fetchUserData();
  }, [user._id, token]);

  const onSubmit = async () => {
    const formData = new FormData();
  
    if (selectedFile) {
      formData.append('img', selectedFile); 
    }
 
    try {
      const response = await callApi({
        method: 'PATCH',
        endpoint: `/auth/${user._id}/update`,
        body: formData,
        isFormData: true,
        token: token
      });
  
      if (response && response.profile && response.profile.img) {
        setProfileImg(response.profile.img);
        setSuccessMessage('Imagen de perfil actualizada con éxito');
        onClose();
      } else {
        console.error('Error al actualizar la imagen de perfil:', response.message || 'Error desconocido');
      }
    } catch (error) {
      console.error('Error en la llamada a la API:', error);
    } finally {
      reset(); 
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <Box
      width="100%"
      height="100%"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      bg={useColorModeValue('white', 'gray.800')}
    >
      {successMessage && (
        <Alert status="success" borderRadius="md" mb={4}>
          <AlertIcon />
          <AlertTitle>{successMessage}</AlertTitle>
        </Alert>
      )}

      <Stack direction="column" spacing={4} align="center" textAlign="center" p={4}>
        <Avatar size="xl" src={profileImg} alt="avatar" mb={4} />
        <Heading fontSize={'xl'}>Hola de nuevo {user.profile.name}</Heading>
        <Button colorScheme="orange" onClick={onOpen}>
          Cambiar imagen de perfil
        </Button>
      </Stack>

      <ImageSelectionModal
        isOpen={isOpen}
        onClose={onClose}
        onSave={handleSubmit(onSubmit)}
        onImageChange={handleImageChange}
        previewImage={selectedFile ? URL.createObjectURL(selectedFile) : profileImg}
        headerText="Selecciona una nueva imagen de perfil"
        saveButtonText="Guardar"
      />
    </Box>
  );
};

export default Wellcome;





