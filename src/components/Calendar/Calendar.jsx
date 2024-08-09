import React from 'react';
import { Calendar as BigCalendar, dayjsLocalizer } from 'react-big-calendar';
import dayjs from 'dayjs';
import "react-big-calendar/lib/css/react-big-calendar.css";
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

  // console.log('Eventos únicos:', JSON.stringify(uniqueEvents));

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
          toolbar: CustomToolbar
        }}
        views={['month', 'week', 'day']}
        defaultView="month"
      />
    </div>
  );
};

export default Calendar;





// import React from 'react';
// import { Calendar as BigCalendar, dayjsLocalizer } from 'react-big-calendar';
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import dayjs from 'dayjs';
// import "dayjs/locale/es";
// import './Calendar.css'

// dayjs.locale('es');
// const localizer = dayjsLocalizer(dayjs);

// const Calendar = ({ events }) => (
//   <div style={{ height: "550px", maxWidth: "700px", display: "flex", justifyContent: "center", alignItems: "center", margin: 'auto',}}>
//     <BigCalendar 
//       localizer={localizer}  
//       events={events} 
//       views={['month', 'week', 'day', 'agenda']} 
//       // 
//       defaultView={'month'} 
//       style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}

//     />
//   </div>
// );

// export default Calendar;
