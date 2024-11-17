import React from 'react';
import { View, Text, ScrollView } from 'react-native';

const NotificationDetails: React.FC<{ route: any }> = ({ route }) => {
  const { notification } = route.params;

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="p-4 border-b border-gray-200">
        <Text className="text-2xl font-semibold text-black">{notification.header}</Text>
        <Text className="text-sm text-gray-500 mt-1">
          {new Date(notification.timestamp).toLocaleString()}
        </Text>
      </View>

      <View className="p-4">
        <Text className="text-lg text-gray-800">{notification.message}</Text>
      </View>

      <View className="p-4 mt-4 bg-gray-50">
        <Text className="text-sm text-gray-500">Marcado como lido.</Text>
      </View>
    </ScrollView>
  );
};

export default NotificationDetails;