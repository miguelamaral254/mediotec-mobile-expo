import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { DisciplineInterface } from '../../interfaces/disciplineInterface';
import { getAllDiscipline } from '../../services/disciplineService';
import { User } from '../../interfaces/userInterface';
import { useNavigation, NavigationProp } from '@react-navigation/native';

type RootStackParamList = {
  DisciplineDetail: { discipline: DisciplineInterface };
};

const StudentDisciplinesLookUp = ({ userData }: { userData: User | null }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [disciplines, setDisciplines] = useState<DisciplineInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDisciplines = async () => {
      if (userData?.cpf) {
        try {
          const response = await getAllDiscipline();
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
    navigation.navigate('DisciplineDetail', { discipline });
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000FF" />;
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
          className="mb-4 p-4 bg-white rounded-lg shadow"
        >
          <Text className="text-lg font-bold text-gray-800">{item.name}</Text>
          <Text className="text-gray-600">{item.description}</Text>
          <Text className="text-gray-600">Carga Horária: {item.workload} horas</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default StudentDisciplinesLookUp;
