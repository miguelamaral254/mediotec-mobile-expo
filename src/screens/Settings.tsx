// components/users/Settings.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const Settings = () => {
  const handleOptionPress = (option: string) => {
    Alert.alert(`Você selecionou: ${option}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configurações</Text>
      <TouchableOpacity style={styles.option} onPress={() => handleOptionPress('Alterar Senha')}>
        <Text style={styles.optionText}>Alterar Senha</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => handleOptionPress('Notificações')}>
        <Text style={styles.optionText}>Notificações</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => handleOptionPress('Tema')}>
        <Text style={styles.optionText}>Tema</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => handleOptionPress('Sobre')}>
        <Text style={styles.optionText}>Sobre</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={() => handleOptionPress('Preferências')}>
        <Text style={styles.optionText}>Preferências</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  option: {
    padding: 15,
    marginVertical: 10,
    width: '80%',
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 18,
  },
});

export default Settings;
