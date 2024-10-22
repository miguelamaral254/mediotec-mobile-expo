import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import DrawerRoutes from "./src/routes/drawer.routes";
import Login from "./src/screens/Login";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from './src/interfaces/userInterface';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    const checkLogin = async () => {
      const savedUserData = await AsyncStorage.getItem('userData'); // Try to get userData directly
      if (savedUserData) {
        const parsedUserData = JSON.parse(savedUserData);
        setUserData(parsedUserData);  // Restore userData
        setIsAuthenticated(true);     // Mark user as authenticated
      }
    };
    checkLogin();
  }, []);

  const handleLoginSuccess = (user: User) => {
    setIsAuthenticated(true);
    setUserData(user);
    AsyncStorage.setItem('userData', JSON.stringify(user));  // Persist userData
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userData');  // Clear userData from AsyncStorage
    setIsAuthenticated(false);
    setUserData(null);  // Reset userData
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
