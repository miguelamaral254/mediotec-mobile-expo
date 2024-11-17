import { View } from 'react-native';
import React, { useState } from 'react';
import { Notification } from '../interfaces/notificationInterface';
import { updateNotificationReadStatus } from '../services/notificationService';
import NotificationList from '../components/NotificationList';
import { NotificationUpdateRequest } from '../interfaces/notificationUpdateRequestInterface';

interface NewProps {
  notifications: Notification[]; // Recebe notificações como props
}

const New: React.FC<NewProps> = ({ notifications: initialNotifications }) => {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const handleReadNotification = async (notification: Notification) => {
    const updateRequest: NotificationUpdateRequest = {
      id: notification.id,
      read: true,
    };

    try {
      await updateNotificationReadStatus(updateRequest);
      setNotifications((prevNotifications) =>
        prevNotifications.map((item) =>
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