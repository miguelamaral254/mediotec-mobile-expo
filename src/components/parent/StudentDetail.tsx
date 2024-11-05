import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Student } from '../../interfaces/studentInterface';
import { formatCPF, formatPhone, formatBirthDate } from '../../utils/userUtils';

interface StudentDetailsProps {
  route: {
    params: {
      student: Student;
    };
  };
  //n mexe nisso pq se n quebra !!!
  navigation: any;
}

const StudentDetails: React.FC<StudentDetailsProps> = ({ route, navigation }) => {
  const { student } = route.params;

  const handleViewGrades = () => {
    navigation.navigate('StudentGradesOverview', { student });
  };

  const handleViewSchedule = () => {
    navigation.navigate('Schedule', { student });
  };

  return (
    <View className="flex-1 p-4 bg-gray-100">
      <View className="p-6 bg-white rounded-lg shadow">
        <Text className="text-2xl font-bold mb-2">{student.name}</Text>
        <Text className="text-gray-600 text-lg mb-1">{student.name}</Text>
        <Text className="text-gray-600 text-lg mb-1">CPF: {formatCPF(student.cpf)}</Text>
        <Text className="text-gray-600 text-lg mb-1">Endereço: {student.address}</Text>
        <Text className="text-gray-600 text-lg mb-1">Data de Nascimento: {formatBirthDate(student.birthDate)}</Text>
        <Text className="text-gray-600 text-lg mb-1">Email: {student.email}</Text>
        <Text className="text-gray-600 text-lg mb-1">Telefone: {formatPhone(student.phone)}</Text>
      </View>
      <View className="flex-row justify-around mt-4">
        <TouchableOpacity onPress={handleViewGrades} className="bg-blue-500 p-3 rounded">
          <Text className="text-white text-lg">Ver conceitos</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleViewSchedule} className="bg-green-500 p-3 rounded">
          <Text className="text-white text-lg">Ver horários</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StudentDetails;