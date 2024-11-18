import React, { useEffect, useState } from 'react';
import { Text, ScrollView, ActivityIndicator, TouchableOpacity, View } from 'react-native';
import { Lesson } from '../../interfaces/LessonInterface';
import { User } from '../../interfaces/userInterface';
import { SchoolClass } from '../../interfaces/schoolClassInterface';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { translateEnum } from '../../utils/translateEnum';
import { getLessonsByStudentAndClass } from '../../services/lessonsService';
import { DisciplineInterface } from '../../interfaces/disciplineInterface';

type RootStackParamList = {
  DisciplineDetail: { discipline: DisciplineInterface; studentCpf: string };
  PreviousSchoolClasses: { previousYearClasses: SchoolClass[] };
};
interface StudentDisciplinesLookUpProps {
  userData: User | null;
  schoolClass: SchoolClass[] | null;  
}

const StudentDisciplinesLookUp: React.FC<StudentDisciplinesLookUpProps> = ({ userData, schoolClass }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [currentLessons, setCurrentLessons] = useState<Lesson[]>([]);
  const [previousLessons, setPreviousLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const currentYear = new Date().getFullYear();

  const currentYearClasses = schoolClass
    ? schoolClass.filter((sc) => new Date(sc.date).getFullYear() === currentYear)
    : [];
  const previousYearClasses = schoolClass
    ? schoolClass.filter((sc) => new Date(sc.date).getFullYear() < currentYear)
    : [];

  useEffect(() => {
    const fetchLessons = async () => {
      if (userData?.cpf && schoolClass) {
        try {
          const currentLessonsData = await Promise.all(
            currentYearClasses.map((sc) => getLessonsByStudentAndClass(userData.cpf, sc.id))
          );
          const previousLessonsData = await Promise.all(
            previousYearClasses.map((sc) => getLessonsByStudentAndClass(userData.cpf, sc.id))
          );
          setCurrentLessons(currentLessonsData.flat());
          setPreviousLessons(previousLessonsData.flat());
        } catch (err) {
          setError('Erro ao carregar as lições');
        } finally {
          setLoading(false);
        }
      } else {
        setError('CPF ou turmas não disponíveis');
        setLoading(false);
      }
    };

    fetchLessons();
  }, [userData, schoolClass]);

  const handleDisciplinePress = (lesson: Lesson) => {
    navigation.navigate('DisciplineDetail', { discipline: lesson.discipline, studentCpf: userData!.cpf });
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
        {currentYearClasses.length > 0 ? (
          currentYearClasses.map((sc) => (
            <View key={sc.id} className="mb-4">
              <Text className="text-xl font-semibold text-primary-color text-center">
                {`Turma: ${sc.code} - ${translateEnum(sc.letter, 'letter')} (${translateEnum(sc.shift, 'shift')})`}
              </Text>
              <Text className="text-sm p-4 text-gray-500 text-center">
                {`${translateEnum(sc.technicalCourse, 'technicalCourse')} - ${translateEnum(sc.year, 'year')}`}
              </Text>
              {currentLessons
                .filter((lesson) => lesson.schoolClass.id === sc.id)
                .map((lesson) => (
                  <TouchableOpacity
                    key={lesson.id}
                    onPress={() => handleDisciplinePress(lesson)}
                    className="mb-4 p-4 bg-white rounded-lg shadow-md border border-gray-300"
                  >
                    <Text className="text-lg font-bold text-primary-color text-center">{lesson.name}</Text>
                  </TouchableOpacity>
                ))}
            </View>
          ))
        ) : (
          <Text className="text-center text-gray-500">Nenhuma turma do ano atual disponível</Text>
        )}
      </View>
      {previousYearClasses.length > 0 && (
        <TouchableOpacity
          onPress={() => navigation.navigate('PreviousSchoolClasses', { previousYearClasses })}
          className="bg-white rounded-lg p-4 mb-4 shadow-md border border-gray-300"
        >
          <Text className="text-xl font-semibold text-primary-color text-center">Ver Turmas Anteriores</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

export default StudentDisciplinesLookUp;