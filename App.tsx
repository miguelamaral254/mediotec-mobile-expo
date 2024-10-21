import { useEffect, useState } from 'react';
import Routes from './src/routes';
import 'react-native-gesture-handler'
import * as LocalAuthentication from 'expo-local-authentication';
import { Text, View, SafeAreaView, Button, Alert } from 'react-native';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  async function verifyAvailableAuthentication() {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    console.log(compatible);
    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    console.log(types.map(type => LocalAuthentication.AuthenticationType[type]))
  }
  async function handleAuthentication() {
    const isBiometricEnrolled = await LocalAuthentication.isEnrolledAsync();
    console.log(isBiometricEnrolled)
    if(!isBiometricEnrolled){
      return Alert.alert("Login", "Nenhuma biometria cadastrada")
    }
    const auth = await LocalAuthentication.authenticateAsync({
      promptMessage: "Login com Biometria",
      fallbackLabel:"Biometria não reconhecida"
    });
    console.log();
  }

  useEffect(() => {
    verifyAvailableAuthentication();
  },[]);
  
  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffff'}}>
      <Text style={{color:"#000000", fontSize: 20}}>
        User conectado: {isAuthenticated ? "yes" : "no"}
      </Text>

      <Button title='Entrar'
      onPress={handleAuthentication} 
      />
    </SafeAreaView>
  );
}
