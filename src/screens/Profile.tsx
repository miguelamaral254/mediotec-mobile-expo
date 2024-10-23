import { View, Text } from 'react-native';
import React from 'react';
import { User } from '../interfaces/userInterface';

interface ProfileProps {
  userData: User | null;
}

const Profile: React.FC<ProfileProps> = ({ userData }) => {
  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
      <Text style={{ fontSize: 26, fontWeight: "bold", textAlign: "center", marginBottom: 20 }}>Perfil</Text>
      {userData ? (
        <View style={{ backgroundColor: "#f9f9f9", padding: 20, borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 3 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Informações Pessoais</Text>

          <View style={{ marginBottom: 10 }}>
            <Text style={{ fontSize: 16, color: '#555' }}>CPF:</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{userData.cpf}</Text>
          </View>

          {userData.name && (
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 16, color: '#555' }}>Nome:</Text>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{userData.name}</Text>
            </View>
          )}

          {userData.email && (
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 16, color: '#555' }}>E-mail:</Text>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{userData.email}</Text>
            </View>
          )}

          {userData.role && (
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 16, color: '#555' }}>Função:</Text>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{userData.role}</Text>
            </View>
          )}

          {userData.birthDate && (
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 16, color: '#555' }}>Data de Nascimento:</Text>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{userData.birthDate}</Text>
            </View>
          )}

          {userData.phone && (
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 16, color: '#555' }}>Telefone:</Text>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{userData.phone}</Text>
            </View>
          )}

          {userData.registration && (
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 16, color: '#555' }}>Matrícula:</Text>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{userData.registration}</Text>
            </View>
          )}

          {userData.address && (
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 16, color: '#555' }}>Endereço:</Text>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{userData.address}</Text>
            </View>
          )}

          {userData.studentCPF && (
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 16, color: '#555' }}>CPF do Estudante:</Text>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{userData.studentCPF}</Text>
            </View>
          )}

          {userData.expertiseArea && (
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 16, color: '#555' }}>Área de Expertise:</Text>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{userData.expertiseArea}</Text>
            </View>
          )}

          {userData.academicTitle && (
            <View style={{ marginBottom: 10 }}>
              <Text style={{ fontSize: 16, color: '#555' }}>Título Acadêmico:</Text>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{userData.academicTitle}</Text>
            </View>
          )}
        </View>
      ) : (
        <Text>Nenhum dado de usuário disponível.</Text>
      )}
    </View>
  );
}

export default Profile;
