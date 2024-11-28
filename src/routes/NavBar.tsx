import React, { useState, useEffect } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawerContent from "../components/CustomDrawerContent";
import TabRoutes from "./HomeRoute";
import ProfileRoute from "./ProfileRoute";
import Settings from "../screens/Settings";
import StudentGradesRoute from "./StudentGradesRoute";
import { User } from "../interfaces/userInterface";
import Schedule from "../screens/Schedule";
import RelatedStudentsRoute from "./RelatedStudentsRoute";
import { SchoolClass } from "../interfaces/schoolClassInterface";
import { getSchoolClassByStudentCpf } from "../services/userService";

const Drawer = createDrawerNavigator();

interface NavBarProps {
  onLogout: () => void;
  userData: User | null;
}

const NavBar: React.FC<NavBarProps> = ({ onLogout, userData }) => {
  const [schoolClasses, setSchoolClasses] = useState<SchoolClass[]>([]);

  useEffect(() => {
    if (userData?.role === "STUDENT" && userData.cpf) {
      const fetchSchoolClass = async () => {
        try {
          const result = await getSchoolClassByStudentCpf(userData.cpf);
          setSchoolClasses(result);
        } catch (error) {
          console.error("Erro ao buscar turmas:", error);
          setSchoolClasses([]);
        }
      };
      fetchSchoolClass();
    }
  }, [userData]);

  return (
    <Drawer.Navigator
      initialRouteName="home"
      screenOptions={{
        headerTitle: "",
        headerStyle: { backgroundColor: "#3B82F6" },
        headerTintColor: "#FFFFFF", 

      }}
      drawerContent={(props) => (
        <CustomDrawerContent
          {...props}
          onLogout={onLogout}
          userData={userData}
        />
      )}
    >
      <Drawer.Screen
        name="home"
        options={{
          title: "Início",
          headerStyle: { backgroundColor: "#3B82F6" },
        }}
        children={() => (
          <TabRoutes userData={userData} schoolClasses={schoolClasses} />
        )}
      />
      <Drawer.Screen
        name="profile"
        options={{ title: "Meu Perfil" }}
        children={() => (
          <ProfileRoute userData={userData} schoolClass={schoolClasses} />
        )}
      />
      {userData?.role === "STUDENT" && (
        <Drawer.Screen
          name="grades"
          options={{
            title: "Meu Boletim",
            headerStyle: { backgroundColor: "#3B82F6" },
          }}
          children={() => (
            <StudentGradesRoute
              userData={userData}
              schoolClass={schoolClasses}
            />
          )}
        />
      )}
      {userData?.role === "STUDENT" && (
        <Drawer.Screen
          name="schedule"
          options={{
            title: "Meu Horário",
            headerStyle: { backgroundColor: "#3B82F6" },
          }}
          children={() => (
            <Schedule
              userData={userData}
              schoolClassId={
                schoolClasses.find(
                  (sc) =>
                    new Date(sc.date).getFullYear() === new Date().getFullYear()
                )?.id || null
              }
            />
          )}
        />
      )}
      {userData?.role === "PARENT" && (
        <Drawer.Screen
          name="relatedStudents"
          options={{
            title: "Estudantes Relacionados",
            headerStyle: { backgroundColor: "#3B82F6" },
          }}
          children={() => <RelatedStudentsRoute userData={userData} />}
        />
      )}
      <Drawer.Screen
        name="settings"
        component={Settings}
        options={{
          title: "Configurações",
          drawerItemStyle: { display: "none" },
          headerStyle: { backgroundColor: "#3B82F6" },
        }}
      />
    </Drawer.Navigator>
  );
};

export default NavBar;
