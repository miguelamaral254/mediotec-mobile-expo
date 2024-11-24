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
    <View className="flex-1 p-4">
      <Text className="text-4xl font-bold text-primary-color mb-4 mt-32">
        Detalhes da Disciplina e Conceitos
      </Text>
      <View className="p-6 bg-white rounded-lg shadow justify-center"> 
        <Text className="text-4xl font-bold mb-2 text-primary-color">
          {discipline.name}
        </Text>
        <Text className="text-2x1">
          {discipline.description}
        </Text>
        <Text className="text-2x1">
          Carga Horária: {discipline.workload} horas
        </Text>
        <StudentGrades studentCpf={studentCpf} disciplineId={discipline.id!} />
      </View>
    </View>
  );
};

export default DisciplineDetail;
