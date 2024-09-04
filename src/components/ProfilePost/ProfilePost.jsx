import React, { useState } from 'react';
import {
  Avatar,
  Heading,
  Button,
  Box,
  Input,
  Card,
  useDisclosure,
  useToast,
  Flex,
  useColorModeValue
} from '@chakra-ui/react';
import useApiCall from '../../hooks/useApiCall/useApiCall';
import ImageSelectionModal from '../ImageSelectionModal/ImageSelectionModal';
import './ProfilePost.css';

const ProfilePost = ({ user, onPostCreated }) => {
  const [profileImg, setProfileImg] = useState(user.profile.img);
  const [name, setName] = useState(user.profile.name);
  const [postText, setPostText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const callApi = useApiCall();
  const toast = useToast();
  const token = user.token;

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setPreviewImage(null);
  };

  const handlePostSubmit = async () => {
    if (!postText && !selectedImage) {
      toast({
        title: 'Publicación vacía.',
        description: "No puedes publicar contenido vacío.",
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append('content', postText);
      if (selectedImage) {
        formData.append('img', selectedImage);
      }

      await callApi({
        method: 'POST',
        endpoint: `/post/create/auth/${user._id}`,
        token: token,
        body: formData,
        isFormData: true
      });

      toast({
        title: 'Publicación creada.',
        description: "Tu publicación ha sido creada exitosamente.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      setPostText('');
      setSelectedImage(null);
      setPreviewImage(null);
      onClose();

      if (onPostCreated) {
        onPostCreated();
      }
    } catch (error) {
      console.error('Error al crear la publicación:', error);
      toast({
        title: 'Error al crear la publicación.',
        description: "Hubo un problema al crear tu publicación.",
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleImageSave = () => {
    onClose(); 
  };

  return (
    <Box>
      <Card
        className='card'
        id="profile-post"
        direction="column"
        borderRadius="8px"
        align="center"
        textAlign="center"
        boxShadow="lg"
        bg={useColorModeValue('white', 'gray.800')}
      >
        <Box mb={4} p={2} bg={useColorModeValue('blue.50', 'blue.900')} borderRadius="md">
          <Heading size="sm">Crear Publicación</Heading>
        </Box>
        <Avatar
          size="xl"
          src={profileImg}
          alt="avatar"
          borderWidth="1px"
          borderColor="gray.400"
        />
        <Heading fontSize={'xl'} color="blue.800">{name}</Heading>

        <Box mt={6} width="100%">
          <Input
            placeholder="Escribe tu publicación aquí..."
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            mb={4}
          />
          {previewImage && (
            <Box mt={4} textAlign="center">
              <img
                src={previewImage}
                alt="Preview"
                style={{ maxWidth: '150px', maxHeight: '150px', objectFit: 'cover', marginBottom: '10px' }}
              />
              <Button colorScheme="red" size="sm" onClick={handleRemoveImage}>
                Eliminar Imagen
              </Button>
            </Box>
          )}
          <Flex mt={4} justify="center">
            <Button colorScheme="blue" bg="blue.700" onClick={onOpen} size="sm" mr={2}>
              Añadir Imagen
            </Button>
            <Button colorScheme="orange" bg="orange.700" onClick={handlePostSubmit} size="sm">
              Publicar
            </Button>
          </Flex>
        </Box>
      </Card>

      <ImageSelectionModal
        isOpen={isOpen}
        onClose={onClose}
        onSave={handleImageSave} 
        onImageChange={handleImageChange}
        previewImage={previewImage}
        headerText="Seleccionar Imagen"
        saveButtonText="Guardar Imagen"
      />
    </Box>
  );
};

export default ProfilePost;






