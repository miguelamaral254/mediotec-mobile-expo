import React from 'react';
import { View, Text } from 'react-native';
import { DisciplineInterface } from '../../interfaces/disciplineInterface';
import StudentGrades from './StudentGrades';

interface DisciplineDetailProps {
  route: {
    params: {
      discipline: DisciplineInterface;
      studentCpf: string;
    };
  };
}

const DisciplineDetail: React.FC<DisciplineDetailProps> = ({ route }) => {
  const { discipline, studentCpf } = route.params;

  return (
    <View className="flex-1 p-4 bg-gray-100">
      <View className="p-6 bg-white rounded-lg shadow"> 
        <Text className="text-2xl font-bold mb-2 text-primary-color">
          {discipline.name}
        </Text>
        <Text className="text-gray-600 text-lg mb-1">
          {discipline.description}
        </Text>
        <Text className="text-gray-600 text-lg mb-4">
          Carga Horária: {discipline.workload} horas
        </Text>

        <Text className="text-xl font-bold mt-4 mb-2 text-secondary-color">
          Conceitos:
        </Text>
        <StudentGrades studentCpf={studentCpf} disciplineId={discipline.id!} />
      </View>
    </View>
  );
};

export default DisciplineDetail;
