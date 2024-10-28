// Schedule.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { User } from '../interfaces/userInterface';
import StudentSchedule from '../components/student/StudentSchedule';

interface ScheduleProps {
  userData: User | null;
}

const Schedule: React.FC<ScheduleProps> = ({ userData }) => {
  if (!userData) {
    return <Text>Usuário não encontrado.</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 24, margin: 20 }}>Meu Horário</Text>
      <StudentSchedule cpf={userData.cpf} />
    </View>
  );
};

export default Schedule;
