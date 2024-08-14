import React, { useState, useEffect } from 'react';
import useCurrentCycle from '../../hooks/useCurrentCycle/useCurrentCycle';
import { useAuth } from '../../providers/AuthProvider';
import { Heading } from '@chakra-ui/react';

const MenstrualData = ({ status }) => {
  const { user } = useAuth();
  const cycleId = user?.menstrualCycle;
  const [currentCycle, fetchCurrentCycle] = useCurrentCycle(cycleId, () => {});
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadCycleData = async () => {
      if (cycleId) {
        await fetchCurrentCycle();
      } else {
        setMessage('No se puede cargar la información del ciclo menstrual.');
      }
    };

    loadCycleData();
  }, [cycleId]); 

  useEffect(() => {
    if (currentCycle && currentCycle.currentCycle) {
      const today = new Date();
      const startDate = new Date(currentCycle.currentCycle.start);

      if (status === 'end') {
        const diffTime = today - startDate;
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
        setMessage(`Estás en el día ${Math.max(0, diffDays)} de período.`);

      } else if (status === 'start') {
        const nextCycles = currentCycle?.menstrualCycle?.nextCycles || [];
        if (nextCycles.length > 0) {
          const nextCycleStart = new Date(nextCycles[0].start);
          if (nextCycleStart > today) {
            const diffTime = nextCycleStart - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            setMessage(`Quedan ${Math.max(0, diffDays)} días para el inicio del próximo período.`);
          } else {
            setMessage('El próximo período ya ha comenzado o no hay datos suficientes.');
          }
        } else {
          setMessage('No hay datos suficientes para calcular.');
        }
      } else {
        setMessage('Estado del ciclo no reconocido.');
      }
    } else {
      setMessage('No hay datos suficientes para calcular.');
    }
  }, [currentCycle, status]);

  return currentCycle && currentCycle.currentCycle ? (
    <Heading as='h3' size='lg' p={6} textAlign="center">
      {message}
    </Heading>
  ) : null;
};

export default MenstrualData;
