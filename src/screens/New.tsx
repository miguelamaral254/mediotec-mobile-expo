// New.tsx

import { View } from 'react-native';
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Notification } from '../interfaces/notificationInterface';
import { getNotificationsForUser, updateNotificationReadStatus } from '../services/notificationService';
import { User } from '../interfaces/userInterface';
import NotificationList from '../components/NotificationList';
import { NotificationUpdateRequest } from '../interfaces/notificationUpdateRequestInterface';

interface NewProps {
  userData: User | null; // Definindo userData diretamente aqui
}

const New: React.FC<NewProps> = ({ userData }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (userData) {
        try {
          const response = await getNotificationsForUser(userData.cpf);
          setNotifications(response);
        } catch (error) {
          console.error('Erro ao buscar notificações:', error);
        }
      }
    };

    fetchNotifications();
  }, [userData]);

  const handleReadNotification = async (notification: Notification) => {
    const updateRequest: NotificationUpdateRequest = {
      id: notification.id,
      read: true 
    };

    try {
      await updateNotificationReadStatus(updateRequest);
      setNotifications(prevNotifications =>
        prevNotifications.map(item =>
          item.id === notification.id ? { ...item, read: true } : item
        )
      );
    } catch (error) {
      console.error('Erro ao marcar notificação como lida:', error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <NotificationList notifications={notifications} onRead={handleReadNotification} />
    </View>
  );
};

export default New;
