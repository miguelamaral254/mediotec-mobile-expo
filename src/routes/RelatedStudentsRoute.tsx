import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { ActivityIndicator, Text } from "react-native";
import RelatedStudents from "../components/parent/RelatedStudents";
import { User } from "../interfaces/userInterface";
import { Student } from "../interfaces/studentInterface";
import { getStudentByCpf } from "../services/userService";
import StudentDetails from "../components/parent/StudentDetail";
import StudentGradesOverview from "../components/parent/StudentGradesOverview";
import RelatedDisciplineDetail from "../components/parent/RelatedDisciplineDetail";
import RelatedSchedule from "../components/parent/RelatedSchedule";
import RelatedPreviousSchoolClasses from "../components/parent/RelatedPreviousSchoolClasses";
import { SchoolClass } from "../interfaces/schoolClassInterface";
import StudentGrades from "../components/student/StudentGrades";

type RelatedStudentsParamList = { 
  RelatedStudents: undefined;
  StudentDetails: { student: Student };
  StudentGradesOverview: { student: Student };
  Schedule: { student: Student };
  RelatedDisciplineDetail: { studentCpf: string; disciplineId: number; professor: { name: string; cpf: string } };
  PreviousSchoolClasses: { previousYearClasses: SchoolClass[]; studentCpf: string };
  DisciplineDetail: { discipline: any; studentCpf: string; professor: { name: string; cpf: string } }; 
};

const Stack = createStackNavigator<RelatedStudentsParamList>();

interface RelatedStudentsRouteProps { 
  userData: User | null;
}

const RelatedStudentsRoute: React.FC<RelatedStudentsRouteProps> = ({ userData }) => {
  const [relatedStudents, setRelatedStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      if (userData && userData.students && userData.students.length) {
        try {
          const students = await Promise.all(
            userData.students.map(async (student) => {
              const studentData = await getStudentByCpf(student.cpf);
              return studentData;
            })
          );
          setRelatedStudents(students);
        } catch {
          setError("Erro ao carregar os dados dos estudantes relacionados.");
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchStudentDetails();
  }, [userData]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000FF" />;
  }

  if (error) {
    return <Text className="text-red-500 text-center">{error}</Text>;
  }

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RelatedStudents"
        children={({ navigation }) => (
          <RelatedStudents relatedStudents={relatedStudents} navigation={navigation} />
        )}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="StudentDetails"
        children={({ route, navigation }) => (
          <StudentDetails route={route} navigation={navigation} />
        )}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="StudentGradesOverview"
        children={({ route }) => (
          <StudentGradesOverview student={route.params.student} />
        )}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="RelatedDisciplineDetail"
        children={({ route }) => (
          <RelatedDisciplineDetail
            studentCpf={route.params.studentCpf}
            disciplineId={route.params.disciplineId}
            professor={route.params.professor} 
          />
        )}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="PreviousSchoolClasses"
        children={({ route }) => (
          <RelatedPreviousSchoolClasses
            previousYearClasses={route.params.previousYearClasses}
            studentCpf={route.params.studentCpf}
          />
        )}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="Schedule"
        children={({ route }) => (
          <RelatedSchedule cpf={route.params.student.cpf} />
        )}
        options={{ title: "" }}
      />
      <Stack.Screen
        name="DisciplineDetail"
        children={({ route }) => (
          <StudentGrades
            studentCpf={route.params.studentCpf}
            disciplineId={route.params.discipline.id}
            professor={route.params.professor} 
          />
        )}
        options={{ title: "" }}
      />
    </Stack.Navigator>
  );
};

export default RelatedStudentsRoute;