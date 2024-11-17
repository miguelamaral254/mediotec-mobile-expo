import { View, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Notification } from '../../interfaces/notificationInterface';
import { RootStackParamList } from '../../types/navigationTypes';

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

  const handlePress = () => {
    console.log("Abrindo detalhes para a notificação ID:", notification.id);  // Adicionando log para verificar o id ao abrir os detalhes
    onRead(notification); 
    navigation.navigate('NotificationDetails', { notification });  
  };

  return (
    <TouchableOpacity
      className={`flex-row items-center justify-between px-4 py-3 border-b ${
        notification.read ? 'bg-gray-200 border-gray-300' : 'bg-white border-gray-400'
      }`}
      onPress={handlePress}
    >
      <View className="flex-row items-center">
        <Feather
          name={notification.read ? 'check-circle' : 'mail'}
          size={24}
          color={notification.read ? '#aaa' : '#000'}
        />
        <View className="ml-2">
          <Text className={`font-bold ${notification.read ? 'text-gray-500' : 'text-black'}`}>
            {notification.header}
          </Text>
          <Text className={`${notification.read ? 'text-gray-500' : 'text-black'}`}>
            {notification.read ? 'Mensagem aberta' : 'Nova mensagem'}
          </Text>
        </View>
      </View>
      <Text className="text-blue-600">
        {hoursDifference > 24
          ? formattedDate
          : notificationTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
      </Text>
    </TouchableOpacity>
  );
};

export default NotificationItem;