import React, { useState } from 'react';
import dayjs from 'dayjs';
import "dayjs/locale/es";
import Calendar from '../../components/Calendar/Calendar';


dayjs.locale('es');

const Principal = () => {
  const [events, setEvents] = useState([]);
  const userDays = 5; // Este valor se puede pasar como prop o obtener de un formulario

  const handleAddEvent = () => {
    const start = dayjs().toDate();
    const end = dayjs().add(userDays, 'day').toDate();
    const newEvent = {
      start,
      end,
      title: 'Menstruación',
      allDay: true,
      data: {}
    };
    setEvents([...events, newEvent]);
  };

  return (
    <>
      <button onClick={handleAddEvent}>
    Añadir Evento
    </button>
      <Calendar events={events} />
    </>
  );
}

export default Principal;