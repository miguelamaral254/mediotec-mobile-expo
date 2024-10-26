import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Feather } from "@expo/vector-icons";
import { DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from '@react-navigation/drawer';
import { User } from '../interfaces/userInterface';

interface CustomDrawerContentProps extends DrawerContentComponentProps {
  onLogout: () => void;
  userData: User | null;
}

const CustomDrawerContent: React.FC<CustomDrawerContentProps> = ({ onLogout, userData, ...props }) => {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1, backgroundColor: '#1E1E1E' }}>
      <View className="p-4 bg-secondary-color border-b border-gray-300 items-center">
        <Image
          source={require('../assets/avatar.png')}
          className="w-20 h-20 rounded-full mb-2"
        />
        {userData ? (
          <Text className="text-white text-lg font-bold">Bem vindo, {userData.name}</Text>
        ) : (
          <Text className="text-white text-sm">Carregando...</Text>
        )}
      </View>
      <View className="flex-1">
        <DrawerItemList {...props} />
      </View>
      <View className="border-t border-gray-300 p-4">
        {/* Configurações */}
        <TouchableOpacity 
          onPress={() => props.navigation.navigate('settings')} 
          className="flex-row items-center py-4"
        >
          <Feather name="settings" className="text-white" size={20} />
          <Text className="ml-2 text-white">Configurações</Text>
        </TouchableOpacity>
        {/* Logout */}
        <TouchableOpacity onPress={onLogout} className="flex-row items-center py-4">
          <Feather name="log-out" size={20} color="#FFFFFF" />
          <Text className="ml-2 text-white">Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
