import React, { useEffect, useState } from 'react';
import {
  Button, Select, Input, Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  FormControl, FormLabel
} from '@chakra-ui/react';
import useModalReducer, { ACTIONS } from '../../hooks/useModalReducer/useModalReducer';
import dayjs from 'dayjs';
import useApiCall from '../../hooks/useApiCall/useApiCall';
import { useAuth } from '../../providers/AuthProvider';


const EventModal = ({ isOpen, onClose, selectedDate, handleAddEvent }) => {
  const [state, dispatch] = useModalReducer();
  const [entryValues, setEntryValues] = useState({
    event: [],
    mood: [],
    symptom: [],
    personalTag: []
  });
  const callApi = useApiCall();
  const {user} = useAuth()
  const token = user?.token; 

  useEffect(() => {
    const fetchEntryValues = async () => {
      try {
        const response = await callApi({ method: 'GET', endpoint: '/calendary/entry', token });
        setEntryValues(response);
      } catch (error) {
        console.error('Error fetching entry values', error);
      }
    };

    if (isOpen) {
      fetchEntryValues();
    }
  }, [isOpen]);

  const handleEntryTypeChange = (e) => {
    dispatch({ type: ACTIONS.SET_ENTRY_TYPE, payload: e.target.value });
  };

  const handleValueChange = (e) => {
    dispatch({ type: ACTIONS.SET_VALUE, payload: e.target.value });
  };

  const handleSubmit = () => {
    const formattedDate = dayjs(selectedDate).format('DD/MM/YYYY');
    handleAddEvent(state.entryType, state.value, formattedDate);
    onClose();
  };

  const renderValueInput = () => {
    switch (state.entryType) {
      case 'event':
      case 'mood':
        return (
          <Select
            placeholder={`Selecciona una opción`}
            onChange={handleValueChange}
            value={state.value}
            mb={4}
          >
            {entryValues[state.entryType].map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </Select>
        );
      case 'symptom':
      case 'personalTag':
        return (
          <Input
            placeholder={state.entryType === 'symptom' ? "Describe el síntoma" : "Escribe una nota"}
            onChange={handleValueChange}
            value={state.value}
            mb={4}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent p={5} borderRadius="md" boxShadow="lg">
        <ModalHeader textAlign="center" fontSize="lg" fontWeight="bold" position="relative">
          Añadir Entrada
        </ModalHeader>
        <ModalCloseButton zIndex="99999"/>
        <ModalBody>
          <FormControl>
            <FormLabel>Tipo de entrada</FormLabel>
            <Select
              placeholder="Selecciona el tipo de entrada"
              onChange={handleEntryTypeChange}
              value={state.entryType}
              mb={4}
            >
              <option value="event">Evento</option>
              <option value="personalTag">Nota personal</option>
              <option value="mood">Estado de ánimo</option>
              <option value="symptom">Síntoma</option>
            </Select>
            {renderValueInput()}
          </FormControl>
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleSubmit}
            disabled={!state.entryType || !state.value}
            px={6}
          >
            Añadir
          </Button>
          <Button
            variant="ghost"
            onClick={onClose}
            px={6}
          >
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EventModal;
