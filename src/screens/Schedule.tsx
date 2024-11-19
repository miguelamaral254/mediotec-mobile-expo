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
    return <Text>Usuário não encontrado.</Text>;
  }

  if (!schoolClassId) {
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <Text style={{ fontSize: 18, color: 'gray' }}>
          Nenhuma turma encontrada para o ano atual.
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 24, margin: 20 }}>Meu Horário</Text>
      <StudentSchedule cpf={userData.cpf} schoolClassId={schoolClassId} />
    </View>
  );
};

export default Schedule;