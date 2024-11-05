// src/components/parent/StudentGradesOverview.tsx
import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Student } from '../../interfaces/studentInterface';

interface StudentGradesOverviewProps {
  student: Student;
}

const StudentGradesOverview: React.FC<StudentGradesOverviewProps> = ({ student }) => {
  // Exemplo de dados de notas, você pode substituir por uma chamada de API real.
  const grades = [
    { subject: 'Matemática', av1: 8, av2: 7, final: 8.5 },
    { subject: 'Português', av1: 9, av2: 10, final: 9.5 },
    { subject: 'História', av1: 7, av2: 8, final: 7.5 },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{student.name} - Notas</Text>
      <FlatList
        data={grades}
        keyExtractor={(item) => item.subject}
        renderItem={({ item }) => (
          <View style={styles.gradeContainer}>
            <Text style={styles.subject}>{item.subject}</Text>
            <Text>AV1: {item.av1}</Text>
            <Text>AV2: {item.av2}</Text>
            <Text>Final: {item.final}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  gradeContainer: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  subject: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default StudentGradesOverview;