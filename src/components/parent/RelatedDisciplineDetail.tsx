import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { ResponseGradeInterface } from "../../interfaces/responseGradeInterface";
import { getAssessmentsByStudentCpf } from "../../services/gradesService";
import {
  calculateFinalAverageAndSituation,
  fromScore,
} from "../../utils/gradesConceptUtils";

interface StudentGradesProps {
  studentCpf: string;
  disciplineId: number;
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

  

  const { average, finalAverage, situation } =
    calculateFinalAverageAndSituation(grades || []);

  const av1 =
    grades.find((grade) => grade.evaluationType === "AV1")?.evaluation || "--";
  const av2 =
    grades.find((grade) => grade.evaluationType === "AV2")?.evaluation || "--";
  const av3 =
    grades.find((grade) => grade.evaluationType === "AV3")?.evaluation || "--";
  const av4 =
    grades.find((grade) => grade.evaluationType === "AV4")?.evaluation || "--";
  const recovery =
    grades.find((grade) => grade.evaluationType === "RECOVERY")?.evaluation ||
    "--";

  const formattedGrades = [
    { label: "AV1", value: av1 !== "--" ? fromScore(Number(av1)) : "--" },
    { label: "AV2", value: av2 !== "--" ? fromScore(Number(av2)) : "--" },
    { label: "AV3", value: av3 !== "--" ? fromScore(Number(av3)) : "--" },
    { label: "AV4", value: av4 !== "--" ? fromScore(Number(av4)) : "--" },
    {
      label: "Média",
      value: average !== null ? fromScore(Number(average)) : "--",
    },
    {
      label: "Recuperação",
      value: recovery !== "--" ? fromScore(Number(recovery)) : "--",
    },
    {
      label: "Média Final",
      value: finalAverage !== null ? fromScore(Number(finalAverage)) : "--",
    },
  ];

  return (
    <View className="flex-1 bg-gray-100 p-4">
      
      <Text className="text-4xl font-bold text-blue-500 text-center mb-6">
        Conceitos
      </Text>
      <View className="bg-white rounded-lg shadow-md border border-gray-300">
        <View className="flex flex-row bg-blue-400 border-b border-gray-300">
          <Text className="flex-1 text-xl font-bold text-center py-3 text-gray-700">
            Tipo de Avaliação
          </Text>
          <Text className="flex-1 text-xl font-bold text-center py-3 text-gray-700">
            Conceito
          </Text>
        </View>
        {formattedGrades.map(({ label, value }) => (
          <View
            key={label}
            className="flex flex-row items-center border-b border-gray-300"
          >
            <Text className="flex-1 text-lg font-medium text-center py-3 text-gray-800">
              {label}
            </Text>
            <Text
              className={`flex-1 text-lg font-bold text-center py-3 ${
                value !== "--" && Number(value) >= 7
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {value}
            </Text>
          </View>
        ))}
        <View className="flex flex-row items-center bg-blue-200">
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