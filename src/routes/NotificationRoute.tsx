import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import NotificationList from '../components/NotificationList'; 
import NotificationDetails from '../components/common/NotificationDetails'; 
import { Notification } from '../interfaces/notificationInterface';
import { getNotificationsForUser } from '../services/notificationService';
import { RootStackParamList } from '../types/navigationTypes';

const Stack = createStackNavigator<RootStackParamList>();

interface NotificationRouteProps {
  userCpf: string;
}

const NotificationRoute: React.FC<NotificationRouteProps> = ({ userCpf }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      setIsLoading(true);
      try {
        const response = await getNotificationsForUser(userCpf);
        setNotifications(response || []);
      } catch (error) {
        console.error('Erro ao buscar notificações:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications();
  }, [userCpf]);

  const LoadingPlaceholder = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#4666AF" />
      <Text style={{ marginTop: 10, fontSize: 16, color: '#4666AF' }}>Carregando notificações...</Text>
    </View>
  );

  const handleRead = (notification: Notification) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notif) =>
        notif.id === notification.id ? { ...notif, read: true } : notif
      )
    );
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="NotificationList"
        options={{ title: 'Notificações' }}
      >
        {() => (
          isLoading ? (
            <LoadingPlaceholder />
          ) : (
            <NotificationList notifications={notifications} onRead={handleRead} />
          )
        )}
      </Stack.Screen>

      <Stack.Screen
        name="NotificationDetails"
        component={NotificationDetails}
        options={{ title: '' }}
      />
    </Stack.Navigator>
  );
};

export default NotificationRoute;