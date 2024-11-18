import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { DisciplineInterface } from '../../interfaces/disciplineInterface';
import { getDisciplinesByStudentCpf } from '../../services/disciplineService';
import { SchoolClass } from '../../interfaces/schoolClassInterface';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { translateEnum } from '../../utils/translateEnum';

type RootStackParamList = {
  DisciplineDetail: { discipline: DisciplineInterface; studentCpf: string };
};

interface PreviousSchoolClassesProps {
  previousYearClasses: SchoolClass[];
  studentCpf: string;
}

const PreviousSchoolClasses: React.FC<PreviousSchoolClassesProps> = ({ previousYearClasses, studentCpf }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [disciplines, setDisciplines] = useState<DisciplineInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const disciplineResponse = await getDisciplinesByStudentCpf(studentCpf);
        setDisciplines(disciplineResponse);
      } catch (err) {
        setError('Erro ao carregar as disciplinas');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [studentCpf]);

  const handleDisciplinePress = (discipline: DisciplineInterface) => {
    navigation.navigate('DisciplineDetail', { discipline, studentCpf });
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#06B6D4" />;
  }

  if (error) {
    return <Text className="text-fifth-color text-center">{error}</Text>;
  }

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      <Text className="text-2xl font-bold text-primary-color text-center mb-4">
        Turmas Anteriores
      </Text>
      {previousYearClasses.map((schoolClass) => (
        <View key={schoolClass.id} className="mb-4 p-4 bg-white rounded-lg shadow-md border border-gray-300">
          <Text className="text-xl font-semibold text-primary-color text-center">
            {`Turma: ${schoolClass.code} - ${translateEnum(schoolClass.letter, 'letter')} (${translateEnum(schoolClass.shift, 'shift')})`}
          </Text>
          <Text className="text-sm p-4 text-gray-500 text-center">
            {`${translateEnum(schoolClass.technicalCourse, 'technicalCourse')} - ${translateEnum(schoolClass.year, 'year')}`}
          </Text>

          {/* Listando disciplinas */}
          {disciplines.map((discipline) => (
            <TouchableOpacity
              key={discipline.id}
              onPress={() => handleDisciplinePress(discipline)}
              className="mt-4 p-4 bg-white rounded-lg shadow-md border border-gray-300"
            >
              <Text className="text-lg font-bold text-primary-color text-center">{discipline.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

export default PreviousSchoolClasses;