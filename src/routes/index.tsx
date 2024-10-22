import React, { useState, useEffect } from 'react';
import DrawerRoutes from "./drawer.routes";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from '../screens/Login';

export default function Routes() {
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

    return isAuthenticated ? (
        <DrawerRoutes />
    ) : (
        <Login onLoginSuccess={() => setIsAuthenticated(true)} />
    );
}
