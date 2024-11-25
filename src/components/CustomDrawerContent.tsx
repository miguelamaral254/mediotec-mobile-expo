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
      <View className="p-4 bg-navbarcolor border-b border-white items-center">
        <Image
          source={require('../assets/avatar.png')}
          className="w-16 h-16 rounded-full mb-2"
        />
        {userData ? (
          <Text className=" text-white text-3xl font-bold break-words text-center">Bem vindo, {userData.name}</Text>
        ) : (
          <Text className="text-white text-3xl">Carregando...</Text>
        )}
      </View>
      <View className="flex-1">
        <DrawerItemList {...props} />
      </View>
      <View className="border-t border-white p-4">
        {/* Configurações */}
        <TouchableOpacity 
          onPress={() => props.navigation.navigate('settings')} 
          className="flex-row items-center py-4"
        >
          <Feather name="settings" className="text-white" size={24} color='#FFFFFF' />
          <Text className="text-2xl ml-2 text-white">Configurações</Text>
        </TouchableOpacity>
        {/* Logout */}
        <TouchableOpacity onPress={onLogout} className="flex-row items-center py-4">
          <Feather name="log-out" size={24} color="#FFFFFF" />
          <Text className="text-2xl ml-2 text-white">Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
