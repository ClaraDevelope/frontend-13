import React from 'react';
import { Calendar as BigCalendar, dayjsLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from 'dayjs';
import "dayjs/locale/es";
import './Calendar.css';
import { IconButton } from '@chakra-ui/react';
import {  ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

dayjs.locale('es');
const localizer = dayjsLocalizer(dayjs);

const CustomToolbar = ({ label, onNavigate }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 10px' }}>
    <IconButton
      icon={<ChevronLeftIcon />}
      aria-label="Previous month"
      onClick={() => onNavigate('PREV')}
      style={{ marginRight: '20px' }}
    />
    <span style={{ flex: 1, textAlign: 'center' }}>{label}</span>
    <IconButton
      icon={<ChevronRightIcon />}
      aria-label="Next month"
      onClick={() => onNavigate('NEXT')}
      style={{ marginLeft: '20px' }}
    />
  </div>
);

const Calendar = ({ events, onSelectSlot, selectable }) => (
  <div style={{ height: "550px", maxWidth: "700px", display: "flex", justifyContent: "center", alignItems: "center", margin: 'auto' }}>
    <BigCalendar
      localizer={localizer}
      events={events}
      views={['month', 'week', 'day', 'agenda']}
      defaultView={'month'}
      style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      selectable={selectable}
      onSelectSlot={onSelectSlot}
      components={{
        toolbar: CustomToolbar
      }}
      formats={{
        dateFormat: 'DD',
        dayFormat: 'DD MMM',
        weekdayFormat: 'dddd',
        monthHeaderFormat: 'MMMM YYYY',
        dayHeaderFormat: 'DD MMM YYYY',
        agendaDateFormat: 'DD MMM',
        agendaTimeFormat: 'HH:mm'
      }}
    />
  </div>
);

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
