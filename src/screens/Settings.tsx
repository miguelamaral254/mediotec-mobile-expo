import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';

const Settings = () => {
  const handleOptionPress = (option: string) => {
    Alert.alert(`Você selecionou: ${option}`);
  };

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-4xl font-bold mb-5">Configurações</Text>
      <TouchableOpacity
        className="py-4 px-6 my-2 w-4/5 rounded-lg bg-secondary-color items-center shadow-lg"
        onPress={() => handleOptionPress('Alterar Senha')}
      >
        <Text className="text-2xl font-semibold color-white">Alterar Senha</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="py-4 px-6 my-2 w-4/5 rounded-lg bg-secondary-color items-center shadow-lg"
        onPress={() => handleOptionPress('Notificações')}
      >
        <Text className="text-2xl font-semibold color-white">Notificações</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="py-4 px-6 my-2 w-4/5 rounded-lg bg-secondary-color items-center shadow-lg"
        onPress={() => handleOptionPress('Tema')}
      >
        <Text className="text-2xl font-semibold color-white">Tema</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="py-4 px-6 my-2 w-4/5 rounded-lg bg-secondary-color items-center shadow-lg"
        onPress={() => handleOptionPress('Sobre')}
      >
        <Text className="text-2xl font-semibold color-white">Sobre</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="py-4 px-6 my-2 w-4/5 rounded-lg bg-secondary-color items-center shadow-lg"
        onPress={() => handleOptionPress('Preferências')}
      >
        <Text className="text-2xl font-semibold color-white">Preferências</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;