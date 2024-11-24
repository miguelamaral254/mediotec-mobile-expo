import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, Alert, ActivityIndicator, Keyboard, TouchableWithoutFeedback } from 'react-native';
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
  onLoginSuccess: (userData: User) => void; 
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({ cpf: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false); 
  const navigation = useNavigation<StackNavigationProp<RootDrawerParamList>>();

  useEffect(() => {
    verifyAvailableAuthentication();
  }, []);

  async function verifyAvailableAuthentication() {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    if (!compatible) {
      Alert.alert('Dispositivo não compatível com biometria.');
    }
  }

  const handleLogin = async (cpf: string, password: string) => {
    setLoading(true);
    setError(null);
  
    try {
      const cleanedCPF = cpf.replace(/\D/g, '');
      const userData: User = await getUserData(cleanedCPF);
  
      if (!userData) {
        setError('Usuário não encontrado.');
        return;
      }
  
      if (!userData.active) {
        setError('Usuário inativo, entre em contato com a instituição.');
        return;
      }
  
      const loginResponse = await login(cleanedCPF, password);
      
      if (loginResponse) {
        await AsyncStorage.setItem('cpf', cleanedCPF);
        await AsyncStorage.setItem('password', password);
        onLoginSuccess(userData);
  
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'home' }],
          })
        );
      } else {
        setError('Usuário não encontrado ou senha incorreta.');
      }
    } catch (err: any) {
      if (err?.response?.status === 404) {
        setError('Usuário não encontrado ou senha incorreta.');
      } else if (err?.response?.status === 401) {
        setError('Usuário não encontrado ou senha incorreta.');
      } else if (err?.response) {
        setError('Erro ao conectar com o servidor. Tente novamente.');
      } else {
        setError('Erro desconhecido. Tente novamente.');
      }
    } finally {
      setLoading(false);
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <Image source={logo} style={{ width: 250, height: 166, resizeMode: 'contain' }} />

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
        {loading && <ActivityIndicator size="large" color="#0000ff" />}

        <TouchableOpacity
          onPress={handleSubmit}
          style={{ backgroundColor: '#4666AF', padding: 15, borderRadius: 5, width: '100%', alignItems: 'center' }}
        >
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Login;