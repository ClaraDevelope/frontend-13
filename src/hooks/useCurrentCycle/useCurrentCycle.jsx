import { useState, useCallback } from 'react';
import { fetchCurrentCycleData } from '../../utils/currentCycle';
import apiCall from '../../utils/API/api';
import { useAuth } from '../../providers/AuthProvider';

const useCurrentCycle = (cycleId, setEvents) => {
  const [currentCycle, setCurrentCycle] = useState(null);
  const { user } = useAuth();
  const token = user?.token;

  const addMenstrualEvent = (start, end, eventsArray) => {
    if (start && end) {
      eventsArray.push({
        start: start.toISOString().split('T')[0],
        end: end.toISOString().split('T')[0],
        title: 'Menstruación',
        allDay: true
      });
    }
  };

  const fetchCurrentCycle = useCallback(async () => {
    if (!cycleId) return;

    try {

      const response = await fetchCurrentCycleData(apiCall, cycleId, token, {});
      // console.log('Datos del ciclo menstrual recibidos del backend:', response);

      setCurrentCycle(response);

      const menstrualEvents = [];
      const currentCycle = response?.currentCycle;
      const nextCycles = response?.nextCycles || [];

      if (currentCycle) {
        addMenstrualEvent(new Date(currentCycle.start), new Date(currentCycle.end), menstrualEvents);
      }

      nextCycles.forEach(cycle => {
        addMenstrualEvent(new Date(cycle.start), new Date(cycle.end), menstrualEvents);
      });

      setEvents(prevEvents => {
        const existingMenstrualEvents = prevEvents.filter(event => 
          event.title === 'Menstruación'
        );
        const filteredMenstrualEvents = menstrualEvents.filter(newEvent => 
          !existingMenstrualEvents.some(existingEvent => 
            existingEvent.start === newEvent.start && 
            existingEvent.end === newEvent.end
          )
        );
        return [...prevEvents, ...filteredMenstrualEvents];
      });
    } catch (error) {
      console.error('Error fetching current menstrual cycle:', error);
    }
  }, [cycleId, setEvents, token]);

  return [currentCycle, fetchCurrentCycle];
};

export default useCurrentCycle;





// import { useState, useCallback } from 'react';
// import { fetchCurrentCycleData } from '../../utils/currentCycle';
// import apiCall from '../../utils/API/api';
// import { token } from '../../utils/constants';

// const useCurrentCycle = (cycleId, setEvents) => {
//   const [currentCycle, setCurrentCycle] = useState(null);

//   const fetchCurrentCycle = useCallback(async () => {
//     if (!cycleId) return;

//     try {
//       const response = await fetchCurrentCycleData(apiCall, cycleId, token);
//       setCurrentCycle(response);

//       const menstrualEvents = [];
//       const start = response?.start ? new Date(response.start) : null;
//       const end = response?.end ? new Date(response.end) : null;

//       if (start && end) {
//         for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
//           menstrualEvents.push({
//             date: new Date(d),
//             value: 'menstruacion',
//             title: 'Menstruación',
//             start: new Date(d),
//             end: new Date(d)
//           });
//         }
//         setEvents(prevEvents => [...prevEvents, ...menstrualEvents]);
//       }

//     } catch (error) {
//       console.error('Error fetching current menstrual cycle:', error);
//     }
//   }, [cycleId, setEvents]);

//   return [currentCycle, fetchCurrentCycle];
// };

// export default useCurrentCycle;



// import { useState, useCallback } from 'react';
// import { fetchCurrentCycleData } from '../../utils/currentCycle';
// import apiCall from '../../utils/API/api';
// import { token } from '../../utils/constants';

// const useCurrentCycle = (cycleId, setEvents) => {
//   const [currentCycle, setCurrentCycle] = useState(null);

//   const fetchCurrentCycle = useCallback(async () => {
//     if (!cycleId) return;

//     try {
//       const response = await fetchCurrentCycleData(apiCall, cycleId, token);
//       setCurrentCycle(response);

//       // Añadir eventos de menstruación
//       if (response.currentCycle && response.currentCycle.start && response.currentCycle.end) {
//         const start = new Date(response.currentCycle.start);
//         const end = new Date(response.currentCycle.end);
//         const menstrualEvents = [];

//         for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
//           menstrualEvents.push({
//             date: new Date(d),
//             value: 'menstruacion',
//             title: 'Menstruación',
//             start: new Date(d),
//             end: new Date(d)
//           });
//         }

//         // Añadir también la próxima menstruación
//         if (response.nextCycle && response.nextCycle.start) {
//           const nextCycleStart = new Date(response.nextCycle.start);
//           menstrualEvents.push({
//             date: nextCycleStart,
//             value: 'nextCycle',
//             title: 'Próxima Menstruación',
//             start: nextCycleStart,
//             end: nextCycleStart
//           });
//         }

//         setEvents(prevEvents => {
//           // Filtrar eventos existentes y añadir nuevos
//           const filteredEvents = prevEvents.filter(event => event.value !== 'menstruacion' && event.value !== 'nextCycle');
//           return [...filteredEvents, ...menstrualEvents];
//         });
//       }
//     } catch (error) {
//       console.error('Error fetching current menstrual cycle:', error);
//     }
//   }, [cycleId, setEvents]);

//   return [currentCycle, fetchCurrentCycle];
// };

// export default useCurrentCycle;
