// types.ts

export type RootStackParamList = {
  Home: undefined; // Defina outras rotas conforme necessário
  DisciplineDetail: { discipline: DisciplineInterface; assessments: ResponseGradeInterface[] };
};

// useNavigation.ts
import { useNavigation as useBaseNavigation } from '@react-navigation/native';

import { StackNavigationProp } from '@react-navigation/stack';
import { DisciplineInterface } from '../interfaces/disciplineInterface';
import { ResponseGradeInterface } from '../interfaces/responseGradeInterface';

export const useNavigation = () => {
  return useBaseNavigation<StackNavigationProp<RootStackParamList>>();
};
