import { useState, useEffect, useCallback } from 'react';
import useApiCall from '../useApiCall/useApiCall';
import { useAuth } from '../../providers/AuthProvider';

const useNotifications = () => {
  const { user } = useAuth();
  const callApi = useApiCall();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    if (user) {
      fetchNotifications();
      fetchContacts();
    }
  }, []); 

  const fetchNotifications = useCallback(async () => {
    if (!user?.token) return;

    try {
      const data = await callApi({
        method: 'GET',
        endpoint: '/notifications/',
        token: user?.token
      });
      setNotifications(data);
      setUnreadCount(data.filter(n => n.status === 'pending').length);
    } catch (error) {
      console.error('Error al obtener notificaciones:', error);
    }
  }, [ user?.token]);

  const fetchContacts = useCallback(async () => {
    if (!user?.token) return;
    try {
      const data = await callApi({
        method: 'GET',
        endpoint: '/auth/contacts/',
        token: user?.token
      });
      setContacts(data.contacts || []); 
    } catch (error) {
      console.error('Error al obtener contactos:', error);
    }
  }, [ user?.token]);

  const handleNotificationResponse = async (notificationId, response) => {
    try {
      await callApi({
        method: 'POST',
        endpoint: `/notifications/respond/${notificationId}`,
        body: { response },
        token: user?.token,
      });

      fetchNotifications();
      if (response === 'accepted') {
        fetchContacts(); 
      }
    } catch (error) {
      console.error('Error al responder a la notificación:', error);
    }
  };

  const markNotificationAsRead = async (notificationId) => {
    try {
      await callApi({
        method: 'POST',
        endpoint: `/notifications/mark-read/${notificationId}`,
        token: user?.token,
      });
      fetchNotifications(); 
    } catch (error) {
      console.error('Error al marcar notificación como leída:', error);
    }
  };

  return {
    notifications,
    unreadCount,
    handleNotificationResponse,
    markNotificationAsRead,
    contacts,
    setContacts 
  };
};

export default useNotifications;


