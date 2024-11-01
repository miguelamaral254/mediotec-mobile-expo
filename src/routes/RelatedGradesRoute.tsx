// RelatedSchedule.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { User } from '../interfaces/userInterface';
import Schedule from '../screens/Schedule';

type ScheduleStackParamList = {
  Schedule: { userData: User | null };
};

const Stack = createStackNavigator<ScheduleStackParamList>();

interface RelatedScheduleProps {
  userData: User | null; 
}

const RelatedSchedule: React.FC<RelatedScheduleProps> = ({ userData }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="Schedule" 
        children={() => <Schedule userData={userData} />} 
      />
    </Stack.Navigator>
  );
};

export default RelatedSchedule;