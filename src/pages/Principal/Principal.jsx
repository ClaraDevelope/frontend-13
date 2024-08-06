import React, { useState } from 'react';
import ButtonCycle from '../../components/ButtonCycle/ButtonCycle';
import apiCall from '../../utils/API/api';
import './Principal.css';

const Principal = () => {
  const [status, setStatus] = useState('start');
  const [startDate, setStartDate] = useState(new Date().toISOString());

  const handleButtonClick = async () => {
    try {
      let endpoint = '';
      const token = localStorage.getItem('token');
      let body = {};

      if (status === 'start') {
        endpoint = '/cycle/start';
        
      const date = new Date();
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      const formattedDate = `${day}/${month}/${year}`;
      
      body = { startDate: formattedDate };
      console.log('Enviando cuerpo:', JSON.stringify(body));
      } else {
        endpoint = '/cycle/end';
      }

      const response = await apiCall({
        method: 'POST',
        endpoint,
        body: Object.keys(body).length ? JSON.stringify(body) : null,
        token: token,
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
