import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Student } from '../../interfaces/studentInterface';
import { SchoolClass } from '../../interfaces/schoolClassInterface';
import { formatCPF, formatPhone, formatBirthDate } from '../../utils/userUtils';
import { getSchoolClassByStudentCpf } from '../../services/userService';
import { translateEnum } from '../../utils/translateEnum';

interface StudentDetailsProps {
  route: {
    params: {
      student: Student;
    };
  };
  navigation: any;
}

const StudentDetails: React.FC<StudentDetailsProps> = ({ route, navigation }) => {
  const { student } = route.params;
  const [schoolClassInfo, setSchoolClassInfo] = useState<SchoolClass | null>(null);

  useEffect(() => {
    const fetchSchoolClass = async () => {
      try {
        const response: SchoolClass[] = await getSchoolClassByStudentCpf(student.cpf);

        if (response && response.length > 0) {
          const mostRecentClass = response.reduce((latest, current) => {
            return new Date(current.date) > new Date(latest.date) ? current : latest;
          });
          setSchoolClassInfo(mostRecentClass);
        }
      } catch (error) {
        console.error('Erro ao buscar informações da turma:', error);
      }
    };

    fetchSchoolClass();
  }, [student.cpf]);

  const handleViewGrades = () => {
    navigation.navigate('StudentGradesOverview', { student });
  };

  const handleViewSchedule = () => {
    navigation.navigate('Schedule', { student });
  };

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <View className="bg-blue-500 p-6 rounded-t-lg shadow-md">
        <Text className="text-3xl font-bold text-white">{student.name}</Text>
      </View>
      <View className="p-6 bg-white rounded-b-lg shadow-md">
        <View className="mb-4 bg-blue-200 p-4 rounded-lg justify-center items-center">
          {schoolClassInfo ? (
            <>
              <Text className="text-lg text-blue-500 font-bold">
                 {translateEnum(schoolClassInfo.technicalCourse, 'technicalCourse')}
              </Text>
              <Text className="text-lg text-blue-500 font-bold">
              {translateEnum(schoolClassInfo.year, 'year')} -  {translateEnum(schoolClassInfo.letter, 'letter')}
              </Text>
              <Text className="text-lg text-blue-500 font-bold">
                {translateEnum(schoolClassInfo.shift, 'shift')}
              </Text>
            
            </>
          ) : (
            <Text className="text-lg text-gray-500">Carregando informações da turma...</Text>
          )}
        </View>
        <Text className="text-lg text-gray-700 mb-2">Nome: {student.name}</Text>
        <Text className="text-lg text-gray-700 mb-2">CPF: {formatCPF(student.cpf)}</Text>
        <Text className="text-lg text-gray-700 mb-2">Endereço: {student.address}</Text>
        <Text className="text-lg text-gray-700 mb-2">Data de Nascimento: {formatBirthDate(student.birthDate)}</Text>
        <Text className="text-lg text-gray-700 mb-2">Email: {student.email}</Text>
        <Text className="text-lg text-gray-700 mb-2">Telefone: {formatPhone(student.phone)}</Text>
        <View className="flex-row justify-around mt-6">
          <TouchableOpacity onPress={handleViewGrades} className="bg-blue-500 p-4 rounded-lg shadow-md">
            <Text className="text-white text-lg font-semibold">Ver Conceitos</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleViewSchedule} className="bg-green-500 p-4 rounded-lg shadow-md">
            <Text className="text-white text-lg font-semibold">Ver Horários</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default StudentDetails;
