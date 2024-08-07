import { useState, useCallback } from 'react';
import { fetchCurrentCycleData } from '../../utils/currentCycle';
import apiCall from '../../utils/API/api';
import { token } from '../../utils/constants';

const useCurrentCycle = (cycleId, setEvents) => {
  const [currentCycle, setCurrentCycle] = useState(null);

  const fetchCurrentCycle = useCallback(async () => {
    if (!cycleId) return;

    try {
      const response = await fetchCurrentCycleData(apiCall, cycleId, token);
      setCurrentCycle(response);

      const menstrualEvents = [];
      const start = new Date(response.start);
      const end = new Date(response.end);

      for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
        menstrualEvents.push({
          date: new Date(d),
          value: 'menstruacion',
          title: 'Menstruación',
          start: new Date(d),
          end: new Date(d)
        });
      }

      setEvents(prevEvents => [...prevEvents, ...menstrualEvents]);

    } catch (error) {
      console.error('Error fetching current menstrual cycle:', error);
    }
  }, [cycleId, setEvents]);

  return [currentCycle, fetchCurrentCycle];
};

export default useCurrentCycle;
