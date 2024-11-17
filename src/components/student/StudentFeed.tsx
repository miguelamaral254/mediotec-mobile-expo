import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SchoolClass } from '../../interfaces/schoolClassInterface';
import { translateEnum } from '../../utils/translateEnum';
import { NavigationProp } from '@react-navigation/native';
import { StudentStackParamList } from '../routes/StudentFeedRoutes';
import { Linking } from 'react-native';
import NoticeBoard from '../common/NoticeBoard'; // Ajuste o caminho conforme a estrutura do seu projeto

interface StudentFeedProps {
  schoolClass: SchoolClass | null;
  navigation: NavigationProp<StudentStackParamList>;
}

const StudentFeed: React.FC<StudentFeedProps> = ({ schoolClass, navigation }) => {
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
        {schoolClass ? (
          <View className="mt-6 bg-gray-100 p-5 rounded-lg">
            <Text className="text-xl font-semibold text-primary-color text-center">
              {`Turma: ${schoolClass.code} - ${translateEnum(schoolClass.letter, 'letter')} (${translateEnum(schoolClass.shift, 'shift')})`}
            </Text>
            <Text className="text-lg text-center">{`${translateEnum(schoolClass.technicalCourse, 'technicalCourse')} - ${translateEnum(schoolClass.year, 'year')}`}</Text>
          </View>
        ) : null}
      </View>

      <NoticeBoard />

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
        >
          <View>
            <Text className="text-lg font-bold text-primary-color mb-2">
              📅 Calendário Escolar <Text className="text-red-600 font-medium">WORK IN PROGRESS</Text>
            </Text>
            <Text className="text-sm text-secondary-color mb-4">Veja o calendário escolar e não perca nenhuma data importante.</Text>
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
    </ScrollView>
  );
};

export default StudentFeed;