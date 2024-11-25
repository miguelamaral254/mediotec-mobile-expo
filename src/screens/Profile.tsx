import { View, Text } from 'react-native';
import React from 'react';
import { User, UserRole } from '../interfaces/userInterface';
import { translateUserRole, formatPhone, formatCPF, formatBirthDate } from '../utils/userUtils';
import { SchoolClass } from '../interfaces/schoolClassInterface';
import { translateEnum } from '../utils/translateEnum';
import { ScrollView } from 'react-native-gesture-handler';
import { Feather } from "@expo/vector-icons";

interface ProfileProps {
  userData: User | null;
  schoolClass: SchoolClass[] | null; // Ajustado para aceitar múltiplas turmas
}

const Profile: React.FC<ProfileProps> = ({ userData, schoolClass }) => {
  const currentYear = new Date().getFullYear();

  // Filtrar turmas do ano atual
  const currentYearClass = schoolClass
    ? schoolClass.find((sc) => new Date(sc.date).getFullYear() === currentYear)
    : null;

  return (
    <View className="flex-1 p-5 bg-white">
      <Text className="text-4xl font-bold text-primary-color mb-4 mt-32">
        Perfil do {userData?.role ? translateUserRole(userData.role) : 'Usuário'}
      </Text>
      {userData ? (
        <ScrollView className="bg-gray-100 p-5 rounded-lg shadow-lg" showsVerticalScrollIndicator={false}>
          <View className="mb-1 items-center">
            <View className="w-36 h-36 rounded-full bg-white items-center justify-center shadow-lg mb-4">
            <Text className='text-bold text-4xl'>A</Text>
            </View>
            <Text className="text-3xl font-bold">{userData.name}</Text>
          </View>

          {/* Exibindo a turma do ano atual */}
          {userData.role === "STUDENT" && currentYearClass ? (
            <View className="mb-8 bg-gray-100 p-5 rounded-lg">
              <Text className="text-xl font-semibold text-primary-color text-center">
                {`Turma: ${currentYearClass.code} - ${translateEnum(currentYearClass.letter, 'letter')} (${translateEnum(currentYearClass.shift, 'shift')})`}
              </Text>
              <Text className="text-lg text-center">{`${translateEnum(currentYearClass.technicalCourse, 'technicalCourse')} - ${translateEnum(currentYearClass.year, 'year')}`}</Text>
            </View>
          ) : (
            <Text className="mb-8 text-center text-gray-500">Nenhuma turma do ano atual encontrada</Text>
          )}
          <View className='bg-gray-300 rounded-lg p-5'>
          <View className="mb-4">
            <Text className="text-2xl font-semibold">Email:</Text>
            <Text className="text-xl">{userData.email}</Text>
          </View>

          {userData.cpf && (
            <View className="mb-4">
              <Text className="text-2xl font-semibold">CPF:</Text>
              <Text className="text-xl">{formatCPF(userData.cpf)}</Text>
            </View>
          )}

          {userData.phone && (
            <View className="mb-4">
              <Text className="text-2xl font-semibold">Telefone:</Text>
              <Text className="text-xl">{formatPhone(userData.phone)}</Text>
            </View>
          )}

          {userData.birthDate && (
            <View className="mb-4">
              <Text className="text-2xl font-semibold">Data de Nascimento:</Text>
              <Text className="text-xl">{formatBirthDate(userData.birthDate)}</Text>
            </View>
          )}

          {userData.address && (
            <View className="mb-4">
              <Text className="text-2xl font-semibold">Endereço:</Text>
              <Text className="text-xl">{userData.address}</Text>
            </View>
          )}

          {userData.registration && (
            <View className="mb-4">
              <Text className="text-2xl font-semibold">Registro:</Text>
              <Text className="text-lg">{userData.registration}</Text>
            </View>
          )}
          
          {/* Área de especialização para professores */}
          {userData.role === UserRole.PROFESSOR && userData.expertiseArea && (
            <View className="mb-4">
              <Text className="text-2xl font-semibold">Área de Especialização:</Text>
              <Text className="text-lg">{userData.expertiseArea}</Text>
            </View>
          )}
          
          {userData.academicTitle && (
            <View className="mb-4">
              <Text className="text-2xl font-semibold">Título Acadêmico:</Text>
              <Text className="text-lg">{userData.academicTitle}</Text>
            </View>
          )}
        </View>
        </ScrollView>
      ) : (
        <Text className="text-center text-xl text-gray-500">Nenhum dado de usuário disponível.</Text>
      )}
      
    </View>
  );
};

export default Profile;