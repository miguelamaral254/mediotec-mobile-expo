import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProfessorFeed = () => {
  const navigation = useNavigation();

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      <Text className="text-2xl font-bold text-gray-800 mb-4">
        Painel do Professor
      </Text>
      <Text className="text-base text-gray-600 mb-4">
        Bem-vindo à área do professor! Fique por dentro das novidades.
      </Text>

      {/* Banner de Avisos */}
      <View className="bg-blue-200 p-4 rounded-lg mb-4">
        <Text className="text-lg font-bold text-orange-800">🚨 Avisos Importantes</Text>
        <Text className="mt-2 text-gray-800">Fique atento aos comunicados da escola:</Text>
        <View className="mt-2 pl-2">
          <Text className="text-gray-800">📅 Reunião de professores dia 12/10 às 17h.</Text>
          <Text className="text-gray-800">📝 Entrega de notas até o dia 25/10.</Text>
          <Text className="text-gray-800">📊 Formação continuada no dia 30/10.</Text>
        </View>
      </View>

      {/* Grid de funcionalidades */}
      <View className="flex flex-row flex-wrap justify-between">
        {/* Minhas Aulas */}
        <TouchableOpacity
          className="bg-white rounded-lg p-4 mb-4 w-1/2 shadow-md flex flex-col justify-between" // Ajustado para flex-col
          // onPress={() => navigation.navigate("Schedules")}
        >
          <View>
            <Text className="text-lg font-bold text-gray-800 mb-2">🕒 Minhas Aulas</Text>
            <Text className="text-sm text-gray-600 mb-4">Confira sua grade de aula.</Text>
          </View>
          <Text className="text-blue-600 font-semibold text-center">Ver turmas</Text>
        </TouchableOpacity>

        {/* Conceitos dos Alunos */}
        <TouchableOpacity
          className="bg-white rounded-lg p-4 mb-4 w-1/2 shadow-md flex flex-col justify-between" // Ajustado para flex-col
          // onPress={() => navigation.navigate("Grades")}
        >
          <View>
            <Text className="text-lg font-bold text-gray-800 mb-2">📚 Conceitos dos Alunos</Text>
            <Text className="text-sm text-gray-600 mb-4">Acompanhe o desempenho dos alunos em suas disciplinas.</Text>
          </View>
          <Text className="text-blue-600 font-semibold text-center">Ver conceitos</Text>
        </TouchableOpacity>

        {/* Plano de Aula */}
        <TouchableOpacity
          className="bg-white rounded-lg p-4 mb-4 w-1/2 shadow-md flex flex-col justify-between" // Ajustado para flex-col
          // onPress={() => navigation.navigate("LessonPlans")}
        >
          <View>
            <Text className="text-lg font-bold text-gray-800 mb-2">
              📖 Plano de Aula <Text className="text-red-500 font-medium">WORK IN PROGRESS</Text>
            </Text>
            <Text className="text-sm text-gray-600 mb-4">Organize e visualize seus planos de aula.</Text>
          </View>
          <Text className="text-blue-600 font-semibold text-center">Ver planos</Text>
        </TouchableOpacity>

        {/* Acesso ao Canvas */}
        <TouchableOpacity
          className="bg-white rounded-lg p-4 mb-4 w-1/2 shadow-md flex flex-col justify-between" // Ajustado para flex-col
          // onPress={() => navigation.navigate("Canvas")}
        >
          <View>
            <Text className="text-lg font-bold text-gray-800 mb-2">
              🖥️ Acesso ao Canvas <Text className="text-red-500 font-medium">WORK IN PROGRESS</Text>
            </Text>
            <Text className="text-sm text-gray-600 mb-4">Mantenha-se atualizado sobre suas atividades e tarefas.</Text>
          </View>
          <Text className="text-blue-600 font-semibold text-center">Ver atividades</Text>
        </TouchableOpacity>

        {/* Calendário Escolar */}
        <TouchableOpacity
          className="bg-white rounded-lg p-4 mb-4 w-1/2 shadow-md flex flex-col justify-between" // Ajustado para flex-col
          // onPress={() => navigation.navigate("Calendar")}
        >
          <View>
            <Text className="text-lg font-bold text-gray-800 mb-2">
              📅 Calendário Escolar <Text className="text-red-500 font-medium">WORK IN PROGRESS</Text>
            </Text>
            <Text className="text-sm text-gray-600 mb-4">Veja o calendário escolar e não perca nenhuma data importante.</Text>
          </View>
          <Text className="text-blue-600 font-semibold text-center">Ver calendário</Text>
        </TouchableOpacity>

        {/* Contato */}
        <TouchableOpacity
          className="bg-white rounded-lg p-4 mb-4 w-1/2 shadow-md flex flex-col justify-between" // Ajustado para flex-col
          // onPress={() => navigation.navigate("Contact")}
        >
          <View>
            <Text className="text-lg font-bold text-gray-800 mb-2">
              📞 Contato <Text className="text-red-500 font-medium">WORK IN PROGRESS</Text>
            </Text>
            <Text className="text-sm text-gray-600 mb-4">Entre em contato com a administração ou outros professores.</Text>
          </View>
          <Text className="text-blue-600 font-semibold text-center">Ver contato</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfessorFeed;
