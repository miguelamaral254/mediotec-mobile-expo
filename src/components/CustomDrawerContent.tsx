import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Feather } from "@expo/vector-icons";
import { DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps, DrawerItem } from '@react-navigation/drawer';
import { User } from '../interfaces/userInterface';

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
          <Text style={{ color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }}>Bem vindo, {userData.name}</Text>
        ) : (
          <Text style={{ color: '#FFFFFF', fontSize: 14 }}>Carregando...</Text>
        )}
      </View>
      <View style={{ flex: 1 }}>
        <DrawerItemList {...props} />
      </View>
      <View style={{ borderTopWidth: 1, borderTopColor: '#ccc', padding: 16 }}>
        {/* Configurações */}
        <TouchableOpacity 
          onPress={() => props.navigation.navigate('settings')} 
          style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 16 }}
        >
          <Feather name="settings" color="#FFFFFF" size={20} />
          <Text style={{ marginLeft: 8, color: '#FFFFFF' }}>Configurações</Text>
        </TouchableOpacity>
        {/* Logout */}
        <TouchableOpacity onPress={onLogout} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 16 }}>
          <Feather name="log-out" size={20} color="#FFFFFF" />
          <Text style={{ marginLeft: 8, color: '#FFFFFF' }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
