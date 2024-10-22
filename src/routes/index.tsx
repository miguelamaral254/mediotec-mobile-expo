import React, { useState, useEffect } from 'react';
import DrawerRoutes from "./drawer.routes";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from '../screens/Login';
import { View } from 'react-native';

const Routes: React.FC = () => {
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

  const handleLogout = async () => {
    await AsyncStorage.removeItem('cpf');
    await AsyncStorage.removeItem('password');
    setIsAuthenticated(false); 
  };

  return (
    <View style={{ flex: 1 }}>
      {isAuthenticated ? (
        <DrawerRoutes onLogout={handleLogout} />
      ) : (
        <Login onLoginSuccess={() => setIsAuthenticated(true)} />
      )}
    </View>
  );
}

export default Routes;
