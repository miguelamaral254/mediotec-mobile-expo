import React, { useEffect, useState } from 'react';
import { Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Student } from '../../interfaces/studentInterface';
import { getDisciplinesByStudentCpf } from '../../services/disciplineService';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { DisciplineInterface } from '../../interfaces/disciplineInterface';

type RootStackParamList = {
  RelatedDisciplineDetail: { studentCpf: string; disciplineId: number };
};

interface StudentGradesOverviewProps {
  student: Student;
}

const StudentGradesOverview: React.FC<StudentGradesOverviewProps> = ({ student }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [disciplines, setDisciplines] = useState<DisciplineInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDisciplines = async () => {
      if (student?.cpf) {
        try {
          const response = await getDisciplinesByStudentCpf(student.cpf);
          setDisciplines(response);
        } catch (err) {
          setError('Erro ao carregar as disciplinas');
        } finally {
          setLoading(false);
        }
      } else {
        setError('CPF não disponível');
        setLoading(false);
      }
    };

    fetchDisciplines();
  }, [student]);

  const handleDisciplinePress = (discipline: DisciplineInterface) => {
    navigation.navigate('RelatedDisciplineDetail', { studentCpf: student.cpf, disciplineId: discipline.id! });
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#06B6D4" />;
  }

  if (error) {
    return <Text className="text-red-500 text-center">{error}</Text>;
  }

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      {disciplines.map((item) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => handleDisciplinePress(item)}
          className="mb-4 p-4 bg-white rounded-lg shadow-md border border-gray-300"
        >
          <Text className="text-2xl font-bold text-primary-color text-center">{item.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default StudentGradesOverview;