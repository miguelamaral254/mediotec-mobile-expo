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
  const currentYear = new Date().getFullYear(); // Obtém o ano atual

  // Filtrar turmas do ano atual
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

  const handleOpenCanvas = () => {
    const url = 'https://www.youtube.com/watch?v=4l15evegaKo&list=RDEMledDVnxwdhC8Hio8lzIxgQ&index=6';
    Linking.openURL(url).catch((err: Error) =>
      console.error('Erro ao abrir o link:', err)
    );
  };

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      <Text className="text-2xl font-bold text-primary-color mb-4">
        Painel do Estudante
      </Text>
      <Text className="text-base text-secondary-color mb-4">
        Bem-vindo à área do estudante! Fique por dentro das novidades.
      </Text>
      <View>
        <NoticeBoard notifications={notifications} />
        {currentYearClasses.length > 0 ? (
          currentYearClasses.map((schoolClass) => (
            <View key={schoolClass.id} className="mt-6 bg-gray-100 p-5 rounded-lg">
              <Text className="text-xl font-semibold text-primary-color text-center">
                {`Turma: ${schoolClass.code} - ${translateEnum(schoolClass.letter, 'letter')} (${translateEnum(schoolClass.shift, 'shift')})`}
              </Text>
              <Text className="text-lg text-center">
                {`${translateEnum(schoolClass.technicalCourse, 'technicalCourse')} - ${translateEnum(schoolClass.year, 'year')}`}
              </Text>
            </View>
          ))
        ) : (
          <Text className="text-center text-gray-500">Nenhuma turma do ano atual encontrada</Text>
        )}
      </View>

      <View className="flex flex-row flex-wrap justify-between">
        <TouchableOpacity
          className="bg-white rounded-lg p-4 mb-4 w-1/2 shadow-md flex flex-col justify-between"
          onPress={handleOpenCanvas}
        >
          <View>
            <Text className="text-lg font-bold text-primary-color mb-2">
              🖥️ Acesso ao Canvas
            </Text>
            <Text className="text-sm text-secondary-color mb-4">Fique em dia com suas atividades e tarefas.</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-white rounded-lg p-4 mb-4 w-1/2 shadow-md flex flex-col justify-between"
          onPress={() => navigation.navigate('Contacts')}
        >
          <View>
            <Text className="text-lg font-bold text-primary-color mb-2">
              📞 Contato
            </Text>
            <Text className="text-sm text-secondary-color mb-4">Entre em contato com seus professores ou a administração.</Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        className="bg-white rounded-lg p-4 mb-4 w-1/2 shadow-md flex flex-col justify-between"
      >
        <View>
          <Text className="text-lg font-bold text-primary-color mb-2">
            📅 Calendário Escolar <Text className="text-red-600 font-medium">WORK IN PROGRESS</Text>
          </Text>
          <Text className="text-sm text-secondary-color mb-4">Veja o calendário escolar e não perca nenhuma data importante.</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default StudentFeed;