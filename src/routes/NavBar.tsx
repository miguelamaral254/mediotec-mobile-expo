import React from 'react';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import TabRoutes from './HomeRoute';
import ProfileRoute from './ProfileRoute';
import CustomDrawerContent from '../components/CustomDrawerContent';
import Settings from '../screens/Settings';
import { User } from '../interfaces/userInterface';
import { Feather } from "@expo/vector-icons";
import { Text, View } from 'react-native';

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
        drawerActiveBackgroundColor: '#0000FF',
        drawerLabelStyle: { color: '#FFFFFF' },
      }}
      drawerContent={(props: DrawerContentComponentProps) => (
        <CustomDrawerContent {...props} onLogout={onLogout} userData={userData} />
      )}
    >
      <Drawer.Screen
        name="home"
        children={() => <TabRoutes userData={userData} />} // Passing userData to TabRoutes
        options={{
          drawerLabel: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Feather name="home" color="#FFFFFF" size={20} />
              <Text style={{ color: '#FFFFFF', marginLeft: 8 }}>Início</Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="profile"
        children={() => <ProfileRoute userData={userData} />}
        options={{
          drawerLabel: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Feather name="user" color="#FFFFFF" size={20} />
              <Text style={{ color: '#FFFFFF', marginLeft: 8 }}>Meu perfil</Text>
            </View>
          ),
        }}
      />
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
