import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Student } from '../../interfaces/studentInterface';

interface RelatedStudentsProps {
  relatedStudents: Student[];
  navigation: any;
}

const RelatedStudents: React.FC<RelatedStudentsProps> = ({ relatedStudents, navigation }) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(false);
  }, [relatedStudents]);

  const handleStudentPress = (student: Student) => {
    navigation.navigate('StudentDetails', { student });
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View className="p-5">
      <Text className="text-lg font-bold mb-3">Estudantes Relacionados</Text>
      {relatedStudents.length > 0 ? (
        <FlatList
          data={relatedStudents}
          keyExtractor={(item) => item.cpf}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleStudentPress(item)} className="mb-2">
              <View className="p-4 bg-gray-200 rounded">
                <Text className="text-lg font-semibold">{item.name}</Text>
                <Text className="text-gray-600">CPF: {item.cpf}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text className="text-gray-500">Nenhum estudante relacionado encontrado.</Text>
      )}
    </View>
  );
};

export default RelatedStudents;