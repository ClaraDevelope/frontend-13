import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Box,
  Image
} from '@chakra-ui/react';

const ImageSelectionModal = ({
  isOpen,
  onClose,
  onSave,
  onImageChange,
  previewImage,
  headerText,
  saveButtonText,
  additionalBodyContent
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{headerText}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pt={20}>
          {additionalBodyContent}
          <Input type="file" accept="image/*" onChange={onImageChange} mt={4} />
          {previewImage && (
            <Box mt={4}>
              <Image src={previewImage} alt="Preview" boxSize="100%" objectFit="cover" />
            </Box>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" onClick={onClose} mr={3}>
            Cerrar
          </Button>
          <Button variant="ghost" colorScheme="blue" onClick={onSave}>
            {saveButtonText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ImageSelectionModal;




