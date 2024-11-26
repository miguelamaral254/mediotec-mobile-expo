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
    <View className="bg-white rounded-lg shadow-md p-3">
      <Text className="text-xl font-bold text-blue-500 w-full p-5 bg-blue-200 text-center">
        Avisos Recentes🚨
      </Text>
      {sortedNotifications.length > 0 ? (
        sortedNotifications.map((item) => (
          <View
            key={item.id}
            className="border border-gray-300 rounded-lg mb-2 p-3 bg-gray-50 shadow-sm"
          >
            <Text className="text-lg font-semibold text-gray-800">
              📢 {truncateText(item.header, 40)}
            </Text>
            <Text className="text-gray-600 text-sm mt-1">
              {truncateText(item.message, 80)}
            </Text>
            <Text className="text-gray-400 text-xs text-right mt-1">
              {new Date(item.timestamp).toLocaleDateString()}
            </Text>
          </View>
        ))
      ) : (
        <Text className="text-gray-600 text-base text-center">
          Nenhuma mensagem disponível no momento.
        </Text>
      )}
    </View>
  );
};

export default NoticeBoard;