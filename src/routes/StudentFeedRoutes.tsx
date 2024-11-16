import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SchoolClass } from '../interfaces/schoolClassInterface';
import StudentFeed from '../components/student/StudentFeed';
import Contacts from '../screens/Contacts';

// Definição de tipos para as rotas da stack de navegação
type StudentStackParamList = {
  StudentFeed: undefined; // A tela StudentFeed não precisa de parâmetros
  Contacts: undefined; // A tela Contacts também não precisa de parâmetros
};

export const Stack = createStackNavigator<StudentStackParamList>();

interface StudentFeedRoutesProps {
  schoolClass: SchoolClass | null;
}

const StudentFeedRoutes: React.FC<StudentFeedRoutesProps> = ({ schoolClass }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="StudentFeed" 
        children={({ navigation }) => (
          <StudentFeed schoolClass={schoolClass} navigation={navigation} />
        )}
        options={{ title: 'Painel do Estudante' }}
      />
      <Stack.Screen 
        name="Contacts" 
        component={Contacts}
        options={{ title: 'Contato' }}
      />
    </Stack.Navigator>
  );
};

export default StudentFeedRoutes;