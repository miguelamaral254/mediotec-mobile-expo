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
            <View
              key={schoolClass.id}
              className="mt-6 bg-gray-100 p-5 rounded-lg"
            >
              <Text className="text-xl font-semibold text-primary-color text-center">
                {`Turma: ${schoolClass.code} - ${translateEnum(
                  schoolClass.letter,
                  'letter'
                )} (${translateEnum(schoolClass.shift, 'shift')})`}
              </Text>
              <Text className="text-lg text-center">
                {`${translateEnum(
                  schoolClass.technicalCourse,
                  'technicalCourse'
                )} - ${translateEnum(schoolClass.year, 'year')}`}
              </Text>
            </View>
          ))
        ) : (
          <Text className="text-center text-gray-500">
            Nenhuma turma do ano atual encontrada
          </Text>
        )}
      </View>

      {/* Grade de duas colunas com tamanhos fixos */}
      <View className="flex flex-row flex-wrap justify-between mt-6">
        {/* Card 1 */}
        <View className="w-[48%] h-40 mb-4">
          <TouchableOpacity
            className="bg-white rounded-lg p-4 shadow-md h-full flex flex-col justify-between"
            onPress={handleOpenAva}
          >
            <Text className="text-lg font-bold text-primary-color mb-2">
              🖥️ Acesso ao AVA
            </Text>
            <Text className="text-sm text-secondary-color">
              Fique em dia com suas atividades e tarefas.
            </Text>
          </TouchableOpacity>
        </View>

        {/* Card 2 */}
        <View className="w-[48%] h-40 mb-4">
          <TouchableOpacity
            className="bg-white rounded-lg p-4 shadow-md h-full flex flex-col justify-between"
            onPress={handleOpenFinanceiro}
          >
            <Text className="text-lg font-bold text-primary-color mb-2">
              💰 Acesso ao Financeiro
            </Text>
            <Text className="text-sm text-secondary-color">
              Consulte seus pagamentos e mensalidades.
            </Text>
          </TouchableOpacity>
        </View>

        {/* Card 3 */}
        <View className="w-[48%] h-40 mb-4">
          <TouchableOpacity
            className="bg-white rounded-lg p-4 shadow-md h-full flex flex-col justify-between"
            onPress={() => navigation.navigate('Contacts')}
          >
            <Text className="text-lg font-bold text-primary-color mb-2">
              📞 Contato
            </Text>
            <Text className="text-sm text-secondary-color">
              Entre em contato com seus professores ou a administração.
            </Text>
          </TouchableOpacity>
        </View>

        {/* Card 4 */}
        <View className="w-[48%] h-40 mb-4">
          <TouchableOpacity
            className="bg-white rounded-lg p-4 shadow-md h-full flex flex-col justify-between"
          >
            <Text className="text-lg font-bold text-primary-color mb-2">
              📅 Calendário Escolar{' '}
              <Text className="text-red-600 font-medium">WORK IN PROGRESS</Text>
            </Text>
            <Text className="text-sm text-secondary-color">
              Veja o calendário escolar e não perca datas importantes.
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default StudentFeed;