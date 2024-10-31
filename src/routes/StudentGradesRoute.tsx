import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { User } from '../interfaces/userInterface';
import StudentDisciplinesLookUp from '../components/student/StudentDisciplinesLookUp';
import DisciplineDetail from '../components/student/DisciplineDetail';
import { DisciplineInterface } from '../interfaces/disciplineInterface';

type RootStackParamList = {
  Disciplines: undefined;
  DisciplineDetail: { discipline: DisciplineInterface; studentCpf: string };
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
    </Stack.Navigator>
  );
};

export default StudentGradesRoute;
