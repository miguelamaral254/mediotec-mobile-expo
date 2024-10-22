import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInputMask } from 'react-native-masked-text';
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import logo from '../assets/logo_mediotec.png';
import { User } from '../interfaces/userInterface';
import { getUserData, login } from '../services/authService';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootDrawerParamList } from '../types/navigationTypes';
import { CommonActions } from '@react-navigation/native';

interface LoginProps {
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({ cpf: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); 
  const navigation = useNavigation<StackNavigationProp<RootDrawerParamList>>();

  useEffect(() => {
    verifyAvailableAuthentication();
    checkPersistedLogin();
  }, []);

  async function verifyAvailableAuthentication() {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    if (!compatible) {
      Alert.alert('Dispositivo não compatível com biometria.');
    }
  }

  async function checkPersistedLogin() {
    const savedCpf = await AsyncStorage.getItem('cpf');
    const savedPassword = await AsyncStorage.getItem('password');

    if (savedCpf && savedPassword) {
      handleBiometricLogin(savedCpf, savedPassword);
    }
  }

  async function handleBiometricLogin(cpf: string, password: string) {
    const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isBiometricEnrolled) {
      Alert.alert('Nenhuma biometria cadastrada.');
      return;
    }

    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: 'Login com Biometria',
      fallbackLabel: 'Biometria não reconhecida',
    });

    if (auth.success) {
      handleLogin(cpf, password);
    } else {
      Alert.alert('Autenticação falhou.');
    }
  }

  const handleLogin = async (cpf: string, password: string) => {
    setLoading(true); 
    setError(null);
    try {
      const cleanedCPF = cpf.replace(/\D/g, ''); 
      const userData: User = await getUserData(cleanedCPF);
  
      if (!userData) {
        Alert.alert('Usuário não encontrado.');
        return;
      }
  
      if (!userData.active) {
        Alert.alert('Usuário inativo, entre em contato com a instituição.');
        return;
      }
  
      await login(cleanedCPF, password); 
      await AsyncStorage.setItem('cpf', cleanedCPF);
      await AsyncStorage.setItem('password', password);

      onLoginSuccess(); 
      
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'home' }], 
        })
      );
    } catch (err) {
      setError('CPF ou senha incorretos.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleSubmit = () => {
    if (!formData.cpf || !formData.password) {
      Alert.alert('Por favor, preencha todos os campos.');
      return;
    }

    handleLogin(formData.cpf, formData.password);
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <Image source={logo} style={{ width: 300, height: 200, resizeMode: 'contain' }} />
      <Text style={{ fontSize: 24, fontWeight: '600', marginBottom: 32 }}>Login</Text>

      <View style={{ width: '100%', marginBottom: 16 }}>
        <Text style={{ fontWeight: '500', marginBottom: 8 }}>CPF</Text>
        <TextInputMask
          type={'cpf'}
          value={formData.cpf}
          onChangeText={(masked) => handleInputChange('cpf', masked)}
          style={{ borderColor: '#ccc', borderWidth: 1, padding: 10, borderRadius: 5 }}
          placeholder="Digite seu CPF"
          keyboardType="numeric"
        />
      </View>

      <View style={{ width: '100%', marginBottom: 16 }}>
        <Text style={{ fontWeight: '500', marginBottom: 8 }}>Senha</Text>
        <TextInput
          secureTextEntry
          value={formData.password}
          onChangeText={(value) => handleInputChange('password', value)}
          style={{ borderColor: '#ccc', borderWidth: 1, padding: 10, borderRadius: 5, width: '100%' }}
          placeholder="Digite sua senha"
        />
      </View>

      {error && <Text style={{ color: 'red', marginBottom: 16 }}>{error}</Text>}
      {loading && <ActivityIndicator size="small" color="#0000ff" style={{ marginBottom: 16 }} />}

      <TouchableOpacity onPress={handleSubmit} style={{ width: '100%', backgroundColor: '#4666AF', padding: 16, borderRadius: 5 }}>
        <Text style={{ color: 'white', textAlign: 'center', fontWeight: '600' }}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
