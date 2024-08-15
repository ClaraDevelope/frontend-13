import React, { useState } from 'react';
import {
  Button, Input, Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  FormControl, FormLabel
} from '@chakra-ui/react';
import { formatDate } from '../../utils/formatDate';

const ModalDateConfirm = ({ isOpen, onClose, onConfirm, status }) => {
  const [modalDate, setModalDate] = useState(formatDate(new Date(), 'YYYY-MM-DD'));

  const handleConfirm = () => {
    const formattedDate = formatDate(new Date(modalDate), 'DD/MM/YYYY'); 
    onConfirm(formattedDate); 
    onClose(); 
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent p={5}>
        <ModalHeader position="relative">Confirmar Fecha</ModalHeader>
        <ModalBody>
          <FormControl>
            <FormLabel>Fecha de {status === 'start' ? 'inicio' : 'fin'} del ciclo</FormLabel>
            <Input
              type="date" 
              value={modalDate}
              onChange={(e) => setModalDate(e.target.value)}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleConfirm}>
            Confirmar
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalDateConfirm;

