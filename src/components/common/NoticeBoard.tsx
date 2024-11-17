import React from 'react';
import { View, Text } from 'react-native';

const NoticeBoard: React.FC = () => {
  return (
    <View className="bg-yellow-100 p-4 rounded-lg mb-4">
      <Text className="text-lg font-bold text-orange-800">🚨 Avisos Importantes</Text>
      <Text className="mt-2 text-gray-800">Fique atento aos comunicados da escola:</Text>
      <View className="mt-2 pl-2">
        <Text className="text-gray-800">📅 Reunião de pais e mestres dia 10/10 às 18h.</Text>
        <Text className="text-gray-800">📝 Entrega de trabalhos até o dia 15/10.</Text>
        <Text className="text-gray-800">📊 Prova de matemática dia 20/10.</Text>
      </View>
    </View>
  );
};

export default NoticeBoard;