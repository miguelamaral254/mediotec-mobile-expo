import React, { useState, useEffect } from 'react';
import { SafeAreaView, Alert } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import DrawerRoutes from "./src/routes/NavBar"; 
import Login from "./src/screens/Login";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';
import { User } from './src/interfaces/userInterface';
import { getUserData } from './src/services/authService';
import "./global.css"
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    const savedCpf = await AsyncStorage.getItem('cpf');
    const savedPassword = await AsyncStorage.getItem('password');

    if (savedCpf && savedPassword) {
      // Se houver CPF e senha salvos, tente autenticar usando biometria
      const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (isBiometricEnrolled) {
        handleBiometricLogin(savedCpf, savedPassword);
      } else {
        // Se não houver biometria cadastrada, mostrar a tela de login para revalidar senha
        Alert.alert("A biometria não está configurada, por favor insira a senha.");
      }
    }
  };

  const handleBiometricLogin = async (cpf: string, password: string) => {
    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Autenticação Biométrica',
      fallbackLabel: 'Insira sua senha',
    });

    if (auth.success) {
      // Se a autenticação biométrica foi bem-sucedida, atualize o estado da autenticação
      setIsAuthenticated(true);
      // Busque os dados do usuário aqui (se necessário) e armazene no estado
      const userData: User = await getUserData(cpf); // Implemente a lógica para obter os dados do usuário
      setUserData(userData);
    } else {
      Alert.alert('Autenticação biométrica falhou. Insira sua senha para continuar.');
      setIsAuthenticated(false);
    }
  };

  const handleLoginSuccess = (userData: User) => {
    setIsAuthenticated(true);
    setUserData(userData);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('cpf');
    await AsyncStorage.removeItem('password');
    setIsAuthenticated(false);
  };

  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        {isAuthenticated ? (
          <DrawerRoutes onLogout={handleLogout} userData={userData} />
        ) : (
          <Login onLoginSuccess={handleLoginSuccess} />
        )}
      </SafeAreaView>
    </NavigationContainer>
  );
}
