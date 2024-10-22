import React, { useState, useEffect } from 'react';
import DrawerRoutes from "./drawer.routes";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from '../screens/Login';
import { View } from 'react-native';
import { User } from '../interfaces/userInterface'; // Import the User interface

const Routes: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<User | null>(null); // Use the imported User interface

  useEffect(() => {
    const checkLogin = async () => {
      const savedUserData = await AsyncStorage.getItem('userData');
      if (savedUserData) {
        setUserData(JSON.parse(savedUserData));
        setIsAuthenticated(true);
      }
    };
    checkLogin();
  }, []);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userData');
    setIsAuthenticated(false); 
    setUserData(null);
  };

  return (
    <View style={{ flex: 1 }}>
      {isAuthenticated ? (
        <DrawerRoutes onLogout={handleLogout} userData={userData} />
      ) : (
        <Login onLoginSuccess={(user: User) => {
          AsyncStorage.setItem('userData', JSON.stringify(user));
          setUserData(user);
          setIsAuthenticated(true);
        }} />
      )}
    </View>
  );
}

export default Routes;
