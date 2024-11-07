import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../screens/Profile';
import { User } from '../interfaces/userInterface';
import { SchoolClass } from '../interfaces/schoolClassInterface';

const Stack = createStackNavigator();

interface StackRoutesProps {
  userData: User | null; 
  schoolClass: SchoolClass | null; 
}

const ProfileRoute: React.FC<StackRoutesProps> = ({ userData, schoolClass }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="home" 
        children={() => <Profile userData={userData} schoolClass={schoolClass} />} 
      />
    </Stack.Navigator>
  );
}

export default ProfileRoute;
