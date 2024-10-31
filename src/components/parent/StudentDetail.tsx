import React from 'react';
import { View, Text } from 'react-native';
import { Student } from '../../interfaces/studentInterface';

interface StudentDetailsProps {
  route: {
    params: {
      student: Student;
    };
  };
}

const StudentDetails: React.FC<StudentDetailsProps> = ({ route }) => {
  const { student } = route.params;

  return (
    <View className="flex-1 p-4 bg-gray-100">
      <View className="p-6 bg-white rounded-lg shadow">
        <Text className="text-2xl font-bold mb-2">{student.name}</Text>
        <Text className="text-gray-600 text-lg mb-1">CPF: {student.cpf}</Text>
        <Text className="text-gray-600 text-lg mb-1">Endereço: {student.address}</Text>
        <Text className="text-gray-600 text-lg mb-1">Data de Nascimento: {student.birthDate}</Text>
        <Text className="text-gray-600 text-lg mb-1">Email: {student.email}</Text>
        <Text className="text-gray-600 text-lg mb-1">Telefone: {student.phone}</Text>
      </View>
    </View>
  );
};

export default StudentDetails;