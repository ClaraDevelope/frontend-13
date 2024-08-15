import React from 'react';
import { Calendar as BigCalendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import 'dayjs/locale/es';  // Asegúrate de importar el idioma español
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';
import CustomToolbar from '../CustomToolBar/CustomToolBar';

dayjs.locale('es');

const localizer = dayjsLocalizer(dayjs);

const Calendar = ({ events, currentCycle, onSelectSlot, selectable }) => {
  const formattedEvents = events.map(event => {
    const startDate = dayjs(event.start).toDate();
    const endDate = dayjs(event.end).toDate();

    if (!startDate.getTime() || !endDate.getTime()) {
      console.error('Evento con fechas inválidas:', event);
      return null;
    }
    
    return {
      ...event,
      start: startDate,
      end: endDate
    };
  }).filter(event => event !== null);

  const cycleEvents = currentCycle && currentCycle.startDate && currentCycle.endDate ? [
    {
      start: new Date(currentCycle.startDate),
      end: new Date(currentCycle.endDate),
      title: 'Menstruación',
      allDay: true
    }
  ] : [];

  const allEvents = [
    ...formattedEvents,
    ...(!formattedEvents.some(event => event.title === 'Menstruación') ? cycleEvents : [])
  ];

  const uniqueEvents = Array.from(
    new Map(
      allEvents.map(event => [
        `${event.start.toISOString()}-${event.end.toISOString()}-${event.title}`,
        event
      ])
    ).values()
  );

  const EventComponent = ({ event }) => {
    return event.title === 'Menstruación' ? null : <span>{event.title}</span>;
  };

  return (
    <div className="responsive-calendar">
      <BigCalendar
        localizer={localizer}
        events={uniqueEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "100%" }}
        selectable={selectable}
        onSelectSlot={onSelectSlot}
        components={{
          toolbar: CustomToolbar,
          event: EventComponent  
        }}
        views={['month', 'week', 'day']}
        defaultView="month"
      />
    </div>
  );
};

export default Calendar;


