// NotificationList.tsx

import { View, FlatList, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';
import { Notification } from '../interfaces/notificationInterface';

interface NotificationItemProps {
  notification: Notification;
  onRead: (notification: Notification) => void; // Aceita o objeto Notification
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onRead }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: notification.read ? '#f0f0f0' : '#fff',
      }}
      onPress={() => onRead(notification)} // Passa o objeto Notification
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Feather
          name={notification.read ? "check-circle" : "mail"}
          size={24}
          color={notification.read ? "#aaa" : "#000"}
        />
        <View style={{ marginLeft: 8 }}>
          <Text style={{ fontWeight: 'bold', color: notification.read ? '#aaa' : '#000' }}>
            {notification.header}
          </Text>
          <Text style={{ color: notification.read ? '#aaa' : '#000' }}>
            {notification.read ? 'Mensagem aberta' : 'Nova mensagem'}
          </Text>
        </View>
      </View>
      <Text style={{ color: '#4666AF' }}>
        {new Date(notification.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
      </Text>
    </TouchableOpacity>
  );
};

interface NotificationListProps {
  notifications: Notification[];
  onRead: (notification: Notification) => void; // Aceita o objeto Notification
}

const NotificationList: React.FC<NotificationListProps> = ({ notifications, onRead }) => {
  return (
    <FlatList
      data={notifications}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <NotificationItem notification={item} onRead={onRead} />
      )}
    />
  );
};

export default NotificationList;
