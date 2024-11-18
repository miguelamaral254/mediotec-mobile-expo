import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Lesson } from '../../interfaces/LessonInterface';
import { SchoolClass } from '../../interfaces/schoolClassInterface';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { translateEnum } from '../../utils/translateEnum';
import { getLessonsByStudentAndClass } from '../../services/lessonsService';

type RootStackParamList = {
  DisciplineDetail: { discipline: Lesson['discipline']; studentCpf: string };
};

interface PreviousSchoolClassesProps {
  previousYearClasses: SchoolClass[];
  studentCpf: string;
}

const PreviousSchoolClasses: React.FC<PreviousSchoolClassesProps> = ({ previousYearClasses, studentCpf }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [lessonsByClass, setLessonsByClass] = useState<Record<number, Lesson[]>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const lessonsData: Record<number, Lesson[]> = {};
        await Promise.all(
          previousYearClasses.map(async (schoolClass) => {
            const lessons = await getLessonsByStudentAndClass(studentCpf, schoolClass.id);
            lessonsData[schoolClass.id] = lessons;
          })
        );
        setLessonsByClass(lessonsData);
      } catch (err) {
        setError('Erro ao carregar as lições');
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [studentCpf, previousYearClasses]);

  const handleDisciplinePress = (lesson: Lesson) => {
    navigation.navigate('DisciplineDetail', { discipline: lesson.discipline, studentCpf });
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
          {lessonsByClass[schoolClass.id]?.map((lesson) => (
            <TouchableOpacity
              key={lesson.id}
              onPress={() => handleDisciplinePress(lesson)}
              className="mt-4 p-4 bg-white rounded-lg shadow-md border border-gray-300"
            >
              <Text className="text-lg font-bold text-primary-color text-center">{lesson.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

export default PreviousSchoolClasses;