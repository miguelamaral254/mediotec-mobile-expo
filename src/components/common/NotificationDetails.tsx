import React from 'react';
import { View, Text, ScrollView } from 'react-native';

const NotificationDetails: React.FC<{ route: any }> = ({ route }) => {
  const { notification } = route.params;

  return (
    <ScrollView className="flex-1 bg-gray-100">
       <View className="p-5 bg-blue-500 shadow-md">
        <Text className="text-2xl font-bold text-white">{notification.header}</Text>
        <Text className="text-sm text-blue-200 mt-2">
          {new Date(notification.timestamp).toLocaleString()}
        </Text>
      </View>

      <View className="p-8 bg-white shadow-sm rounded-b-lg">
        <Text className="text-lg text-gray-800">{notification.message}</Text>
      </View>

     
    </ScrollView>
  );
};

export default NotificationDetails;