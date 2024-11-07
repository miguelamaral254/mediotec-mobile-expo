import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feed from "../screens/Feed";
import { Feather } from "@expo/vector-icons";
import { User } from '../interfaces/userInterface';
import New from '../screens/New';
import { SchoolClass } from '../interfaces/schoolClassInterface';

const Tab = createBottomTabNavigator();

interface TabRoutesProps {
  userData: User | null;
  schoolClass: SchoolClass | null; 

}

const HomeRoute: React.FC<TabRoutesProps> = ({ userData , schoolClass}) => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen 
        name="Feed" 
        children={() => <Feed userData={userData} role={userData?.role || 'STUDENT'} schoolClass={schoolClass} />} 
        options={{
          tabBarIcon: ({ color, size }) => <Feather name="home" color={color} size={size} />,
          tabBarLabel: ''    
        }}
      />
      <Tab.Screen 
        name="New" 
        children={() => <New userData={userData} />} 
        options={{
          tabBarIcon: ({ color, size }) => <Feather name="message-square" color={color} size={size} />,
          tabBarLabel: ''    
        }}
      />
    </Tab.Navigator>
  );
}

export default HomeRoute;