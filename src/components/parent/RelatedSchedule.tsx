import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Student } from '../../interfaces/studentInterface';
import Schedule from '../../screens/Schedule';

type ScheduleStackParamList = {
  Schedule: { student: Student };
};

const Stack = createStackNavigator<ScheduleStackParamList>();

interface RelatedScheduleProps {
  student: Student;
}

const RelatedSchedule: React.FC<RelatedScheduleProps> = ({ student }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="Schedule" 
        children={() => <Schedule student={student} />} 
        initialParams={{ student }}
      />
    </Stack.Navigator>
  );
};

export default RelatedSchedule;