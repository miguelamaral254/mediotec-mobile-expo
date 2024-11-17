import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SchoolClass } from '../interfaces/schoolClassInterface';
import StudentFeed from '../components/student/StudentFeed';
import Contacts from '../screens/Contacts';
import { User } from '../interfaces/userInterface';
import { Notification } from '../interfaces/notificationInterface';

export type StudentStackParamList = {
  StudentFeed: undefined;
  Contacts: undefined;
};

export const Stack = createStackNavigator<StudentStackParamList>();

interface StudentFeedRoutesProps {
  schoolClass: SchoolClass | null;
  userData: User | null; 
  notifications: Notification[]; // Adicionado
}

const StudentFeedRoutes: React.FC<StudentFeedRoutesProps> = ({ schoolClass, userData, notifications }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="StudentFeed"
        children={({ navigation }) => (
          <StudentFeed 
            schoolClass={schoolClass} 
            userData={userData} 
            notifications={notifications} 
            navigation={navigation} 
          />
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