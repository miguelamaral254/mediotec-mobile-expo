import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { ResponseGradeInterface } from "../../interfaces/responseGradeInterface";
import { getAssessmentsByStudentCpf } from "../../services/gradesService";
import { formatGrades } from "../../utils/gradesConceptUtils";
interface Professor {
  name: string;
  cpf: string;
}

interface StudentGradesProps {
  studentCpf: string;
  disciplineId: number;
  professor?: Professor; 
}
const StudentGrades: React.FC<StudentGradesProps> = ({
  studentCpf,
  disciplineId,
}) => {
  const [grades, setGrades] = useState<ResponseGradeInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await getAssessmentsByStudentCpf(
          studentCpf,
          disciplineId
        );
        setGrades(response || []);
      } catch {
        setError("Erro ao carregar as notas");
      } finally {
        setLoading(false);
      }
    };

    fetchGrades();
  }, [studentCpf, disciplineId]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#0000FF" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-red-500 font-bold">{error}</Text>
      </View>
    );
  }

  const { formattedGrades, situation } = formatGrades(grades);

  return (
    <View className="flex-1 bg-gray-100 mt-10 rounded-b-2xl p-4">
      <Text className="text-4xl font-bold text-white pt-2 rounded-t-3xl bg-blue-500 mx-24 text-center">
        Conceitos
      </Text>
      <View className="bg-white rounded-lg shadow-md rounded-b-2xl">
        <View className="flex flex-row bg-blue-500 border-b  rounded-t-2xl  border-b-gray-300">
          <Text className="flex-1 text-xl font-bold text-center py-3 text-white">
            Tipo de Avaliação
          </Text>
          <Text className="flex-1 text-xl font-bold text-center py-3 text-white">
            Conceito
          </Text>
        </View>
        {formattedGrades.map(({ label, value, score }) => (
          <View
            key={label}
            className="flex flex-row items-center border-b border-gray-300"
          >
            <Text className="flex-1 text-lg font-medium text-center py-3 text-gray-800">
              {label}
            </Text>
            <Text
              className={`flex-1 text-lg font-bold text-center py-3 ${
                score !== "--" && Number(score) >= 7
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {value}
            </Text>
          </View>
        ))}
        <View className="flex flex-row items-center bg-blue-200 rounded-b-2xl">
          <Text className="flex-1 text-lg font-medium text-center py-3 text-gray-800">
            Situação
          </Text>
          <Text
            className={`flex-1 text-lg font-bold text-center py-3 ${
              situation === "Aprovado" ? "text-green-500" : "text-red-500"
            }`}
          >
            {situation || "--"}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default StudentGrades;