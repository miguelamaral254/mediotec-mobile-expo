import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { ResponseGradeInterface } from '../../interfaces/responseGradeInterface';
import { getAssessmentsByStudentCpf } from '../../services/gradesService';
import { calculateFinalAverageAndSituation, Concept, fromScore } from '../../utils/gradesConceptUtils';

interface StudentGradesProps {
  studentCpf: string;
  disciplineId: number;
}

const StudentGrades: React.FC<StudentGradesProps> = ({ studentCpf, disciplineId }) => {
  const [grades, setGrades] = useState<ResponseGradeInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await getAssessmentsByStudentCpf(studentCpf, disciplineId);
        setGrades(response);
      } catch (err) {
        setError('Erro ao carregar as notas');
      } finally {
        setLoading(false);
      }
    };

    fetchGrades();
  }, [studentCpf, disciplineId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000FF" />;
  }

  if (error) {
    return <Text className="text-red-500 text-center">{error}</Text>;
  }

  if (grades.length === 0) {
    return <Text className="text-center text-gray-500 text-lg">Nenhuma nota disponível.</Text>;
  }

  // Cálculo das médias e situação
  const { average, finalAverage, situation } = calculateFinalAverageAndSituation(grades);

  // Notas específicas
  const av1 = grades.find((grade) => grade.evaluationType === 'AV1')?.evaluation;
  const av2 = grades.find((grade) => grade.evaluationType === 'AV2')?.evaluation;
  const av3 = grades.find((grade) => grade.evaluationType === 'AV3')?.evaluation;
  const av4 = grades.find((grade) => grade.evaluationType === 'AV4')?.evaluation;
  const recovery = grades.find((grade) => grade.evaluationType === 'RECOVERY')?.evaluation;

  return (
    <View className="mt-4 p-4 bg-gray-100 rounded-lg">
      
      <View className="border border-gray-300 rounded-lg overflow-hidden">
        
        <View className="flex flex-row justify-between border-b border-gray-300 py-2 px-3">
          <Text className="flex-1 font-bold">Tipo de Avaliação</Text>
          <Text className="flex-1 font-bold text-center">Conceito</Text>
        </View>
        {[
          { label: 'AV1', value: av1 },
          { label: 'AV2', value: av2 },
          { label: 'AV3', value: av3 },
          { label: 'AV4', value: av4 },
          { label: 'Média', value: average },
          { label: 'Recuperação', value: recovery },
          { label: 'Média Final', value: finalAverage },
        ].map(({ label, value }) => (
          <View key={label} className="flex flex-row justify-between border-b border-gray-300 py-2 px-3">
            <Text className="flex-1">{label}</Text>
            <Text className="flex-1 text-center">{value !== undefined ? fromScore(Number(value)) : ''}</Text>
          </View>
        ))}
        <View className="flex flex-row justify-between py-2 px-3">
          <Text className="flex-1">Situação</Text>
          <Text className={`flex-1 text-center ${situation === 'Aprovado' ? 'text-green-500' : 'text-red-500'}`}>
            {situation !== null ? (situation === 'Aprovado' ? 'Aprovado' : 'Reprovado') : ''}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default StudentGrades;
