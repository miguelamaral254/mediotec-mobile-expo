import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SchoolClass } from '../interfaces/schoolClassInterface';
import Contacts from '../screens/Contacts';
import { User } from '../interfaces/userInterface';
import { Notification } from '../interfaces/notificationInterface';
import ParentFeed from '../components/parent/ParentFeed';

export type ParentStackParamList = {
  ParentFeed: undefined;
  Contacts: undefined;
};

export const Stack = createStackNavigator<ParentStackParamList>();

interface ParentFeedRoutesProps {
  userData: User | null;

}

const ParentFeedRoutes: React.FC<ParentFeedRoutesProps> = ({  userData }) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ParentFeed"
        children={({ navigation }) => (
          <ParentFeed
            userData={userData}
            navigation={navigation}
          />
        )}
        options={{ title: 'Painel dos Pais' }}
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

export default ParentFeedRoutes;
