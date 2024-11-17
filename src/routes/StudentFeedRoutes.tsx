import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SchoolClass } from '../interfaces/schoolClassInterface';
import StudentFeed from '../components/student/StudentFeed';
import Contacts from '../screens/Contacts';
import { User } from '../interfaces/userInterface';

type StudentStackParamList = {
  StudentFeed: undefined;
  Contacts: undefined;
};

export const Stack = createStackNavigator<StudentStackParamList>();

interface StudentFeedRoutesProps {
  schoolClass: SchoolClass | null;
  userData: User | null; // Adicionado para receber o userData
}

const StudentFeedRoutes: React.FC<StudentFeedRoutesProps> = ({ schoolClass, userData }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="StudentFeed"
        children={({ navigation }) => (
          <StudentFeed schoolClass={schoolClass} userData={userData} navigation={navigation} />
        )}
        options={{ title: 'Painel do Estudante' }}
      />
      <Stack.Screen
        name="Contacts"
        component={Contacts}
        options={{
          headerShown: true,
          title: '',
          headerBackTitleVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default StudentFeedRoutes;