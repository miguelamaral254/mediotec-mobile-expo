import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';
import { Student } from '../../interfaces/studentInterface';
import { formatCPF } from '../../utils/userUtils';

interface RelatedStudentsProps {
  relatedStudents: Student[];
  navigation: any;
}

const RelatedStudents: React.FC<RelatedStudentsProps> = ({ relatedStudents, navigation }) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Adiciona um atraso de 2 segundos para exibir a animação
  }, [relatedStudents]);

  const handleStudentPress = (student: Student) => {
    navigation.navigate('StudentDetails', { student });
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F3F4F6' }}>
        <LottieView
          source={require('../../../assets/animations/folder.json')} 
          autoPlay
          loop
          style={{ width: 500, height: 600 }}
        />
        <Text style={{ marginTop: 16, color: '#4666AF', fontSize: 18 }}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100">
      <View className="bg-blue-500 p-6 rounded-b-lg shadow-md">
        <Text className="text-3xl font-bold text-white text-center">Estudantes Relacionados</Text>
      </View>
      <View className="p-4">
        {relatedStudents.length > 0 ? (
          <FlatList
            data={relatedStudents}
            keyExtractor={(item) => item.cpf}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleStudentPress(item)}
                className="bg-white p-6 mb-4 rounded-lg shadow-md flex-row items-center"
              >
                <FontAwesome name="user" size={24} color="#4666AF" style={{ marginRight: 16 }} />
                <View>
                  <Text className="text-xl font-bold text-blue-600">{item.name}</Text>
                  <Text className="text-sm text-gray-500">CPF: {formatCPF(item.cpf)}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        ) : (
          <View className="flex-1 justify-center items-center">
            <Text className="text-gray-500 text-lg text-center">
              Nenhum estudante relacionado encontrado.
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default RelatedStudents;