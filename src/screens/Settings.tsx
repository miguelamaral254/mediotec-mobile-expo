import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';

const Settings = () => {
  const handleOptionPress = (option: string) => {
    Alert.alert(`Você selecionou: ${option}`);
  };

  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-2xl font-bold mb-5">Configurações</Text>
      <TouchableOpacity
        className="py-4 px-6 my-2 w-4/5 rounded-lg bg-gray-200 items-center"
        onPress={() => handleOptionPress('Alterar Senha')}
      >
        <Text className="text-lg">Alterar Senha</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="py-4 px-6 my-2 w-4/5 rounded-lg bg-gray-200 items-center"
        onPress={() => handleOptionPress('Notificações')}
      >
        <Text className="text-lg">Notificações</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="py-4 px-6 my-2 w-4/5 rounded-lg bg-gray-200 items-center"
        onPress={() => handleOptionPress('Tema')}
      >
        <Text className="text-lg">Tema</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="py-4 px-6 my-2 w-4/5 rounded-lg bg-gray-200 items-center"
        onPress={() => handleOptionPress('Sobre')}
      >
        <Text className="text-lg">Sobre</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="py-4 px-6 my-2 w-4/5 rounded-lg bg-gray-200 items-center"
        onPress={() => handleOptionPress('Preferências')}
      >
        <Text className="text-lg">Preferências</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Settings;