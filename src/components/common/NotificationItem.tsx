import { View, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Notification } from '../../interfaces/notificationInterface';
import { RootStackParamList } from '../../types/navigationTypes';
import { updateNotificationReadStatus } from '../../services/notificationService';

interface NotificationItemProps {
  notification: Notification;
  onRead: (notification: Notification) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onRead }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList, 'NotificationDetails'>>();
  const notificationTime = new Date(notification.timestamp);
  const currentTime = new Date();
  const timeDifference = currentTime.getTime() - notificationTime.getTime();
  const hoursDifference = timeDifference / (1000 * 60 * 60);
  const formattedDate = notificationTime.toLocaleDateString();

  const handlePress = async () => {
    try {
      await updateNotificationReadStatus({ id: notification.id, read: true });
      onRead(notification);
      navigation.navigate('NotificationDetails', { notification });
    } catch (error) {
      console.error("Erro ao atualizar o status de leitura:", error);
    }
  };

  return (
    <TouchableOpacity
      className={`flex-row items-center justify-between p-4 border rounded-lg shadow-md ${
        notification.read ? 'bg-gray-100 border-gray-300' : 'bg-white border-gray-400'
      }`}
      onPress={handlePress}
    >
      <View className="flex-row items-center space-x-4">
        <Feather
          name={notification.read ? "check-circle" : "mail"} 
          size={24}
          color={notification.read ? "#6b7280" : "#1f2937"} 
        />
        <View className='ml-5 '>
          <Text
            className={`text-base font-semibold ${
              notification.read ? 'text-gray-500' : 'text-blue-600'
            }`}
          >
            {notification.header}
          </Text>
          <Text className={`text-sm ${notification.read ? 'text-gray-400' : 'text-gray-600'}`}>
            {notification.read ? 'Mensagem aberta' : 'Nova mensagem'}
          </Text>
        </View>
      </View>
      <Text className="text-xs text-gray-500">
        {hoursDifference > 24
          ? formattedDate
          : notificationTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
      </Text>
    </TouchableOpacity>
  );
};

export default NotificationItem;