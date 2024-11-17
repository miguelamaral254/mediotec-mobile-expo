import { FlatList, TouchableOpacity, View, Text } from 'react-native';
import React from 'react';
import { Notification } from '../interfaces/notificationInterface';
import { updateNotificationReadStatus } from '../services/notificationService'; 
import NotificationItem from './common/NotificationItem';

interface NotificationListProps {
  notifications: Notification[];
  onRead: (notification: Notification) => void;
}

const NotificationList: React.FC<NotificationListProps> = ({ notifications, onRead }) => {
  const sortedNotifications = [...notifications].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const handleNotificationPress = async (notification: Notification) => {
    console.log("Notificação clicada:", notification.id);  

    try {
      await updateNotificationReadStatus({
        id: notification.id,
        read: true,
      });

      onRead(notification);
    } catch (error) {
      console.error('Erro ao atualizar a notificação:', error);
    }
  };

  return (
    <FlatList
      data={sortedNotifications}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handleNotificationPress(item)}>
          <NotificationItem notification={item} onRead={onRead} />
        </TouchableOpacity>
      )}
    />
  );
};

export default NotificationList;