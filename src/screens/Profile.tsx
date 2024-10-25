import { View, Text } from 'react-native';
import React from 'react';
import { User, UserRole } from '../interfaces/userInterface';
import { translateUserRole, formatPhone, formatCPF, formatBirthDate } from '../utils/userUtils';

interface ProfileProps {
  userData: User | null;
}

const Profile: React.FC<ProfileProps> = ({ userData }) => {
  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#fff" }}>
      <Text className="text-4xl font-extrabold text-center mb-5 text-indigo-700">
        Perfil do {userData?.role ? translateUserRole(userData.role) : 'Usuário'}
      </Text>
      {userData ? (
        <View className="bg-gray-100 p-5 rounded-lg shadow-lg">
          {userData.name && (
            <View className="mb-4">
              <Text className="text-lg font-semibold">Nome:</Text>
              <Text className="text-lg">{userData.name}</Text>
            </View>
          )}
          {userData.cpf && (
            <View className="mb-4">
              <Text className="text-lg font-semibold">CPF:</Text>
              <Text className="text-lg">{formatCPF(userData.cpf)}</Text>
            </View>
          )}
          {userData.email && (
            <View className="mb-4">
              <Text className="text-lg font-semibold">Email:</Text>
              <Text className="text-lg">{userData.email}</Text>
            </View>
          )}
          {userData.phone && (
            <View className="mb-4">
              <Text className="text-lg font-semibold">Telefone:</Text>
              <Text className="text-lg">{formatPhone(userData.phone)}</Text>
            </View>
          )}
          {userData.birthDate && (
            <View className="mb-4">
              <Text className="text-lg font-semibold">Data de Nascimento:</Text>
              <Text className="text-lg">{formatBirthDate(userData.birthDate)}</Text>
            </View>
          )}
          {userData.address && (
            <View className="mb-4">
              <Text className="text-lg font-semibold">Endereço:</Text>
              <Text className="text-lg">{userData.address}</Text>
            </View>
          )}
          {userData.registration && (
            <View className="mb-4">
              <Text className="text-lg font-semibold">Registro:</Text>
              <Text className="text-lg">{userData.registration}</Text>
            </View>
          )}
          {userData.role === UserRole.PROFESSOR && userData.expertiseArea && (
            <View className="mb-4">
              <Text className="text-lg font-semibold">Área de Especialização:</Text>
              <Text className="text-lg">{userData.expertiseArea}</Text>
            </View>
          )}
          {userData.academicTitle && (
            <View className="mb-4">
              <Text className="text-lg font-semibold">Título Acadêmico:</Text>
              <Text className="text-lg">{userData.academicTitle}</Text>
            </View>
          )}
          {userData.parentCPF && (
            <View className="mb-4">
              <Text className="text-lg font-semibold">CPF do Responsável:</Text>
              <Text className="text-lg">{formatCPF(userData.parentCPF)}</Text>
            </View>
          )}
          {userData.studentCPF && (
            <View className="mb-4">
              <Text className="text-lg font-semibold">CPF do Estudante:</Text>
              <Text className="text-lg">{formatCPF(userData.studentCPF)}</Text>
            </View>
          )}
        </View>
      ) : (
        <Text>Nenhum dado de usuário disponível.</Text>
      )}
    </View>
  );
};

export default Profile;
