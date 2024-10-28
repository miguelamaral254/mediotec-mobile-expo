import React from 'react';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import { Text, View } from 'react-native';
import { Feather } from "@expo/vector-icons";
import CustomDrawerContent from '../components/CustomDrawerContent';
import TabRoutes from './HomeRoute';
import ProfileRoute from './ProfileRoute';
import Settings from '../screens/Settings';
import StudentGradesRoute from './StudentGradesRoute';
import { User } from '../interfaces/userInterface';
import Schedule from '../screens/Schedule';

const Drawer = createDrawerNavigator();

interface NavBarProps {
  onLogout: () => void;
  userData: User | null;
}

const NavBar: React.FC<NavBarProps> = ({ onLogout, userData }) => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitle: '',
        drawerActiveTintColor: '#FFFFFF',
        drawerInactiveTintColor: '#FFFFFF',
        drawerActiveBackgroundColor: 'bg-primary-color',
        drawerLabelStyle: { color: '#FFFFFF' },
      }}
      drawerContent={(props: DrawerContentComponentProps) => (
        <CustomDrawerContent {...props} onLogout={onLogout} userData={userData} />
      )}
    >
      <Drawer.Screen
        name="home"
        children={() => <TabRoutes userData={userData} />}
        options={{
          drawerLabel: () => (
            <View className="flex-row items-center">
              <Feather name="home" className="text-secondary-color" size={20} />
              <Text className="text-secondary-color ml-2">Início</Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="profile"
        children={() => <ProfileRoute userData={userData} />}
        options={{
          drawerLabel: () => (
            <View className="flex-row items-center">
              <Feather name="user" className="text-secondary-color" size={20} />
              <Text className="text-secondary-color ml-2">Meu perfil</Text>
            </View>
          ),
        }}
      />
      {userData?.role === 'STUDENT' && (
        <Drawer.Screen
          name="grades"
          children={() => <StudentGradesRoute userData={userData} />}
          options={{
            drawerLabel: () => (
              <View className="flex-row items-center">
                <Feather name="user" className="text-secondary-color" size={20} />
                <Text className="text-secondary-color ml-2">Meus conceitos</Text>
              </View>
            ),
          }}
        />
      )}
      {userData && (
        <Drawer.Screen
          name="schedule"
          children={() => <Schedule userData={userData} />} // Usando ScheduleRoute aqui
          options={{
            drawerLabel: () => (
              <View className="flex-row items-center">
                <Feather name="calendar" className="text-secondary-color" size={20} />
                <Text className="text-secondary-color ml-2">Meu Horário</Text>
              </View>
            ),
          }}
        />
      )}
      <Drawer.Screen
        name="settings"
        component={Settings}
        options={{
          drawerItemStyle: { display: 'none' },
        }}
      />
    </Drawer.Navigator>
  );
};

export default NavBar;
