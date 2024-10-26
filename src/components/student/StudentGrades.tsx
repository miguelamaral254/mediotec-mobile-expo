import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { ResponseGradeInterface } from '../../interfaces/responseGradeInterface';
import { getAssessmentsByStudentCpf } from '../../services/gradesService';


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

  return (
    <View className="mt-4 p-4 bg-gray-100 rounded-lg">
      {grades.map((grade) => (
        <View key={grade.id} className="mb-3 p-3 bg-white rounded-lg">
          <Text className="font-bold text-lg">{grade.evaluationType}</Text>
          <Text>Nota: {grade.evaluation}</Text>
          <Text>Data: {new Date(grade.evaluationDate).toLocaleDateString()}</Text>
        </View>
      ))}
    </View>
  );
};

export default StudentGrades;
