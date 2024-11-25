import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { User } from '../../interfaces/userInterface';
import NoticeBoard from '../common/NoticeBoard';

interface ParentFeedProps {
  userData: User | null; 
}

const ParentFeed: React.FC<ParentFeedProps> = ({ userData }) => {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Text className="text-4xl font-bold text-primary-color mb-4 mt-32">Painel dos Pais</Text>
            {/* Lista de Filhos */}

      <ScrollView showsVerticalScrollIndicator={false} className='flex-1'>
      <View className=" p-4 justify-start  rounded-lg">
        <View className="bg-blue-500 p-4 rounded-lg">
          <Text className="text-2xl font-bold color-white">👨‍👩‍👧‍👦 Alunos</Text>
        </View>
        <View className="justify-center items-center bg-white rounded-lg p-4">
          {userData && userData.students && userData.students.length > 0 ? (
            userData.students.map((student, index) => (
              <Text key={index} className="text-gray-800 text-center">
                👦 {student.name} - {student.registration} 
              </Text>
            ))
          ) : (
            <Text className="text-gray-800 text-center">Nenhum filho cadastrado.</Text>
          )}
        </View>
      </View>
      <View className=" p-4 justify-start  rounded-lg">
        <View className="bg-blue-500 p-4 rounded-lg">
          <Text className='text-2xl font-bold color-white'>🚨 Avisos importantes!</Text>
        </View>
        <View className='justify-center items-center bg-white rounded-lg p-4'>
          <NoticeBoard notifications={notifications} />
        </View>
      </View>
      {/* Grid de funcionalidades */}
      <View className="flex flex-row flex-wrap justify-between mt-6">
        {/* Boletim do Aluno */}
        <View className="w-[48%] h-40 mb-4 justify-between">
        <TouchableOpacity
          className="bg-white rounded-lg p-4 shadow-md h-full flex justify-between items-center"
       //   onPress={() => navigation.navigate("Grades")}
        >
          <View className="flex-1 justify-center items-center">
            <Text className="text-lg font-bold text-gray-800 mb-2">📊 Boletim</Text>
          </View>
          
        </TouchableOpacity>
        </View>
        {/* Agenda Escolar */}
        <View className="w-[48%] h-40 mb-4 justify-between">
        <TouchableOpacity
          className="bg-white rounded-lg p-4 shadow-md h-full flex justify-between items-center"
       //   onPress={() => navigation.navigate("Calendar")}
        >
          <View className="flex-1 justify-center items-center">
            <Text className="text-lg font-bold text-gray-800 mb-2">📅 Agenda Escolar</Text>
          </View>
        </TouchableOpacity>
        </View>
        {/* Desempenho Acadêmico */}
        <View className="w-[48%] h-40 mb-4 justify-between">
        <TouchableOpacity
          className="bg-white rounded-lg p-4 shadow-md h-full flex justify-between items-center"
        //  onPress={() => navigation.navigate("Performance")}
        >
          <View className="flex-1 justify-center items-center">
            <Text className="text-lg font-bold text-gray-800 mb-2 text-center">📈 Desempenho Acadêmico</Text>
          </View>
        </TouchableOpacity>
        </View>
        {/* Contato com Professores */}
        <View className="w-[48%] h-40 mb-4 justify-between">
        <TouchableOpacity
          className="bg-white rounded-lg p-4 shadow-md h-full flex justify-between items-center"
        //  onPress={() => navigation.navigate("Contact")}
        >
          <View className="flex-1 justify-center items-center">
            <Text className="text-lg font-bold text-gray-800 mb-2 text-center">📞 Contato com Professores</Text>
          </View>
        </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
    </View>
  );
};

export default ParentFeed;