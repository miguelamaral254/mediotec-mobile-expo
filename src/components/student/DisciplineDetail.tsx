import React from 'react';
import { View, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { DisciplineInterface } from '../../interfaces/disciplineInterface';

type RootStackParamList = {
  DisciplineDetail: { discipline: DisciplineInterface };
};

interface DisciplineDetailProps {
  route: RouteProp<RootStackParamList, 'DisciplineDetail'>;
}

const DisciplineDetail: React.FC<DisciplineDetailProps> = ({ route }) => {
  const { discipline } = route.params;

  return (
    <View>
      <Text className="text-2xl font-bold">{discipline.name}</Text>
      <Text>{discipline.description}</Text>
      <Text>Carga Horária: {discipline.workload} horas</Text>
    </View>
  );
};

export default DisciplineDetail;
