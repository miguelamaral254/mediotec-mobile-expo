import React from "react";
import { View, Text } from "react-native";
import { DisciplineInterface } from "../../interfaces/disciplineInterface";
import StudentGrades from "./StudentGrades";

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
    <View className="flex-1 bg-gray-100">
      <Text className="text-3xl font-bold bg-blue-500 p-4 text-white text-center">
        {discipline.name}
      </Text>
      <View className="p-4 bg-white rounded-lg shadow-md m-4">
        <Text className="text-lg text-gray-600 mb-2"><Text className="font-bold">Descrição:</Text>{discipline.description}</Text>
        <Text className="text-lg text-gray-600">
          <Text className="font-bold">Carga Horária:</Text> {discipline.workload} horas
        </Text>
      </View>
      <StudentGrades studentCpf={studentCpf} disciplineId={discipline.id!} />
    </View>
  );
};

export default DisciplineDetail;