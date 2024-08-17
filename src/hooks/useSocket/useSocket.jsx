import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useAuth } from '../../providers/AuthProvider';
import { SERVER } from '../../utils/constants';

const useSocket = (receiverId, onReceiveMessage) => {
  const { user } = useAuth();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketOptions = {
      path: '/socket.io',
      transports: ['websocket'], 
      query: user.token ? { token: user.token } : {},
    };

    console.log('Conectando al servidor con opciones:', socketOptions);

    const newSocket = io(SERVER, socketOptions);

    newSocket.on('connect', () => {
      console.log('Conectado al servidor de chat');
    });

    // newSocket.on('connect_error', (err) => {
    //   console.error('Error de conexión:', err);
    // });

    newSocket.on('receive_message', (data) => {
      console.log('Mensaje recibido:', data);
      onReceiveMessage(data);
    });

    newSocket.on('disconnect', (reason) => {
      console.log(`Desconectado del servidor de chat: ${reason}`);
    });

    setSocket(newSocket);

    return () => {
      if (newSocket) {
        newSocket.disconnect();
        console.log('Desconectado del servidor de chat');
      }
    };
  }, []);

  const sendMessage = (message) => {
    if (socket) {
      console.log('Enviando mensaje:', { receiverId, text: message });
      socket.emit('send_message', {
        receiverId,
        text: message,
      });
    } else {
      console.error('Socket no está conectado');
    }
  };

  return { sendMessage };
};




export default useSocket;
