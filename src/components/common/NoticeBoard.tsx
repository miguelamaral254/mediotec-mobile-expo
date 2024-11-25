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
    <View className="bg-white p-4 rounded-lg items-center">
      {sortedNotifications.length > 0 ? (
        sortedNotifications.map((item) => (
          <View key={item.id} className="mt-2 pl-2">
            <Text className="text-gray-800 text-center">
              📅 {item.header} - {new Date(item.timestamp).toLocaleDateString()}
            </Text>
          </View>
        ))
      ) : (
        <Text className="text-gray-800 text-center">Nenhuma mensagem disponível no momento.</Text>
      )}
    </View>
  );
};

export default NoticeBoard;