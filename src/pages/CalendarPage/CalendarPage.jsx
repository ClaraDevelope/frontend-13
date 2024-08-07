import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import "dayjs/locale/es";
import Calendar from '../../components/Calendar/Calendar';
import { Box, Button, Select, Input, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, FormControl, FormLabel } from '@chakra-ui/react';
import useApiCall from '../../hooks/useApiCall/useApiCall';
import './CalendarPage.css'

dayjs.locale('es');

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventType, setEventType] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const apiCall = useApiCall();
  const token = localStorage.getItem('token')
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await apiCall({ method: 'GET', endpoint: '/calendary/', token: token });
        setEvents(response.map(event => ({
          ...event,
          start: new Date(event.date),
          end: new Date(event.date),
          title: event.value 
        })));
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleAddEvent = async () => {
    const newEvent = {
      date: selectedDate,
      value: eventType,
      title: event.value 
    };

    try {
      const response = await apiCall({
        method: 'POST',
        endpoint: '/calendary/entry',
        body: newEvent,
        token: token
      });

      setEvents([...events, {
        ...newEvent,
        start: new Date(newEvent.date),
        end: new Date(newEvent.date),
        title: event.value
      }]);
      onClose();
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const handleSelectSlot = ({ start }) => {
    setSelectedDate(start);
    onOpen();
  };

  return (
    <>
      <Calendar events={events} onSelectSlot={handleSelectSlot} selectable />
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent p={5} borderRadius="md" boxShadow="lg">
          <ModalHeader textAlign="center" fontSize="lg" fontWeight="bold" position="relative">Añadir Evento</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <Select
                placeholder="Selecciona el tipo de evento"
                onChange={(e) => setEventType(e.target.value)}
                value={eventType}
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
            </FormControl>
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleAddEvent}
              disabled={!eventType}
              px={6}  // Padding X
            >
              Añadir
            </Button>
            <Button
              variant="ghost"
              onClick={onClose}
              px={6}  // Padding X
            >
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};


export default CalendarPage;


// import React, { useState } from 'react'
// import dayjs from 'dayjs';
// import "dayjs/locale/es";
// import Calendar from '../../components/Calendar/Calendar';

// dayjs.locale('es');
// const CalendarPage = () => {
//   const [events, setEvents] = useState([]);
//   const userDays = 5; // Este valor se puede pasar como prop o obtener de un formulario
  
//   const handleAddEvent = () => {
//     const start = dayjs().toDate();
//     const end = dayjs().add(userDays, 'day').toDate();
//     const newEvent = {
//       start,
//       end,
//       title: 'Menstruación',
//       allDay: true,
//       data: {}
//     };
//     setEvents([...events, newEvent]);
//   };
  
//   return (
//     <>
//       <button onClick={handleAddEvent}>
//     Añadir Evento
//     </button>
//       <Calendar events={events} />
//     </>
//   );
// }

// export default CalendarPage



