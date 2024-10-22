import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import DrawerRoutes from "./src/routes/drawer.routes"; // Verifique se o caminho está correto
import Login from "./src/screens/Login";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      const savedCpf = await AsyncStorage.getItem('cpf');
      const savedPassword = await AsyncStorage.getItem('password');
      if (savedCpf && savedPassword) {
        setIsAuthenticated(true);
      }
    };
    checkLogin();
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
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
          <DrawerRoutes onLogout={handleLogout} />
        ) : (
          <Login onLoginSuccess={handleLoginSuccess} />
        )}
      </SafeAreaView>
    </NavigationContainer>
  );
}
