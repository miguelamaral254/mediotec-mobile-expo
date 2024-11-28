import React from 'react';
import { View, Text } from 'react-native';
import { User, UserRole } from '../interfaces/userInterface';
import { translateUserRole, formatPhone, formatCPF, formatBirthDate } from '../utils/userUtils';
import { SchoolClass } from '../interfaces/schoolClassInterface';
import { translateEnum } from '../utils/translateEnum';

interface ProfileProps {
  userData: User | null;
  schoolClass: SchoolClass[] | null;
}

const Profile: React.FC<ProfileProps> = ({ userData, schoolClass }) => {
  const currentYear = new Date().getFullYear();
  const currentYearClass = schoolClass
    ? schoolClass.find((sc) => new Date(sc.date).getFullYear() === currentYear)
    : null;

  return (
    <View className="flex-1 bg-gray-200 ">
      <Text className="text-4xl font-bold bg-blue-500 text-white p-6 text-center ">
        Perfil do {userData?.role ? translateUserRole(userData.role) : 'Usuário'}
      </Text>
      {userData ? (
        <View className="bg-white rounded-lg shadow-md  p-6">
          <View className="flex items-center mb-6">
            <View className="w-36 h-36 rounded-full bg-blue-100 items-center justify-center mb-4">
              <Text className="text-5xl font-bold text-blue-500">
                {userData.name.charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text className="text-3xl font-bold text-gray-800">{userData.name}</Text>
          </View>
          {userData.role === 'STUDENT' && currentYearClass ? (
            <View className="mb-6 bg-blue-200 px-10 py-5 rounded-3xl" >
              <Text className="text-xl font-semibold text-blue-500 text-center ">
                Turma: {currentYearClass.code} - {translateEnum(currentYearClass.letter, 'letter')} ({translateEnum(currentYearClass.shift, 'shift')})
              </Text>
              <Text className="text-lg text-gray-700 text-center">
                {translateEnum(currentYearClass.technicalCourse, 'technicalCourse')} - {translateEnum(currentYearClass.year, 'year')}
              </Text>
            </View>
          ) : (
            <Text className="text-lg text-gray-500 text-center mb-6">Nenhuma turma do ano atual encontrada</Text>
          )}
          <View>
            <View className="mb-4">
              <Text className="text-2xl font-semibold text-gray-800">Email:</Text>
              <Text className="text-lg text-gray-700">{userData.email}</Text>
            </View>
            {userData.cpf && (
              <View className="mb-4">
                <Text className="text-2xl font-semibold text-gray-800">CPF:</Text>
                <Text className="text-lg text-gray-700">{formatCPF(userData.cpf)}</Text>
              </View>
            )}
            {userData.phone && (
              <View className="mb-4">
                <Text className="text-2xl font-semibold text-gray-800">Telefone:</Text>
                <Text className="text-lg text-gray-700">{formatPhone(userData.phone)}</Text>
              </View>
            )}
            {userData.birthDate && (
              <View className="mb-4">
                <Text className="text-2xl font-semibold text-gray-800">Data de Nascimento:</Text>
                <Text className="text-lg text-gray-700">{formatBirthDate(userData.birthDate)}</Text>
              </View>
            )}
            {userData.address && (
              <View className="mb-4">
                <Text className="text-2xl font-semibold text-gray-800">Endereço:</Text>
                <Text className="text-lg text-gray-700">{userData.address}</Text>
              </View>
            )}
            {userData.registration && (
              <View className="mb-4">
                <Text className="text-2xl font-semibold text-gray-800">Registro:</Text>
                <Text className="text-lg text-gray-700">{userData.registration}</Text>
              </View>
            )}
            {userData.role === UserRole.PROFESSOR && userData.expertiseArea && (
              <View className="mb-4">
                <Text className="text-2xl font-semibold text-gray-800">Área de Especialização:</Text>
                <Text className="text-lg text-gray-700">{userData.expertiseArea}</Text>
              </View>
            )}
            {userData.academicTitle && (
              <View className="mb-4">
                <Text className="text-2xl font-semibold text-gray-800">Título Acadêmico:</Text>
                <Text className="text-lg text-gray-700">{userData.academicTitle}</Text>
              </View>
            )}
          </View>
        </View>
      ) : (
        <Text className="text-center text-xl text-gray-500 p-6">Nenhum dado de usuário disponível.</Text>
      )}
    </View>
  );
};

export default Profile;