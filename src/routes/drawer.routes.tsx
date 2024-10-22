import React from 'react';
import { View } from 'react-native';
import { Feather } from "@expo/vector-icons";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from '@react-navigation/drawer';
import TabRoutes from './tab.routes';
import StackRoutes from './stack.routes';
import LogoutButton from '../components/Logout';
import Settings from '../screens/Settings';
import { User } from '../interfaces/userInterface';

const Drawer = createDrawerNavigator();

interface CustomDrawerContentProps extends DrawerContentComponentProps {
  onLogout: () => void;
}

const CustomDrawerContent: React.FC<CustomDrawerContentProps> = ({ onLogout, ...props }) => {
  return (
    <DrawerContentScrollView {...props} style={{ flex: 1, backgroundColor: '#fff' }}>
      <DrawerItemList {...props} />
      <View style={{ padding: 16 }}>
        <LogoutButton onLogout={onLogout} />
      </View>
    </DrawerContentScrollView>
  );
};

interface DrawerRoutesProps {
  onLogout: () => void;
  userData: User | null;
}

const DrawerRoutes: React.FC<DrawerRoutesProps> = ({ onLogout, userData }) => {
  return (
    <Drawer.Navigator 
      drawerContent={(props) => <CustomDrawerContent {...props} onLogout={onLogout} />}
    >
      <Drawer.Screen
        name="home"
        component={TabRoutes}
        options={{
          drawerIcon: ({ color, size }) => <Feather name="home" color={color} size={size} />,
          drawerLabel: 'Início'
        }}
      />
      <Drawer.Screen
  name="profile"
  children={() => <StackRoutes userData={userData} />} // Pass userData to StackRoutes
  options={{
    drawerIcon: ({ color, size }) => <Feather name="user" color={color} size={size} />,
    drawerLabel: 'Meu perfil'
  }}
/>

      <Drawer.Screen
        name="settings"
        component={Settings}
        options={{
          drawerIcon: ({ color, size }) => <Feather name="settings" color={color} size={size} />,
          drawerLabel: 'Configurações'
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerRoutes;
