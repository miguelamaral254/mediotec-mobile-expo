import React from 'react';
import { View, Text, Image } from 'react-native';
import { Feather } from "@expo/vector-icons";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps, DrawerItem } from '@react-navigation/drawer';
import TabRoutes from './tab.routes';
import StackRoutes from './stack.routes';
import LogoutButton from '../components/Logout';
import Settings from '../screens/Settings';
import { User } from '../interfaces/userInterface';

const Drawer = createDrawerNavigator();

interface CustomDrawerContentProps extends DrawerContentComponentProps {
  onLogout: () => void;
  userData: User | null;
}

const CustomDrawerContent: React.FC<CustomDrawerContentProps> = ({ onLogout, userData, ...props }) => {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1, backgroundColor: '#1E1E1E' }}>
      <View style={{ padding: 16, backgroundColor: '#2A2A2A', borderBottomWidth: 1, borderBottomColor: '#ccc', alignItems: 'center' }}>
        <Image
          source={require('../assets/avatar.png')}
          style={{ width: 80, height: 80, borderRadius: 40, marginBottom: 8 }}
        />
        {userData ? (
          <>
            <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }}>Bem vindo, {userData.name}</Text>
          </>
        ) : (
          <Text style={{ color: '#FFFFFF', fontSize: 14 }}>Carregando...</Text>
        )}
      </View>
      <View style={{ flex: 1 }}>
        <DrawerItemList {...props} />
      </View>
      <View style={{ borderTopWidth: 1, borderTopColor: '#ccc', padding: 16 }}>
        <DrawerItem
          label={() => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Feather name="settings" color="#FFFFFF" size={20} />
              <Text style={{ color: '#FFFFFF', marginLeft: 8 }}>Configurações</Text>
            </View>
          )}
          onPress={() => props.navigation.navigate('settings')}
        />
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
      screenOptions={{
        headerTitle: '',
        drawerActiveTintColor: '#FFFFFF',
        drawerInactiveTintColor: '#FFFFFF',
        drawerActiveBackgroundColor: '#0000FF',
        drawerLabelStyle: { color: '#FFFFFF' },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} onLogout={onLogout} userData={userData} />}
    >
      <Drawer.Screen
        name="home"
        component={TabRoutes}
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
        children={() => <StackRoutes userData={userData} />}
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

export default DrawerRoutes;
