import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { Student } from '../../interfaces/studentInterface';

interface RelatedStudentsProps {
  relatedStudents: Student[];
}

const RelatedStudents: React.FC<RelatedStudentsProps> = ({ relatedStudents }) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Definindo o carregamento como falso após os estudantes serem definidos
    setLoading(false);
  }, [relatedStudents]);

  const handleStudentPress = (student: Student) => {
    Alert.alert(`Estudante Selecionado`, `Nome: ${student.name}\nCPF: ${student.cpf}`);
  };

  // Se está carregando, exiba o indicador
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Estudantes Relacionados</Text>
      {relatedStudents.length > 0 ? (
        <FlatList
          data={relatedStudents}
          keyExtractor={(item) => item.cpf}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleStudentPress(item)} style={{ marginBottom: 10 }}>
              <View style={{ padding: 15, backgroundColor: '#e0e0e0', borderRadius: 8 }}>
                <Text style={{ fontSize: 16, fontWeight: '600' }}>{item.name}</Text>
                <Text style={{ color: '#555' }}>CPF: {item.cpf}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text style={{ color: '#555' }}>Nenhum estudante relacionado encontrado.</Text>
      )}
    </View>
  );
};

export default RelatedStudents;