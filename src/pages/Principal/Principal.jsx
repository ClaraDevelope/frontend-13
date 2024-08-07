import React, { useState } from 'react';
import ButtonCycle from '../../components/ButtonCycle/ButtonCycle';
import './Principal.css';
import useApiCall from '../../hooks/useApiCall/useApiCall';


const Principal = () => {
  const [status, setStatus] = useState('start');
  const [startDate, setStartDate] = useState(new Date().toISOString());
  const apiCall = useApiCall(); 

  const formatDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleButtonClick = async () => {
    const token = localStorage.getItem('token');
    const endpoint = status === 'start' ? '/cycle/start' : '/cycle/end';
    const body = status === 'start' ? { startDate: formatDate() } : { endDate: formatDate() };

    try {
      const response = await apiCall({
        method: 'POST',
        endpoint,
        body,
        token,
      });
      console.log('Respuesta del servidor:', response);
      setStatus(status === 'start' ? 'end' : 'start');
    } catch (error) {
      console.error('Error al actualizar el ciclo:', error);
    }
  };

  return (
    <div id="principal">
      <ButtonCycle status={status} onClick={handleButtonClick} />
    </div>
  );
};

export default Principal;