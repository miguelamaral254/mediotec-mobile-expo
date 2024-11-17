import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feed from "../screens/Feed";
import { Feather } from "@expo/vector-icons";
import { User } from '../interfaces/userInterface';
import NotificationRoute from './NotificationRoute';
import { SchoolClass } from '../interfaces/schoolClassInterface';
import { Notification } from '../interfaces/notificationInterface';
import { getNotificationsForUser } from '../services/notificationService';
import { ActivityIndicator, View, Text } from 'react-native';

const Tab = createBottomTabNavigator();

interface TabRoutesProps {
  userData: User | null;
  schoolClass: SchoolClass | null; 
}

const HomeRoute: React.FC<TabRoutesProps> = ({ userData, schoolClass }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetchNotifications = async () => {
      if (userData?.cpf) {
        setIsLoading(true); 
        try {
          const response = await getNotificationsForUser(userData.cpf);
          setNotifications(response || []);
        } catch (error) {
          console.error('Erro ao buscar notificações:', error);
        } finally {
          setIsLoading(false); 
        }
      }
    };

    fetchNotifications();
  }, [userData?.cpf]);

  const LoadingPlaceholder = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#4666AF" />
      <Text style={{ marginTop: 10, fontSize: 16, color: '#4666AF' }}>Carregando dados do usuário...</Text>
    </View>
  );

  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen 
        name="Feed" 
        children={() => (
          isLoading ? (
            <LoadingPlaceholder /> 
          ) : (
            <Feed 
              userData={userData} 
              schoolClass={schoolClass} 
              role={userData?.role || 'STUDENT'} 
              notifications={notifications} 
            />
          )
        )}
        options={{
          tabBarIcon: ({ color, size }) => <Feather name="home" color={color} size={size} />,
          tabBarLabel: ''    
        }}
      />
      <Tab.Screen 
        name="Notifications" 
        children={() => (
          isLoading ? (
            <LoadingPlaceholder /> 
          ) : (
            <NotificationRoute userCpf={userData?.cpf || ''} /> 
          )
        )}
        options={{
          tabBarIcon: ({ color, size }) => <Feather name="message-square" color={color} size={size} />,
          tabBarLabel: ''    
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeRoute;