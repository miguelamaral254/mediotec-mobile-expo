import React, { useState, useEffect } from 'react';
import { SafeAreaView, Alert, ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import DrawerRoutes from "./src/routes/NavBar"; 
import Login from "./src/screens/Login";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';
import { User } from './src/interfaces/userInterface';
import { getUserData } from './src/services/authService';
import "./global.css";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    try {
      const savedCpf = await AsyncStorage.getItem('cpf');
      const savedPassword = await AsyncStorage.getItem('password');

      if (savedCpf && savedPassword) {
        const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync();
        if (isBiometricEnrolled) {
          await handleBiometricLogin(savedCpf, savedPassword);
        } else {
          Alert.alert("A biometria não está configurada, por favor insira a senha.");
        }
      }
    } catch (error) {
      console.error("Erro ao verificar o login:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBiometricLogin = async (cpf: string, password: string) => {
    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Autenticação Biométrica',
      fallbackLabel: 'Insira sua senha',
    });

    if (auth.success) {
      setIsAuthenticated(true);
      const userData: User = await getUserData(cpf);
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
    setUserData(null);
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

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