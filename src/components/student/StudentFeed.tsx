import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SchoolClass } from '../../interfaces/schoolClassInterface';
import { Notification } from '../../interfaces/notificationInterface';
import { getNotificationsForUser } from '../../services/notificationService';
import { NavigationProp } from '@react-navigation/native';
import { StudentStackParamList } from '../../routes/StudentFeedRoutes';
import { User } from '../../interfaces/userInterface';
import NoticeBoard from '../common/NoticeBoard';

interface StudentFeedProps {
  schoolClasses: SchoolClass[] | null;
  userData: User | null;
  notifications: Notification[];
  navigation: NavigationProp<StudentStackParamList>;
}

const StudentFeed: React.FC<StudentFeedProps> = ({ schoolClasses, userData, navigation }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const currentYear = new Date().getFullYear();

  const currentYearClasses = schoolClasses
    ? schoolClasses.filter((schoolClass) => {
        const classYear = new Date(schoolClass.date).getFullYear();
        return classYear === currentYear;
      })
    : [];

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
        Painel do Estudante
      </Text>
        <View className="bg-white rounded-lg shadow-md p-4 mb-6">
          <NoticeBoard notifications={notifications} />
        </View>
        <View className="flex flex-row flex-wrap justify-between">
          <TouchableOpacity
            className="w-[48%] h-40 bg-white rounded-lg shadow-md p-4 mb-4 flex items-center justify-center"
            onPress={() => handleOpenLink('https://www.youtube.com/watch?v=4l15evegaKo')}
          >
            <Text className="text-2xl font-bold text-blue-500 text-center">🖥️ Acesso ao AVA</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-[48%] h-40 bg-white rounded-lg shadow-md p-4 mb-4 flex items-center justify-center"
            onPress={() => handleOpenLink('https://www.youtube.com/watch?v=a4na2opArGY')}
          >
            <Text className="text-2xl font-bold text-blue-500 text-center">💰 Acesso ao Financeiro</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-[48%] h-40 bg-white rounded-lg shadow-md p-4 mb-4 flex items-center justify-center"
            onPress={() => navigation.navigate('Contacts')}
          >
            <Text className="text-2xl font-bold text-blue-500 text-center">📞 Contato</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="w-[48%] h-40 bg-white rounded-lg shadow-md p-4 mb-4 flex items-center justify-center"
          >
            <Text className="text-2xl font-bold text-blue-500 text-center">
              📅 Calendário Escolar{' '}
              <Text className="text-red-600 font-medium">WORK IN PROGRESS</Text>
            </Text>
          </TouchableOpacity>
        </View>
    </View>
  );
};

export default StudentFeed;