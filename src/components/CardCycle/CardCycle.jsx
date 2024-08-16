import React, { useState, useEffect } from 'react';
import ButtonCycle from '../../components/ButtonCycle/ButtonCycle';
import './CardCycle.css';
import useApiCall from '../../hooks/useApiCall/useApiCall';
import ModalDateConfirm from '../ModalDateConfirm/ModalDateConfirm';
import { useDisclosure } from '@chakra-ui/react';
import { Box, Card, CardBody, CardHeader, Text, Button } from '@chakra-ui/react'; 
import { useAuth } from '../../providers/AuthProvider';
import useCurrentCycle from '../../hooks/useCurrentCycle/useCurrentCycle';
import MenstrualData from '../MenstrualData/MenstrualData';


const CardCycle = () => {
  const [status, setStatus] = useState('start');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuth();
  const cycleId = user?.menstrualCycle;

  const [currentCycle, fetchCurrentCycle] = useCurrentCycle(cycleId, () => {});
  const apiCall = useApiCall();

  useEffect(() => {
    const loadCycleData = async () => {
      await fetchCurrentCycle(); 
    };
    
    loadCycleData();
  }, []);

  useEffect(() => {
    if (currentCycle) {
      if (currentCycle?.menstrualCycle?.history?.length === 0) {
        setStatus('start');
      } else {
        const savedStatus = localStorage.getItem('cycleStatus');
        setStatus(savedStatus || 'start');
      }
    }
  }, [currentCycle]);

  const handleButtonClick = async (modalDate) => {
    if (!user || !cycleId) {
      console.error('Token or Cycle ID is missing during button click.');
      return;
    }

    const endpoint = status === 'start' ? '/cycle/start' : '/cycle/end';
    const body = status === 'start' ? { startDate: modalDate } : { endDate: modalDate };

    try {
      await apiCall({
        method: 'POST',
        endpoint,
        body,
        token: user.token,
      });

      const newStatus = status === 'start' ? 'end' : 'start';
      setStatus(newStatus);
      localStorage.setItem('cycleStatus', newStatus); 

    } catch (error) {
      console.error('Error updating cycle:', error);
    }
  };


  return (
    <Box id="principal" p={4} display="flex" flexDirection="column">
      <Card maxW="md" mb={4} p={6} borderRadius="md" boxShadow="md">
        <CardBody display="flex"
        flexDirection="column" justifyContent="center" alignItems="center">
          <MenstrualData status={status} />
          <ButtonCycle
          status={status || 'start'}
          onClick={onOpen}
           />
        </CardBody>
      </Card>
      <ModalDateConfirm
        isOpen={isOpen}
        onClose={onClose}
        status={status}
        onConfirm={(modalDate) => handleButtonClick(modalDate)}
      />
    </Box>
  );
};

export default CardCycle;