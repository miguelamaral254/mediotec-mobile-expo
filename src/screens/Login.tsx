import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native'; // Importa Lottie
import logo from '../assets/logo_mediotec.png';
import { User } from '../interfaces/userInterface';
import { getUserData, login } from '../services/authService';

interface LoginProps {
  onLoginSuccess: (userData: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({ cpf: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (cpf: string, password: string) => {
    try {
      setError(null);
      const cleanedCPF = cpf.replace(/\D/g, '');
      const loginResponse = await login(cleanedCPF, password);

      if (loginResponse) {
        const userData: User = await getUserData(cleanedCPF);

        if (!userData) {
          setError('Usuário não encontrado.');
          setLoading(false);
          return;
        }

        if (!userData.active) {
          setError('Usuário inativo. Entre em contato com a instituição.');
          setLoading(false);
          return;
        }

        await AsyncStorage.setItem('cpf', cleanedCPF);
        await AsyncStorage.setItem('password', password);
        onLoginSuccess(userData);
      } else {
        setError('Usuário ou senha incorretos.');
        setLoading(false);
      }
    } catch (err: any) {
      setError(
        err?.response?.status === 404 || err?.response?.status === 401
          ? 'Usuário ou senha incorretos.'
          : 'Erro ao conectar ao servidor. Tente novamente.'
      );
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    if (!formData.cpf || !formData.password) {
      Alert.alert('Por favor, preencha todos os campos.');
      return;
    }
    setLoading(true); // Ativa o estado de carregamento
    handleLogin(formData.cpf, formData.password);
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LottieView
          source={require('../../assets/animations/paper-plane.json')}
          autoPlay
          loop
          style={styles.animation}
        />
      </View>
    );
  }

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
            style={{ borderColor: '#ccc', borderWidth: 1, padding: 10, borderRadius: 5 }}
            placeholder="Digite sua senha"
          />
        </View>

        {error && <Text style={{ color: 'red', marginBottom: 16 }}>{error}</Text>}

        <TouchableOpacity
          onPress={handleSubmit}
          style={{ backgroundColor: '#2196F3', padding: 15, borderRadius: 5, width: '100%', alignItems: 'center' }}
        >
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  animation: {
    width: 200,
    height: 200,
  },
});

export default Login;