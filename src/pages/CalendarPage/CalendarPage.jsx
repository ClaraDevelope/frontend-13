import React, { useState, useEffect, useCallback } from 'react';
import CalendarWrapper from '../../components/CalendarWrapper/CalendarWrapper'; // Importar el nuevo componente
import useCurrentCycle from '../../hooks/useCurrentCycle/useCurrentCycle';
import { fetchEventsData } from '../../utils/eventsData';
import { useDisclosure } from '@chakra-ui/react';
import apiCall from '../../utils/API/api';
import { useAuth } from '../../providers/AuthProvider'; // Usar contexto para obtener token
import EventModal from '../../components/EventModal/EventModal';

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventType, setEventType] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuth(); 
  const cycleId = user?.menstrualCycle; 
  const token = user?.token; 

  const [currentCycle, fetchCurrentCycle] = useCurrentCycle(cycleId, setEvents);

  useEffect(() => {
    if (cycleId) {
      fetchCurrentCycle();
    }
  }, [cycleId, fetchCurrentCycle]);

  const fetchEvents = useCallback(async () => {
    if (!token) {
      console.error('Token is missing.');
      return;
    }

    try {
      const response = await fetchEventsData(apiCall, token);

      setEvents(prevEvents => {
        const existingEventKeys = new Set(prevEvents.map(event => `${event.start}-${event.end}`));
        const uniqueEvents = response.filter(event => !existingEventKeys.has(`${event.start}-${event.end}`));

        return [...prevEvents, ...uniqueEvents];
      });
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }, [token]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleAddEvent = async (entryType, value) => {
    const date = new Date(selectedDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;

    const newEvent = {
      date: formattedDate,
      value,
      entryType
    };

    try {
      if (!token) {
        console.error('Token is missing.');
        return;
      }

      await apiCall({
        method: 'POST',
        endpoint: '/calendary/entry/add',
        body: newEvent,
        token
      });

      setEvents(prevEvents => {
        const allEvents = [...prevEvents, {
          ...newEvent,
          start: new Date(newEvent.date.split('/').reverse().join('-')), 
          end: new Date(newEvent.date.split('/').reverse().join('-')), 
          title: newEvent.value
        }];
        const uniqueEvents = allEvents.reduce((acc, event) => {
          const key = `${event.start}-${event.end}`;
          if (!acc.seen[key]) {
            acc.seen[key] = true;
            acc.events.push(event);
          }
          return acc;
        }, { seen: {}, events: [] }).events;

        return uniqueEvents;
      });
      onClose();
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const handleSelectSlot = ({ start }) => {
    if (eventType === 'menstruacion') {
      const startDate = new Date(start);
      if (currentCycle && currentCycle.start && startDate >= new Date(currentCycle.start) && (!currentCycle.end || startDate <= new Date(currentCycle.end))) {
        alert('No se puede iniciar una nueva menstruación durante una menstruación en curso.');
        return;
      }
    }

    setSelectedDate(start);
    onOpen();
  };

  return (
    <>
      <CalendarWrapper
        events={events}
        currentCycle={currentCycle}
        onSelectSlot={handleSelectSlot}
        selectable
      />
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





