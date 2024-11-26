import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { User } from '../../interfaces/userInterface';
import { Notification } from '../../interfaces/notificationInterface';
import { getNotificationsForUser } from '../../services/notificationService';
import NoticeBoard from '../common/NoticeBoard';
import { ParentStackParamList } from '../../routes/ParentFeedRoutes';

interface ParentFeedProps {
  userData: User | null;
  navigation: NavigationProp<ParentStackParamList>;
}

const truncateText = (text: string | undefined, maxLength: number) => {
  if (!text || typeof text !== 'string') return '';
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

const ParentFeed: React.FC<ParentFeedProps> = ({ userData, navigation }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (userData?.cpf) {
        try {
          const response = await getNotificationsForUser(userData.cpf);
          setNotifications(response || []);
        } catch (error) {
          console.error('Erro ao buscar notificações:', error);
        }
      }
    };

    fetchNotifications();
  }, [userData?.cpf]);

  const handleOpenLink = (url: string) => {
    Linking.openURL(url).catch((err: Error) =>
      console.error('Erro ao abrir o link:', err)
    );
  };

  return (
    <View className="flex-1 bg-gray-100">
      <Text className="text-4xl font-bold bg-blue-500 text-white p-6 text-center">
        Painel dos Pais
      </Text>

      <View className="bg-white rounded-lg shadow-md p-4 mb-6">
        <NoticeBoard notifications={notifications} />
      </View>

      <View className="p-4">
        <View className="bg-blue-500 p-4 rounded-lg mb-4">
          <Text className="text-2xl font-bold text-white">👨‍👩‍👧‍👦 Alunos</Text>
        </View>
        <View className="bg-white rounded-lg px-4 ">
          {userData && userData.students && userData.students.length > 0 ? (
            userData.students.map((student, index) => (
              <View
                key={index}
                className="border border-gray-300 rounded-lg p-3 bg-gray-50 shadow-sm"
              >
                <Text className="text-lg font-semibold text-gray-800">
                  👦 {truncateText(student.name, 40)}
                </Text>
                <Text className="text-gray-600 text-sm mt-1">
                  Matrícula: {truncateText(student.registration, 20)}
                </Text>
              </View>
            ))
          ) : (
            <Text className="text-gray-800 text-center">Nenhum filho cadastrado.</Text>
          )}
        </View>
      </View>

      <View className="flex flex-row flex-wrap px-4 justify-between">
        <TouchableOpacity
          className="w-[48%] h-40 bg-white rounded-lg shadow-md p-4 mb-4 flex items-center justify-center"
          onPress={() => navigation.navigate('Contacts')}
        >
          <Text className="text-2xl font-bold text-blue-500 text-center">📞 Contatos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-[48%] h-40 bg-white rounded-lg shadow-md p-4 mb-4 flex items-center justify-center"
          onPress={() => handleOpenLink('https://www.youtube.com/watch?v=a4na2opArGY')}
        >
          <Text className="text-2xl font-bold text-blue-500 text-center">💰 Acesso ao Financeiro</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ParentFeed;
