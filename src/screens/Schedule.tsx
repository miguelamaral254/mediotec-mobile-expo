import React from 'react';
import { View, Text } from 'react-native';
import { User } from '../interfaces/userInterface';
import StudentSchedule from '../components/student/StudentSchedule';

interface ScheduleProps {
  userData: User | null;
  schoolClassId: number | null;
}

const Schedule: React.FC<ScheduleProps> = ({ userData, schoolClassId }) => {
  if (!userData) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-lg text-gray-500">Usuário não encontrado.</Text>
      </View>
    );
  }

  if (!schoolClassId) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-lg text-gray-500">
          Nenhuma turma encontrada para o ano atual.
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100">
      <Text className="text-4xl font-bold bg-blue-500 text-white px-5 py-5">
        Meu Horário
      </Text>
      <StudentSchedule cpf={userData.cpf} schoolClassId={schoolClassId} />
    </View>
  );
};

export default Schedule;