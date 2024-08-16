import React, { useEffect, useState } from 'react';
import { useAuth } from '../../providers/AuthProvider';
import { Avatar, Button, Stack, Heading, Box, useColorModeValue, Card, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure, useToast } from '@chakra-ui/react';
import useApiCall from '../../hooks/useApiCall/useApiCall';
import './ProfilePost.css'

const ProfilePost = () => {
  const { token, user } = useAuth();
  const [profileImg, setProfileImg] = useState(user.profile.img);
  const [name, setName] = useState(user.profile.name);
  const [postText, setPostText] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const callApi = useApiCall();
  const toast = useToast();  

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

  const handlePostSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('text', postText);
      if (selectedImage) {
        formData.append('image', selectedImage);
      }

      await callApi({
        method: 'POST',
        endpoint: `/post/create/auth/${user._id}`,
        token: token,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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
    <Box p={4}>
      <Card className='profile-post'
      margin="20px auto"
      //  marginTop="100px"
        position="relative"
        direction="column"
        maxW="600px"
        spacing={4}
        borderRadius="8px"
        align="center"
        textAlign="center"
        bg={useColorModeValue('white', 'gray.800')}
        p={4}
      >
        <Avatar size="xl" src={profileImg} alt="avatar" />
        <Heading fontSize={'xl'}>{name}</Heading>
  

      <Box mt={6}>
        <Input
          placeholder="Escribe tu publicación aquí..."
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
          mb={4}
        />
        <Button colorScheme="blue" onClick={onOpen}>
          Añadir Imagen
        </Button>
        <Button colorScheme="teal" ml={4} onClick={handlePostSubmit}>
          Publicar
        </Button>
      </Box>
      </Card>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Seleccionar Imagen</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input type="file" accept="image/*" onChange={handleImageChange} />
            {previewImage && (
              <Box mt={4}>
                <img src={previewImage} alt="Preview" style={{ maxWidth: '100%' }} />
              </Box>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProfilePost;

