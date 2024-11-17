import React from 'react';
import { View, Text } from 'react-native';
import { Notification } from '../../interfaces/notificationInterface';

interface NoticeBoardProps {
  notifications: Notification[];
}

const truncateText = (text: string | undefined, maxLength: number) => {
  if (!text || typeof text !== 'string') return '';
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

const NoticeBoard: React.FC<NoticeBoardProps> = ({ notifications }) => {
  const sortedNotifications = [...(notifications || [])]
    .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
    .slice(-3);

  return (
    <View className="bg-yellow-100 p-4 rounded-lg mb-4">
      <Text className="text-lg font-bold text-orange-800">🚨 Avisos Importantes</Text>
      {sortedNotifications.length > 0 ? (
        sortedNotifications.map((item) => (
          <View key={item.id} className="mt-2 pl-2">
            <Text className="text-gray-800">
              📅 {item.header} - {new Date(item.timestamp).toLocaleDateString()}
            </Text>
            <Text className="text-gray-600">
              {truncateText(item.message, 100)} 
            </Text>
          </View>
        ))
      ) : (
        <Text className="mt-2 text-gray-800">Nenhuma mensagem disponível no momento.</Text>
      )}
    </View>
  );
};

export default NoticeBoard;