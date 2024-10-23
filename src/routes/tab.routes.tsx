import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feed from "../screens/Feed";

import { Feather } from "@expo/vector-icons";
import { User } from '../interfaces/userInterface';
import New from '../screens/New';

const Tab = createBottomTabNavigator();

interface TabRoutesProps {
  userData: User | null; // Definindo o tipo de userData
}

const TabRoutes: React.FC<TabRoutesProps> = ({ userData }) => { // Aceitando userData como prop
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen 
        name="Feed" 
        component={Feed} 
        options={{
          tabBarIcon: ({ color, size }) => <Feather name="home" color={color} size={size} />,
          tabBarLabel: 'Início'    
        }}
      />
      <Tab.Screen 
  name="New" 
  children={() => <New userData={userData} />} // Passando userData como prop
  options={{
    tabBarIcon: ({ color, size }) => <Feather name="plus" color={color} size={size} />,
    tabBarLabel: 'Novo'    
  }}
/>
    </Tab.Navigator>
  );
}

export default TabRoutes;
