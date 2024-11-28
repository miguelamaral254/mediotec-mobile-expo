import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Lesson } from "../../interfaces/LessonInterface";
import { SchoolClass } from "../../interfaces/schoolClassInterface";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { translateEnum } from "../../utils/translateEnum";
import { getLessonsByStudentAndClass } from "../../services/lessonsService";

type RootStackParamList = {
  DisciplineDetail: { 
    discipline: Lesson["discipline"]; 
    studentCpf: string; 
    professor: { name: string; cpf: string }; 
  };
};

interface PreviousSchoolClassesProps {
  previousYearClasses: SchoolClass[];
  studentCpf: string;
}

const PreviousSchoolClasses: React.FC<PreviousSchoolClassesProps> = ({
  previousYearClasses,
  studentCpf,
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [lessonsByClass, setLessonsByClass] = useState<
    Record<number, Lesson[]>
  >({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const lessonsData: Record<number, Lesson[]> = {};
        await Promise.all(
          previousYearClasses.map(async (schoolClass) => {
            const lessons = await getLessonsByStudentAndClass(
              studentCpf,
              schoolClass.id
            );
            lessonsData[schoolClass.id] = lessons;
          })
        );
        setLessonsByClass(lessonsData);
      } catch (err) {
        setError("Erro ao carregar as lições");
      } finally {
        setLoading(false);
      }
    };

    fetchLessons();
  }, [studentCpf, previousYearClasses]);

 const handleDisciplinePress = (lesson: Lesson) => {
  if (lesson.professor) {
    navigation.navigate("DisciplineDetail", {
      discipline: lesson.discipline,
      studentCpf,
      professor: {
        name: lesson.professor.name,
        cpf: lesson.professor.cpf,
      },
    });
  } else {
    console.warn(`Professor não encontrado para a lição: ${lesson.id}`);
  }
};
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#06B6D4" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <Text className="text-red-500 text-center font-semibold">{error}</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* Header */}
      <Text className="text-4xl font-bold bg-blue-500 p-10 text-white mb-6 text-center">
        Turmas Anteriores
      </Text>

      {/* Turmas Anteriores */}
      {previousYearClasses.map((schoolClass) => (
        <View
          key={schoolClass.id}
          className="bg-white flex flex-col p-6 rounded-lg shadow-md mb-6"
        >
          <Text className="text-2xl font-bold text-blue-600 text-center mb-2">
            {`Turma: ${schoolClass.code} - ${translateEnum(
              schoolClass.letter,
              "letter"
            )}`}
          </Text>
          <Text className="text-lg text-gray-600 text-center">
            {`${translateEnum(
              schoolClass.technicalCourse,
              "technicalCourse"
            )}`}
          </Text>
          <Text>
            <Text className="text-lg text-gray-600 text-center">
              {`${translateEnum(schoolClass.year, "year")}`}
            </Text>
          </Text>
          {lessonsByClass[schoolClass.id]?.map((lesson) => (
            <TouchableOpacity
              key={lesson.id}
              onPress={() => handleDisciplinePress(lesson)}
              className="mt-4 flex-row items-center justify-center p-4 bg-blue-500 rounded-lg shadow-md"
              >
                <View>
                  <Text className="text-white text-center text-xl font-semibold">
                    🖥️ {lesson.discipline.name}
                  </Text>
                  <Text className="text-white text-center text-lg">
                    Professor: {lesson.professor.name}
                  </Text>
                </View>
              </TouchableOpacity>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

export default PreviousSchoolClasses;