import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { User } from "../interfaces/userInterface";
import StudentDisciplinesLookUp from "../components/student/StudentDisciplinesLookUp";
import DisciplineDetail from "../components/student/DisciplineDetail";
import Schedule from "../screens/Schedule";
import PreviousSchoolClasses from "../components/student/PreviousSchoolClasses";
import { DisciplineInterface } from "../interfaces/disciplineInterface";
import { SchoolClass } from "../interfaces/schoolClassInterface";

type RootStackParamList = {
  Disciplines: undefined;
  DisciplineDetail: {
    discipline: DisciplineInterface;
    studentCpf: string;
    professor: { name: string; cpf: string };
  };
  Schedule: { userData: User | null };
  PreviousSchoolClasses: { previousYearClasses: SchoolClass[] };
};

const Stack = createStackNavigator<RootStackParamList>();

interface StackRoutesProps {
  userData: User | null;
  schoolClass: SchoolClass[] | null;
}

const StudentGradesRoute: React.FC<StackRoutesProps> = ({
  userData,
  schoolClass,
}) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true, headerBackTitleVisible: false }}>
      <Stack.Screen
        name="Disciplines"
        children={() => (
          <StudentDisciplinesLookUp userData={userData} schoolClass={schoolClass} />
        )}
        options={{ title: "", headerShown: false }}
      />
      <Stack.Screen
        name="DisciplineDetail"
        children={({ route }) => <DisciplineDetail route={route} />}
        options={{
          title: "",
          headerShown: true,
          headerStyle: { backgroundColor: "#3B82F6" },
          headerTintColor: "#FFFFFF",
        }}
      />
      <Stack.Screen
        name="PreviousSchoolClasses"
        children={({ route }) => (
          <PreviousSchoolClasses
            previousYearClasses={route.params.previousYearClasses}
            studentCpf={userData?.cpf || ""}
          />
        )}
        options={{
          title: "",
          headerShown: true,
          headerStyle: { backgroundColor: "#3B82F6" },
          headerTintColor: "#FFFFFF",
        }}
      />
      <Stack.Screen
        name="Schedule"
        children={() => <Schedule userData={userData} schoolClassId={null} />}
        options={{ title: "", headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StudentGradesRoute;