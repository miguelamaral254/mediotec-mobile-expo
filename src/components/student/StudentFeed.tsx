import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SchoolClass } from '../../interfaces/schoolClassInterface';
import { translateEnum } from '../../utils/translateEnum';
import { NavigationProp } from '@react-navigation/native';
import { StudentStackParamList } from '../routes/StudentFeedRoutes'; // Certifique-se de que o caminho está correto

interface StudentFeedProps {
  schoolClass: SchoolClass | null;
  navigation: NavigationProp<StudentStackParamList>; // Adicione o tipo para o navigation
}

const StudentFeed: React.FC<StudentFeedProps> = ({ schoolClass, navigation }) => {
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

      {/* Banner de Avisos */}
      <View className="bg-yellow-100 p-4 rounded-lg mb-4">
        <Text className="text-lg font-bold text-orange-800">🚨 Avisos Importantes</Text>
        <Text className="mt-2 text-gray-800">Fique atento aos comunicados da escola:</Text>
        <View className="mt-2 pl-2">
          <Text className="text-gray-800">📅 Reunião de pais e mestres dia 10/10 às 18h.</Text>
          <Text className="text-gray-800">📝 Entrega de trabalhos até o dia 15/10.</Text>
          <Text className="text-gray-800">📊 Prova de matemática dia 20/10.</Text>
        </View>
      </View>

      {/* Grid de funcionalidades */}
      <View className="flex flex-row flex-wrap justify-between">
        {/* Grade de Horários */}
        <TouchableOpacity
          className="bg-white rounded-lg p-4 mb-4 w-1/2 shadow-md flex flex-col justify-between"
        >
          <View>
            <Text className="text-lg font-bold text-primary-color mb-2">🕒 Grade de Horários</Text>
            <Text className="text-sm text-secondary-color mb-4">Confira sua grade de horários e não perca nenhuma aula!</Text>
          </View>
        </TouchableOpacity>

        {/* Conceitos */}
        <TouchableOpacity
          className="bg-white rounded-lg p-4 mb-4 w-1/2 shadow-md flex flex-col justify-between"
        >
          <View>
            <Text className="text-lg font-bold text-primary-color mb-2">📚 Conceitos</Text>
            <Text className="text-sm text-secondary-color mb-4">Acompanhe suas notas e desempenho nas disciplinas.</Text>
          </View>
        </TouchableOpacity>

        {/* Disciplinas */}
        <TouchableOpacity
          className="bg-white rounded-lg p-4 mb-4 w-1/2 shadow-md flex flex-col justify-between"
        >
          <View>
            <Text className="text-lg font-bold text-primary-color mb-2">
              📘 Disciplinas <Text className="text-red-600 font-medium">WORK IN PROGRESS</Text>
            </Text>
            <Text className="text-sm text-secondary-color mb-4">Confira as disciplinas em que você está matriculado.</Text>
          </View>
        </TouchableOpacity>

        {/* Acesso ao Canvas */}
        <TouchableOpacity
          className="bg-white rounded-lg p-4 mb-4 w-1/2 shadow-md flex flex-col justify-between"
        >
          <View>
            <Text className="text-lg font-bold text-primary-color mb-2">
              🖥️ Acesso ao Canvas <Text className="text-red-600 font-medium">WORK IN PROGRESS</Text>
            </Text>
            <Text className="text-sm text-secondary-color mb-4">Fique em dia com suas atividades e tarefas.</Text>
          </View>
        </TouchableOpacity>

        {/* Calendário Escolar */}
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

        {/* Contato */}
        <TouchableOpacity
          className="bg-white rounded-lg p-4 mb-4 w-1/2 shadow-md flex flex-col justify-between"
          onPress={() => navigation.navigate('Contacts')} // Navega para a tela Contacts
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