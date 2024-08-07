import React from 'react';
import {
  Button, Select, Input, Modal, ModalOverlay, ModalContent,
  ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  FormControl, FormLabel
} from '@chakra-ui/react';
import useModalReducer, { ACTIONS } from '../../hooks/useModalReducer/useModalReducer';
import dayjs from 'dayjs';

const EventModal = ({ isOpen, onClose, selectedDate, handleAddEvent }) => {
  const [state, dispatch] = useModalReducer();

  const handleEntryTypeChange = (e) => {
    dispatch({ type: ACTIONS.SET_ENTRY_TYPE, payload: e.target.value });
  };

  const handleValueChange = (e) => {
    dispatch({ type: ACTIONS.SET_VALUE, payload: e.target.value });
  };

  const handleSubmit = () => {
    const formattedDate = dayjs(selectedDate).format('DD/MM/YYYY');
    console.log("Submitting", { entryType: state.entryType, formattedDate, value: state.value });
    handleAddEvent(state.entryType, state.value); // Solo pasa el value sin formatear
    onClose();
  };


  const renderValueInput = () => {
    switch (state.entryType) {
      case 'event':
        return (
          <Select
            placeholder="Selecciona el evento"
            onChange={handleValueChange}
            value={state.value}
            mb={4}
          >
            <option value="deporte">Deporte</option>
            <option value="relaciones">Relaciones</option>
            <option value="hormonaciones">Hormonaciones</option>
            <option value="viaje">Viaje</option>
            <option value="enfermedad">Enfermedad</option>
            <option value="menstruacion">Menstruación</option>
            <option value="fiesta">Fiesta</option>
            <option value="cumpleaños">Cumpleaños</option>
            <option value="medico">Médico</option>
          </Select>
        );
      case 'mood':
        return (
          <Select
            placeholder="Selecciona el estado de ánimo"
            onChange={handleValueChange}
            value={state.value}
            mb={4}
          >
            <option value="enojada">Enojada</option>
            <option value="ansiosa">Ansiosa</option>
            <option value="calmada">Calmada</option>
            <option value="deprimida">Deprimida</option>
            <option value="con energía">Con energía</option>
            <option value="fatigada">Fatigada</option>
            <option value="feliz">Feliz</option>
            <option value="hambrienta">Hambrienta</option>
            <option value="frustrada">Frustrada</option>
            <option value="voluble">Voluble</option>
            <option value="nerviosa">Nerviosa</option>
            <option value="sensible">Sensible</option>
            <option value="cansada">Cansada</option>
            <option value="estresada">Estresada</option>
            <option value="irritable">Irritable</option>
            <option value="dormida">Dormida</option>
            <option value="atrevida">Atrevida</option>
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
        <ModalCloseButton />
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
