import React, { useEffect, useState } from 'react';
import { Text, ScrollView, ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { DisciplineInterface } from '../../interfaces/disciplineInterface';
import { getDisciplinesByStudentCpf } from '../../services/disciplineService';
import { User } from '../../interfaces/userInterface';
import { SchoolClass } from '../../interfaces/schoolClassInterface';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { translateEnum } from '../../utils/translateEnum';

type RootStackParamList = {
  DisciplineDetail: { discipline: DisciplineInterface; studentCpf: string };
  SchoolClassDetail: { schoolClass: SchoolClass };
};

interface StudentDisciplinesLookUpProps {
  userData: User | null;
  schoolClass: SchoolClass | null;  
}

const StudentDisciplinesLookUp: React.FC<StudentDisciplinesLookUpProps> = ({ userData, schoolClass }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [disciplines, setDisciplines] = useState<DisciplineInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (userData?.cpf) {
        try {
          const disciplineResponse = await getDisciplinesByStudentCpf(userData.cpf);
          setDisciplines(disciplineResponse);
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

    fetchData();
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
      <View className="mb-4 p-8 bg-white rounded-lg shadow-md border border-gray-300">
        <Text className="text-xl font-semibold text-primary-color text-center">
          {schoolClass ? `Turma: ${schoolClass.code} - ${translateEnum(schoolClass.letter, 'letter')} (${translateEnum(schoolClass.shift, 'shift')})` : 'Nenhuma turma disponível'}
        </Text>
        {schoolClass && (
          <Text className="text-sm p-4 text-gray-500 text-center">{`${translateEnum(schoolClass.technicalCourse, 'technicalCourse')} - ${translateEnum(schoolClass.year, 'year')}`}</Text>
        )}

        {disciplines.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => handleDisciplinePress(item)}
            className="mb-4 p-4 bg-white rounded-lg shadow-md border border-gray-300"
          >
            <Text className="text-2xl font-bold text-primary-color text-center">{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default StudentDisciplinesLookUp;