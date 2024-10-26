import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { DisciplineInterface } from '../../interfaces/disciplineInterface';
import { getDisciplinesByStudentCpf } from '../../services/disciplineService';
import { User } from '../../interfaces/userInterface';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  DisciplineDetail: { discipline: DisciplineInterface; studentCpf: string };
};

interface StudentDisciplinesLookUpProps {
  userData: User | null;
}

const StudentDisciplinesLookUp: React.FC<StudentDisciplinesLookUpProps> = ({ userData }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [disciplines, setDisciplines] = useState<DisciplineInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDisciplines = async () => {
      if (userData?.cpf) {
        try {
          const response = await getDisciplinesByStudentCpf(userData.cpf);
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
  }, [userData]);

  const handleDisciplinePress = (discipline: DisciplineInterface) => {
    navigation.navigate('DisciplineDetail', { discipline, studentCpf: userData!.cpf });
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#06B6D4" />;
  }

  if (error) {
    return <Text className="text-fifth-color text-center">{error}</Text>;
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

export default StudentDisciplinesLookUp;
