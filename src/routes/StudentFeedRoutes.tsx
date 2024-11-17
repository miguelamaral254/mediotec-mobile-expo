import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SchoolClass } from '../interfaces/schoolClassInterface';
import StudentFeed from '../components/student/StudentFeed';
import Contacts from '../screens/Contacts';

type StudentStackParamList = {
  StudentFeed: undefined; 
  Contacts: undefined; 
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