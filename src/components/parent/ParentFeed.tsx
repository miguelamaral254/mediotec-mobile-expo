import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { User } from '../../interfaces/userInterface';

interface ParentFeedProps {
  userData: User | null; 
}

const ParentFeed: React.FC<ParentFeedProps> = ({ userData }) => {
  const navigation = useNavigation();

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      <Text className="text-2xl font-bold text-gray-800 mb-4">Painel dos Pais</Text>
      <Text className="text-base text-gray-600 mb-4">
        Bem-vindo à área dos pais! Acompanhe o desempenho dos seus filhos.
      </Text>

      {/* Lista de Filhos */}
      <View className="bg-blue-200 p-4 rounded-lg mb-4">
        <Text className="text-lg font-bold text-orange-800">👨‍👩‍👧‍👦 Seus Filhos</Text>
        <View className="mt-2 pl-2">
          {userData && userData.students && userData.students.length > 0 ? (
            userData.students.map((student, index) => (
              <Text key={index} className="text-gray-800">
                👦 {student.name} - {student.registration} 
              </Text>
            ))
          ) : (
            <Text className="text-gray-800">Nenhum filho cadastrado.</Text>
          )}
        </View>
      </View>

      {/* Grid de funcionalidades */}
      <View className="flex flex-row flex-wrap justify-between">
        {/* Boletim do Aluno */}
        <TouchableOpacity
          className="bg-white rounded-lg p-4 mb-4 w-1/2 shadow-md flex flex-col justify-between"
       //   onPress={() => navigation.navigate("Grades")}
        >
          <View>
            <Text className="text-lg font-bold text-gray-800 mb-2">📊 Boletim</Text>
            <Text className="text-sm text-gray-600 mb-4">Visualize as notas e conceitos do aluno.</Text>
          </View>
          <Text className="text-blue-600 font-semibold text-center">Ver boletim</Text>
        </TouchableOpacity>

        {/* Agenda Escolar */}
        <TouchableOpacity
          className="bg-white rounded-lg p-4 mb-4 w-1/2 shadow-md flex flex-col justify-between"
       //   onPress={() => navigation.navigate("Calendar")}
        >
          <View>
            <Text className="text-lg font-bold text-gray-800 mb-2">📅 Agenda Escolar</Text>
            <Text className="text-sm text-gray-600 mb-4">Confira eventos e datas importantes.</Text>
          </View>
          <Text className="text-blue-600 font-semibold text-center">Ver agenda</Text>
        </TouchableOpacity>

        {/* Comunicados da Escola */}
        <TouchableOpacity
          className="bg-white rounded-lg p-4 mb-4 w-1/2 shadow-md flex flex-col justify-between"
        //  onPress={() => navigation.navigate("Announcements")}
        >
          <View>
            <Text className="text-lg font-bold text-gray-800 mb-2">📢 Comunicados</Text>
            <Text className="text-sm text-gray-600 mb-4">Fique por dentro das novidades.</Text>
          </View>
          <Text className="text-blue-600 font-semibold text-center">Ver comunicados</Text>
        </TouchableOpacity>

        {/* Desempenho Acadêmico */}
        <TouchableOpacity
          className="bg-white rounded-lg p-4 mb-4 w-1/2 shadow-md flex flex-col justify-between"
        //  onPress={() => navigation.navigate("Performance")}
        >
          <View>
            <Text className="text-lg font-bold text-gray-800 mb-2">📈 Desempenho Acadêmico</Text>
            <Text className="text-sm text-gray-600 mb-4">Veja o histórico de desempenho do aluno.</Text>
          </View>
          <Text className="text-blue-600 font-semibold text-center">Ver desempenho</Text>
        </TouchableOpacity>

        {/* Contato com Professores */}
        <TouchableOpacity
          className="bg-white rounded-lg p-4 mb-4 w-1/2 shadow-md flex flex-col justify-between"
        //  onPress={() => navigation.navigate("Contact")}
        >
          <View>
            <Text className="text-lg font-bold text-gray-800 mb-2">📞 Contato com Professores</Text>
            <Text className="text-sm text-gray-600 mb-4">Entre em contato com os professores.</Text>
          </View>
          <Text className="text-blue-600 font-semibold text-center">Ver contatos</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ParentFeed;