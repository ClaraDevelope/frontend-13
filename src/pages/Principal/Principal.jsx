import React, { useState, useEffect } from 'react';
import ButtonCycle from '../../components/ButtonCycle/ButtonCycle';
import './Principal.css';
import useApiCall from '../../hooks/useApiCall/useApiCall';
import ModalDateConfirm from '../../components/ModalDateConfirm/ModalDateConfirm';
import { useDisclosure } from '@chakra-ui/react';
import { useAuth } from '../../providers/AuthProvider';
import useCurrentCycle from '../../hooks/useCurrentCycle/useCurrentCycle';

const Principal = () => {
  const [status, setStatus] = useState('start');
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuth();
  const cycleId = user?.menstrualCycle;

  const [currentCycle, fetchCurrentCycle] = useCurrentCycle(cycleId, () => {});
  const apiCall = useApiCall();

  useEffect(() => {
    const loadCycleData = async () => {
      await fetchCurrentCycle();
      setIsLoading(false);
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

      // Cambia el estado entre 'start' y 'end'
      const newStatus = status === 'start' ? 'end' : 'start';
      setStatus(newStatus);
      localStorage.setItem('cycleStatus', newStatus); // Guardar en localStorage

    } catch (error) {
      console.error('Error updating cycle:', error);
    }
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div id="principal">
      <ButtonCycle
        status={status || 'start'}
        onClick={onOpen}
      />
      <ModalDateConfirm
        isOpen={isOpen}
        onClose={onClose}
        status={status}
        onConfirm={(modalDate) => handleButtonClick(modalDate)}
      />
    </div>
  );
};

export default Principal;



// import React, { useState, useEffect } from 'react';
// import ButtonCycle from '../../components/ButtonCycle/ButtonCycle';
// import './Principal.css';
// import useApiCall from '../../hooks/useApiCall/useApiCall';
// import ModalDateConfirm from '../../components/ModalDateConfirm/ModalDateConfirm';
// import { useDisclosure } from '@chakra-ui/react';
// import { formatDate } from '../../utils/formatDate';
// import { fetchCurrentCycleData } from '../../utils/currentCycle';

// const Principal = () => {
//   const [status, setStatus] = useState('start'); // 'start' or 'end'
//   const [isLoading, setIsLoading] = useState(true);
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const apiCall = useApiCall();

//   let user;
//   try {
//     const userString = localStorage.getItem('user');
//     user = userString ? JSON.parse(userString) : null;
//   } catch (error) {
//     console.error('Error parsing user data from localStorage:', error);
//     user = null;
//   }

//   const cycleId = user?.menstrualCycle;
//   console.log('Menstrual Cycle ID:', cycleId);

//   useEffect(() => {
//     const fetchCycleData = async () => {
//       if (!cycleId) {
//         console.error('Cycle ID is missing.');
//         setIsLoading(false);
//         return;
//       }

//       const token = localStorage.getItem('token');
//       if (!token) {
//         console.error('Token is missing.');
//         setIsLoading(false);
//         return;
//       }

//       try {
//         const response = await fetchCurrentCycleData(apiCall, cycleId, token);

//         if (response) {
//           if (response.currentCycle && response.currentCycle.start && !response.currentCycle.end) {
//             setStatus('end');
//           } else {
//             setStatus('start');
//           }
//         } else {
//           setStatus('start');
//         }
//       } catch (error) {
//         console.error('Error fetching menstrual cycle data:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchCycleData();
//   }, [cycleId]);

//   const handleButtonClick = async (modalDate) => {
//     const token = localStorage.getItem('token');
//     const endpoint = status === 'start' ? '/cycle/start' : '/cycle/end';
//     const body = status === 'start' ? { startDate: modalDate } : { endDate: formatDate(new Date(), 'DD/MM/YYYY') };

//     try {
//       const response = await apiCall({
//         method: 'POST',
//         endpoint,
//         body,
//         token,
//       });
//       console.log('Respuesta del servidor:', response);

//       const newStatus = status === 'start' ? 'end' : 'start';
//       setStatus(newStatus);
//     } catch (error) {
//       console.error('Error al actualizar el ciclo:', error);
//     }
//   };

//   if (isLoading) {
//     return <div>Cargando...</div>;
//   }

//   return (
//     <div id="principal">
//       <ButtonCycle
//         status={status}
//         onClick={onOpen}
//       />
//       <ModalDateConfirm
//         isOpen={isOpen}
//         onClose={onClose}
//         onConfirm={(modalDate) => {
//           handleButtonClick(modalDate);
//         }}
//       />
//     </div>
//   );
// };

// export default Principal;
