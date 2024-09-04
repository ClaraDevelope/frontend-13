import React from 'react';
import Calendar from '../Calendar/Calendar';

const CalendarWrapper = ({ events, currentCycle, onSelectSlot, selectable }) => {
  return (
    <Calendar
      events={events}
      currentCycle={currentCycle}
      onSelectSlot={onSelectSlot}
      selectable={selectable}
    />
  );
};

export default CalendarWrapper;
