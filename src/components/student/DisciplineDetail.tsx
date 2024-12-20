import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { DisciplineInterface } from "../../interfaces/disciplineInterface";
import StudentGrades from "./StudentGrades";
import { Feather } from "@expo/vector-icons";

interface DisciplineDetailProps {
  route: {
    params: {
      discipline: DisciplineInterface;
      studentCpf: string;
      professor: { name: string; cpf: string }; 
    };
  };
}

const DisciplineDetail: React.FC<DisciplineDetailProps> = ({ route }) => {
  const { discipline, studentCpf, professor } = route.params; 

  return (
    <View className="flex-1 bg-gray-100">
      <Text className="text-3xl font-bold bg-blue-500 p-4 px-10 text-white text-center">
        {discipline.name}
      </Text>
      <View className="p-4 rounded-t-2xl  mt-[-10] bg-white rounded-lg shadow-md">
      <Text className="text-lg text-gray-600 mb-2">
          <Text className="font-bold">Professor: </Text>
          {professor.name} 
        </Text>
        <Text className="text-lg text-gray-600 mb-2">
          <Text className="font-bold">Descrição: </Text>
          {discipline.description}
        </Text>
        <Text className="text-lg text-gray-600">
          <Text className="font-bold">Carga Horária: </Text>
          {discipline.workload} horas
        </Text>
        
      </View>
      <StudentGrades studentCpf={studentCpf} disciplineId={discipline.id!} />
      <TouchableOpacity
        onPress={() => console.log("Botão de imprimir clicado")}
        className="flex-row items-center justify-center bg-blue-500 p-4 mx-24 rounded-full mb-10"
      >
        <Feather name="printer" size={24} color="#FFFFFF" />
        <Text className="text-3xl font-bold text-white text-center ml-2">
          Imprimir
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DisciplineDetail;