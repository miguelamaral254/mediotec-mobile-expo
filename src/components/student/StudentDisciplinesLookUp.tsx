import React, { useEffect, useState } from "react";
import {
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  View,
} from "react-native";
import { Lesson } from "../../interfaces/LessonInterface";
import { User } from "../../interfaces/userInterface";
import { SchoolClass } from "../../interfaces/schoolClassInterface";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { translateEnum } from "../../utils/translateEnum";
import { getLessonsByStudentAndClass } from "../../services/lessonsService";
import { DisciplineInterface } from "../../interfaces/disciplineInterface";

type RootStackParamList = {
  DisciplineDetail: { discipline: DisciplineInterface; studentCpf: string; professor: { name: string; cpf: string }; // Inclua o professor
};
  PreviousSchoolClasses: { previousYearClasses: SchoolClass[] };
};    

interface StudentDisciplinesLookUpProps {
  userData: User | null;
  schoolClass: SchoolClass[] | null;
}

const StudentDisciplinesLookUp: React.FC<StudentDisciplinesLookUpProps> = ({
  userData,
  schoolClass,
}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [currentLessons, setCurrentLessons] = useState<Lesson[]>([]);
  const [previousLessons, setPreviousLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const currentYear = new Date().getFullYear();

  const currentYearClasses = schoolClass
    ? schoolClass
        .filter((sc) => new Date(sc.date).getFullYear() === currentYear)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 1)
    : [];
  const previousYearClasses = schoolClass
    ? schoolClass.filter((sc) => new Date(sc.date).getFullYear() < currentYear)
    : [];

  useEffect(() => {
    const fetchLessons = async () => {
      if (userData?.cpf && schoolClass) {
        try {
          const currentLessonsData = await Promise.all(
            currentYearClasses.map((sc) =>
              getLessonsByStudentAndClass(userData.cpf, sc.id)
            )
          );
          const previousLessonsData = await Promise.all(
            previousYearClasses.map((sc) =>
              getLessonsByStudentAndClass(userData.cpf, sc.id)
            )
          );
          //console.log("Lições do ano atual:", currentLessonsData);

          setCurrentLessons(currentLessonsData.flat());
          setPreviousLessons(previousLessonsData.flat());
        } catch (err) {
          setError("Erro ao carregar as lições");
        } finally {
          setLoading(false);
        }
      } else {
        setError("CPF ou turmas não disponíveis");
        setLoading(false);
      }
    };

    fetchLessons();
  }, [userData, schoolClass]);

  const handleDisciplinePress = (lesson: Lesson) => {
    if (lesson.professor) {
      navigation.navigate("DisciplineDetail", {
        discipline: lesson.discipline,
        studentCpf: userData!.cpf,
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
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#06B6D4" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-500 text-center">{error}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100">
      <Text className="text-4xl font-bold bg-blue-500 px-10 text-white text-center">
        Boletim escolar
      </Text>
      <View className="bg-white flex flex-col p-6 rounded-lg shadow-md mb-6">
        {currentYearClasses.length > 0 ? (
          currentYearClasses.map((sc) => (
            <View key={sc.id} className="mb-6">
              <Text className="text-2xl font-bold text-blue-600 text-center">
                {`Turma: ${sc.code} - ${translateEnum(sc.letter, "letter")}`}
              </Text>
              <Text className="text-lg text-gray-600 text-center mt-2">
                {`${translateEnum(sc.technicalCourse, "technicalCourse")}`}
              </Text>

              <Text>
                <Text className="text-lg text-gray-600 text-center">
                  {`${translateEnum(sc.year, "year")}`}
                </Text>
              </Text>
              {currentLessons
                .filter((lesson) => lesson.schoolClass.id === sc.id)
                .map((lesson) => (
                  <TouchableOpacity
                    key={lesson.id}
                    onPress={() => handleDisciplinePress(lesson)}
                    className="mt-4 flex-row items-center justify-center p-4 bg-blue-500 rounded-lg shadow-md"
                  >
                    <Text className="text-white text-center text-xl font-semibold">
                      🖥️ {lesson.discipline.name}
                    </Text>
                  </TouchableOpacity>
                ))}
            </View>
          ))
        ) : (
          <Text className="text-center text-gray-500">
            Nenhuma turma do ano atual disponível
          </Text>
        )}
      </View>
      {previousYearClasses.length > 0 && (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("PreviousSchoolClasses", {
              previousYearClasses,
            })
          }
          className="bg-blue-100 mx-4 rounded-lg border border-blue-500 flex-row items-center justify-center p-4 mb-4 shadow-lg"
        >
          <Text className="text-2xl font-bold text-blue-800 mr-2">📚</Text>
          <Text className="text-xl font-semibold text-blue-500">
            Ver Turmas Anteriores
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default StudentDisciplinesLookUp;
