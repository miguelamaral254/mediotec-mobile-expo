import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from '@react-navigation/drawer';
import { User } from '../interfaces/userInterface';

interface CustomDrawerContentProps extends DrawerContentComponentProps {
  onLogout: () => void;
  userData: User | null;
}

const CustomDrawerContent: React.FC<CustomDrawerContentProps> = ({ onLogout, userData, ...props }) => {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ flex: 1, backgroundColor: '#1E1E1E' }}
    >
      <View className="p-6 bg-blue-500 items-center">
        <Image
          source={require('../assets/avatar.png')}
          className="w-20 h-20 rounded-full mb-4 border-2 border-white"
        />
        {userData ? (
          <Text className="text-white text-2xl font-bold text-center">
            Bem-vindo, {userData.name}
          </Text>
        ) : (
          <Text className="text-white text-xl">Carregando...</Text>
        )}
      </View>
      <View className="flex-1 bg-gray-900">
        <DrawerItemList {...props} />
      </View>
      <View className="border-t border-gray-700 p-4 bg-gray-900">
        <TouchableOpacity
          onPress={() => props.navigation.navigate('settings')}
          className="flex-row items-center mb-4"
        >
          <Feather name="settings" size={24} color="#FFFFFF" />
          <Text className="text-lg ml-3 text-white">Configurações</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onLogout}
          className="flex-row items-center"
        >
          <Feather name="log-out" size={24} color="#FFFFFF" />
          <Text className="text-lg ml-3 text-white">Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;