import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, Text } from 'react-native';
import RelatedStudents from '../components/parent/RelatedStudents';
import { User } from '../interfaces/userInterface';
import { Student } from '../interfaces/studentInterface';
import { getStudentByCpf } from '../services/userService';
import StudentDetails from '../components/parent/StudentDetail';
import Schedule from '../screens/Schedule';
import StudentGradesOverview from '../components/parent/StudentGradesOverview';

type RelatedStudentsParamList = {
  RelatedStudents: undefined;
  StudentDetails: { student: Student };
  StudentGradesOverview: { student: Student }; // Adicione esta linha
  Schedule: { student: Student };
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
        } catch (error) {
          console.error("Erro ao buscar dados dos estudantes:", error);
          setError('Erro ao carregar os dados dos estudantes relacionados.');
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
          <RelatedStudents 
            relatedStudents={relatedStudents} 
            navigation={navigation} 
          />
        )}
        options={{ title: 'Estudantes Relacionados' }}
      />
      <Stack.Screen
        name="StudentDetails"
        children={({ route, navigation }) => (
          <StudentDetails 
            route={route} 
            navigation={navigation} 
          />
        )}
        options={{ title: 'Detalhes do Estudante' }}
      />
      <Stack.Screen
        name="StudentGradesOverview" // Alterado para corresponder ao nome correto
        children={({ route }) => (
          <StudentGradesOverview student={route.params?.student} />
        )}
        options={{ title: 'Conceitos do Estudante' }}
      />
      <Stack.Screen
        name="Schedule"
        children={({ route }) => (
          <Schedule userData={route.params?.student} />
        )}
        options={{ title: 'Horários do Estudante' }}
      />
    </Stack.Navigator>
  );
};

export default RelatedStudentsRoute;