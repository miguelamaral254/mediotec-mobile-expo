import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SchoolClass } from '../../interfaces/schoolClassInterface';
import { translateEnum } from '../../utils/translateEnum';
import { NavigationProp } from '@react-navigation/native';
import { StudentStackParamList } from '../../routes/StudentFeedRoutes';
import { Linking } from 'react-native';
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
    <ScrollView className="flex-1 p-4">
      <View>
        {currentYearClasses.length > 0 ? (
          currentYearClasses.map((schoolClass) => (
            <View
              key={schoolClass.id}
              className="mt-6 p-5 rounded-lg mb-16"
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
          <Text>
          </Text>
        )}
      </View>
      {/* <View className="flex-1 justify-center items-center flex-col">
      <NoticeBoard notifications={notifications}/>
      </View> */}
      <Text className="text-4xl font-bold text-primary-color mb-4 mt-32">
        Painel do Estudante
      </Text>
      <View className="flex-1 justify-center items-center flex-col">

        {/* AVA */}
        <TouchableOpacity className="w-[384px] h-[112px] bg-white justify-center items-center rounded-lg shadow-md mb-2" onPress={handleOpenAva}>
            <Text className="text-3xl font-bold text-primary mb-2">
              🖥️ Acesso ao AVA
            </Text>
            <Text>
              Fique em dia com suas atividades e tarefas.
            </Text>
        </TouchableOpacity>

        {/* Financeiro */}
        <TouchableOpacity className="w-[384px] h-[112px] bg-white justify-center items-center rounded-lg shadow-md mb-2" onPress={handleOpenFinanceiro}>
            <Text className="text-3xl font-bold text-primary mb-2">
              💰 Acesso ao Financeiro
            </Text>
            <Text>
              Consulte seus pagamentos e mensalidades.
            </Text>
        </TouchableOpacity>

        {/* Contato */}
        <TouchableOpacity className="w-[384px] h-[112px] bg-white justify-center items-center rounded-lg shadow-md mb-2" onPress={() => navigation.navigate('Contacts')}>
            <Text className="text-3xl font-bold text-primary mb-2">
              📞 Contato
            </Text>
            <Text>
              Entre em contato com seus professores ou a administração.
            </Text>
        </TouchableOpacity>

        {/* Calendário */}
        <TouchableOpacity className="w-[384px] h-[112px] bg-white justify-center items-center rounded-lg shadow-md mb-2">
            <Text className="text-3xl font-bold text-primary mb-2">
              📅 Calendário Escolar{' '}
              <Text className="text-red-600 font-medium text-center text-justify">WORK IN PROGRESS</Text>
            </Text>
            <Text>
              Veja o calendário escolar e não perca datas importantes.
            </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default StudentFeed;