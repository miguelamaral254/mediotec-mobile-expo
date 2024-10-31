import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RelatedStudents from '../components/parent/RelatedStudents';
import { User } from '../interfaces/userInterface';
import { Student } from '../interfaces/studentInterface';
import { getStudentByCpf } from '../services/userService';

const Stack = createStackNavigator();

interface RelatedStudentsRouteProps {
  userData: User | null;
}

const RelatedStudentsRoute: React.FC<RelatedStudentsRouteProps> = ({ userData }) => {
  const [relatedStudents, setRelatedStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchStudentDetails = async () => {
      if (userData && userData.students && userData.students.length) {
        try {
          const students = await Promise.all(
            userData.students.map(async (student) => {
              const studentData = await getStudentByCpf(student.cpf);
              return studentData; // Aqui você deve garantir que studentData seja do tipo Student
            })
          );
          setRelatedStudents(students);
        } catch (error) {
          console.error("Erro ao buscar dados dos estudantes:", error);
        }
      }
      setLoading(false); // Mova para fora do if
    };

    fetchStudentDetails();
  }, [userData]);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="RelatedStudents"
        children={() => <RelatedStudents relatedStudents={relatedStudents} />}
        options={{ title: 'Estudantes Relacionados' }}
      />
    </Stack.Navigator>
  );
};

export default RelatedStudentsRoute;