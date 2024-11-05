// StudentGradesRoute.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { User } from '../interfaces/userInterface';
import StudentDisciplinesLookUp from '../components/student/StudentDisciplinesLookUp';
import DisciplineDetail from '../components/student/DisciplineDetail';
import Schedule from '../screens/Schedule';
import { DisciplineInterface } from '../interfaces/disciplineInterface';

type RootStackParamList = {
  Disciplines: undefined;
  DisciplineDetail: { discipline: DisciplineInterface; studentCpf: string };
  Schedule: { userData: User | null };
};

const Stack = createStackNavigator<RootStackParamList>();

interface StackRoutesProps {
  userData: User | null; 
}

const StudentGradesRoute: React.FC<StackRoutesProps> = ({ userData }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="Disciplines" 
        children={() => <StudentDisciplinesLookUp userData={userData} />} 
      />
      <Stack.Screen 
        name="DisciplineDetail" 
        children={({ route }) => <DisciplineDetail route={route} />} 
      />
      <Stack.Screen 
      name="Schedule" 
      children={() => <Schedule userData={userData} />}
  />
    </Stack.Navigator>
  );
};

export default StudentGradesRoute;