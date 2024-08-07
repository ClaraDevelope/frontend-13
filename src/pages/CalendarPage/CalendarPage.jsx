import React, { useState, useEffect, useCallback } from 'react';
import dayjs from 'dayjs';
import "dayjs/locale/es";
import Calendar from '../../components/Calendar/Calendar';
import { useDisclosure } from '@chakra-ui/react';
import useApiCall from '../../hooks/useApiCall/useApiCall';
import './CalendarPage.css';
import EventModal from '../../components/EventModal/EventModal';
import useCurrentCycle from '../../hooks/useCurrentCycle/useCurrentCycle';
import { fetchEventsData } from '../../utils/eventsData';
import { fetchCurrentCycleData } from '../../utils/currentCycle';


dayjs.locale('es');

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventType, setEventType] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const apiCall = useApiCall();
  const token = localStorage.getItem('token');
  const cycleId = JSON.parse(localStorage.getItem('user'))?.menstrualCycle || null;

  const [currentCycle, fetchCurrentCycle] = useCurrentCycle(cycleId, setEvents);

  const fetchEvents = useCallback(async () => {
    try {
      const response = await fetchEventsData(apiCall, token);
      setEvents(response);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
    if (cycleId) {
      fetchCurrentCycle();
    }
  }, []);

  const handleAddEvent = async (entryType, value) => {
    // Convierte selectedDate a formato DD/MM/YYYY
    const formattedDate = dayjs(selectedDate).format('DD/MM/YYYY');
  
    const newEvent = {
      date: formattedDate,
      value,
      entryType
    };
  
    try {
      await apiCall({
        method: 'POST',
        endpoint: '/calendary/entry',
        body: newEvent,
        token
      });
  
      setEvents(prevEvents => [
        ...prevEvents,
        {
          ...newEvent,
          start: new Date(newEvent.date),
          end: new Date(newEvent.date),
          title: newEvent.value
        }
      ]);
      onClose();
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const handleSelectSlot = ({ start }) => {
    if (eventType === 'menstruacion') {
      const startDate = new Date(start);
      if (currentCycle && startDate >= new Date(currentCycle.start) && startDate <= new Date(currentCycle.end)) {
        alert('No se puede iniciar una nueva menstruación durante una menstruación en curso.');
        return;
      }
    }

    setSelectedDate(start);
    onOpen();
  };

  return (
    <>
      <Calendar events={events} onSelectSlot={handleSelectSlot} selectable />
      <EventModal 
        isOpen={isOpen} 
        onClose={onClose} 
        eventType={eventType} 
        setEventType={setEventType} 
        handleAddEvent={handleAddEvent} 
        selectedDate={selectedDate}
      />
    </>
  );
};

export default CalendarPage;