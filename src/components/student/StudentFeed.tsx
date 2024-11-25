import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SchoolClass } from '../../interfaces/schoolClassInterface';
import { translateEnum } from '../../utils/translateEnum';
import { NavigationProp } from '@react-navigation/native';
import { StudentStackParamList } from '../../routes/StudentFeedRoutes';
import { Linking } from 'react-native';
import NoticeBoard from '../common/NoticeBoard';
import { Notification } from '../../interfaces/notificationInterface';
import { getNotificationsForUser } from '../../services/notificationService';
import { User } from '../../interfaces/userInterface';

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

  const handleOpenAva = () => {
    const url =
      'https://www.youtube.com/watch?v=4l15evegaKo&list=RDEMledDVnxwdhC8Hio8lzIxgQ&index=6';
    Linking.openURL(url).catch((err: Error) =>
      console.error('Erro ao abrir o link:', err)
    );
  };

  const handleOpenFinanceiro = () => {
    const url = 'https://www.youtube.com/watch?v=a4na2opArGY';
    Linking.openURL(url).catch((err: Error) =>
      console.error('Erro ao abrir o link:', err)
    );
  };

  return (
    <View className="flex-1 p-4">
      <Text className="text-4xl font-bold text-primary-color mb-4 mt-32">
        Painel do Estudante
      </Text>

      <ScrollView showsVerticalScrollIndicator={false}>
      <View className="flex-1 p-4 justify-start  rounded-lg">
        <View className="bg-blue-500 p-4 rounded-lg">
          <Text className='text-2xl font-bold color-white'>🚨 Avisos importantes!</Text>
        </View>
        <View className='justify-center items-center bg-white rounded-lg'>
          <NoticeBoard notifications={notifications} />
        </View>
      </View>
      {/* Grade de duas colunas com tamanhos fixos */}
      <View className="flex flex-row flex-wrap justify-between mt-6">

        {/* Card 1 */}
        <View className="w-[48%] h-40 mb-4 justify-between">
        <TouchableOpacity
          className="bg-white rounded-lg p-4 shadow-md h-full flex justify-between items-center"
          onPress={handleOpenAva}
        >
          <View className="flex-1 justify-center items-center">
          <Text className="text-2xl font-bold text-primary-color text-center">
            🖥️ Acesso ao AVA
          </Text>
          </View>
        </TouchableOpacity>

        </View>

        {/* Card 2 */}
        <View className="w-[48%] h-40 mb-4">
          <TouchableOpacity
            className="bg-white rounded-lg p-4 shadow-md h-full flex justify-between items-center"
            onPress={handleOpenFinanceiro}
          >
            <View className="flex-1 justify-center items-center">
            <Text className="text-2xl font-bold text-primary-color">
              💰 Acesso ao Financeiro
            </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Card 3 */}
        <View className="w-[48%] h-40 mb-4">
          <TouchableOpacity
            className="bg-white rounded-lg p-4 shadow-md h-full flex justify-between items-center"
            onPress={() => navigation.navigate('Contacts')}
          >
            <View className="flex-1 justify-center items-center">
            <Text className="text-2xl font-bold text-primary-color">
              📞 Contato
            </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Card 4 */}
        <View className="w-[48%] h-40 mb-4">
          <TouchableOpacity
            className="bg-white rounded-lg p-4 shadow-md h-full flex justify-between items-center"
          >
            <View className="flex-1 justify-center items-center">
            <Text className="text-2xl font-bold text-primary-color">
              📅 Calendário Escolar{' '}
              <Text className="text-red-600 font-medium">WORK IN PROGRESS</Text>
            </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
    </View>
  );
};

export default StudentFeed;