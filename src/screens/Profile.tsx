import { View, Text } from 'react-native';
import React from 'react';
import { User, UserRole } from '../interfaces/userInterface';
import { translateUserRole, formatPhone, formatCPF, formatBirthDate } from '../utils/userUtils';
import { SchoolClass } from '../interfaces/schoolClassInterface';
import { translateEnum } from '../utils/translateEnum';

interface ProfileProps {
  userData: User | null;
  schoolClass: SchoolClass | null;
}

const Profile: React.FC<ProfileProps> = ({ userData, schoolClass }) => {
  return (
    <View className="flex-1 p-5 bg-white">
      <Text className="text-4xl font-extrabold text-center mb-5 text-indigo-700">
        Perfil do {userData?.role ? translateUserRole(userData.role) : 'Usuário'}
      </Text>
      {userData ? (
        <View className="bg-gray-100 p-5 rounded-lg shadow-lg">
          <View className="mb-6 items-center">
            <View className="w-36 h-36 rounded-full bg-white items-center justify-center shadow-lg mb-4">
              <Text className="text-6xl font-bold">RN</Text>
            </View>
            <Text className="text-2xl font-semibold">{userData.name}</Text>
          </View>

          {/* Verificando se a função de escola (schoolClass) está presente */}
          {userData.role === "STUDENT" && schoolClass ? (
            <View className="mt-6 bg-gray-100 p-5 rounded-lg">
              <Text className="text-xl font-semibold text-primary-color text-center">
                {`Turma: ${schoolClass.code} - ${translateEnum(schoolClass.letter, 'letter')} (${translateEnum(schoolClass.shift, 'shift')})`}
              </Text>
              <Text className="text-lg text-center">{`${translateEnum(schoolClass.technicalCourse, 'technicalCourse')} - ${translateEnum(schoolClass.year, 'year')}`}</Text>
            </View>
          ) : null}

          <View className="mb-4">
            <Text className="text-lg font-semibold">Email:</Text>
            <Text className="text-lg">{userData.email}</Text>
          </View>

          {userData.cpf && (
            <View className="mb-4">
              <Text className="text-lg font-semibold">CPF:</Text>
              <Text className="text-lg">{formatCPF(userData.cpf)}</Text>
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

          {/* Área de especialização para professores */}
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
        </View>
      ) : (
        <Text className="text-center text-xl text-gray-500">Nenhum dado de usuário disponível.</Text>
      )}
    </View>
  );
};

export default Profile;