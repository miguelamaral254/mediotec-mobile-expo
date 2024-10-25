import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const StudentFeed = () => {
  const navigation = useNavigation();

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      <Text className="text-2xl font-bold text-gray-800 mb-4">
        Painel do Estudante
      </Text>
      <Text className="text-base text-gray-600 mb-4">
        Bem-vindo à área do estudante! Fique por dentro das novidades.
      </Text>

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
          // onPress={() => navigation.navigate("Schedules")}
        >
          <View>
            <Text className="text-lg font-bold text-gray-800 mb-2">🕒 Grade de Horários</Text>
            <Text className="text-sm text-gray-600 mb-4">Confira sua grade de horários e não perca nenhuma aula!</Text>
          </View>
          <Text className="text-blue-600 font-semibold text-center">Ver grade de horários</Text>
        </TouchableOpacity>

        {/* Conceitos */}
        <TouchableOpacity
          className="bg-white rounded-lg p-4 mb-4 w-1/2 shadow-md flex flex-col justify-between"
          // onPress={() => navigation.navigate("Grades")}
        >
          <View>
            <Text className="text-lg font-bold text-gray-800 mb-2">📚 Conceitos</Text>
            <Text className="text-sm text-gray-600 mb-4">Acompanhe suas notas e desempenho nas disciplinas.</Text>
          </View>
          <Text className="text-blue-600 font-semibold text-center">Ver meus conceitos</Text>
        </TouchableOpacity>

        {/* Disciplinas */}
        <TouchableOpacity
          className="bg-white rounded-lg p-4 mb-4 w-1/2 shadow-md flex flex-col justify-between"
        >
          <View>
            <Text className="text-lg font-bold text-gray-800 mb-2">
              📘 Disciplinas <Text className="text-red-600 font-medium">WORK IN PROGRESS</Text>
            </Text>
            <Text className="text-sm text-gray-600 mb-4">Confira as disciplinas em que você está matriculado.</Text>
          </View>
          <Text className="text-blue-600 font-semibold text-center">Ver disciplinas</Text>
        </TouchableOpacity>

        {/* Acesso ao Canvas */}
        <TouchableOpacity
          className="bg-white rounded-lg p-4 mb-4 w-1/2 shadow-md flex flex-col justify-between"
        >
          <View>
            <Text className="text-lg font-bold text-gray-800 mb-2">
              🖥️ Acesso ao Canvas <Text className="text-red-600 font-medium">WORK IN PROGRESS</Text>
            </Text>
            <Text className="text-sm text-gray-600 mb-4">Fique em dia com suas atividades e tarefas.</Text>
          </View>
          <Text className="text-blue-600 font-semibold text-center">Ver atividades</Text>
        </TouchableOpacity>

        {/* Calendário Escolar */}
        <TouchableOpacity
          className="bg-white rounded-lg p-4 mb-4 w-1/2 shadow-md flex flex-col justify-between"
        >
          <View>
            <Text className="text-lg font-bold text-gray-800 mb-2">
              📅 Calendário Escolar <Text className="text-red-600 font-medium">WORK IN PROGRESS</Text>
            </Text>
            <Text className="text-sm text-gray-600 mb-4">Veja o calendário escolar e não perca nenhuma data importante.</Text>
          </View>
          <Text className="text-blue-600 font-semibold text-center">Ver calendário</Text>
        </TouchableOpacity>

        {/* Contato */}
        <TouchableOpacity
          className="bg-white rounded-lg p-4 mb-4 w-1/2 shadow-md flex flex-col justify-between"
        >
          <View>
            <Text className="text-lg font-bold text-gray-800 mb-2">
              📞 Contato <Text className="text-red-600 font-medium">WORK IN PROGRESS</Text>
            </Text>
            <Text className="text-sm text-gray-600 mb-4">Entre em contato com seus professores ou a administração.</Text>
          </View>
          <Text className="text-blue-600 font-semibold text-center">Ver informações de contato</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default StudentFeed;
