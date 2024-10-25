import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../screens/Profile';
import { User } from '../interfaces/userInterface';

const Stack = createStackNavigator();

interface StackRoutesProps {
  userData: User | null; 
}

const ProfileRoute: React.FC<StackRoutesProps> = ({ userData }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="home" 
        children={() => <Profile userData={userData} />} 
      />
    </Stack.Navigator>
  );
}

export default ProfileRoute;
