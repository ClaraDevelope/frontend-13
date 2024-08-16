import React, { useEffect, useState } from 'react';
import { useAuth } from '../../providers/AuthProvider';
import { Avatar, Button, Stack, Heading, Box, useColorModeValue, Card, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter, useDisclosure, useToast } from '@chakra-ui/react';
import useApiCall from '../../hooks/useApiCall/useApiCall';
import './ProfilePost.css';

const ProfilePost = ({ user }) => {
  const [profileImg, setProfileImg] = useState(user.profile.img);
  const [name, setName] = useState(user.profile.name);
  const [postText, setPostText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const callApi = useApiCall();
  const toast = useToast();  
  const token = user.token;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await callApi({
          method: 'GET',
          endpoint: `/auth/${user._id}`,
          token: token,
        });
        setProfileImg(response.profile.img);
        setName(response.profile.name);
      } catch (error) {
        console.error('Error al cargar los datos del usuario:', error);
      }
    };

    fetchUserData();
  }, [user._id, token]);

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

  return (
    <Box >
      <Card className='profile-post'
        direction="column"
        borderRadius="8px"
        align="center"
        textAlign="center"
        bg={useColorModeValue('white', 'gray.800')}
      >
        <Avatar size="xl" src={profileImg} alt="avatar" />
        <Heading fontSize={'xl'}>{name}</Heading>

        <Box mt={6} width="100%">
          <Input
            placeholder="Escribe tu publicación aquí..."
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            mb={4}
          />
          {previewImage && (
            <Box mt={4} textAlign="center">
              <img src={previewImage} alt="Preview" style={{ maxWidth: '150px', maxHeight: '150px', objectFit: 'cover', marginBottom: '10px' }} />
              <Button colorScheme="red" size="sm" onClick={handleRemoveImage}>
                Eliminar Imagen
              </Button>
            </Box>
          )}
          <Button colorScheme="blue" bg="blue.700"  onClick={onOpen}>
            Añadir Imagen
          </Button>
          <Button colorScheme="orange"bg="orange.700" ml={4} onClick={handlePostSubmit}>
            Publicar
          </Button>
        </Box>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Seleccionar Imagen</ModalHeader>
          <ModalCloseButton />
          <ModalBody p={16}>
            <Input type="file" accept="image/*" onChange={handleImageChange} />
            {previewImage && (
              <Box mt={4}>
                <img src={previewImage} alt="Preview" style={{ maxWidth: '100%' }} />
              </Box>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" bg="blue.700" onClick={onClose}>
              Guardar Imagen
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProfilePost;
