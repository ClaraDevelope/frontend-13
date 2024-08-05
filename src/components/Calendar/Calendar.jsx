import React from 'react';
import { Calendar as BigCalendar, dayjsLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from 'dayjs';
import "dayjs/locale/es";
import './Calendar.css'

dayjs.locale('es');
const localizer = dayjsLocalizer(dayjs);

const Calendar = ({ events }) => (
  <div style={{ height: "550px", maxWidth: "700px", display: "flex", justifyContent: "center", alignItems: "center", margin: 'auto' }}>
    <BigCalendar 
      localizer={localizer}  
      events={events} 
      views={['month', 'week', 'day', 'agenda']} 
      // 
      defaultView={'month'} 
      style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      // formats={{
      //   dayHeaderFormat: date => dayjs(date).format("dddd @ MM/YY")
      // }}
    />
  </div>
);

export default Calendar;
