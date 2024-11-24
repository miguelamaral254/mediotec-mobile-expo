import React, { useState, useEffect } from 'react';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import { Text, View } from 'react-native';
import { Feather } from "@expo/vector-icons";
import CustomDrawerContent from '../components/CustomDrawerContent';
import TabRoutes from './HomeRoute';
import ProfileRoute from './ProfileRoute';
import Settings from '../screens/Settings';
import StudentGradesRoute from './StudentGradesRoute';
import { User } from '../interfaces/userInterface';
import Schedule from '../screens/Schedule';
import RelatedStudentsRoute from './RelatedStudentsRoute';
import { SchoolClass } from '../interfaces/schoolClassInterface';
import { getSchoolClassByStudentCpf } from '../services/userService';

const Drawer = createDrawerNavigator();

interface NavBarProps {
  onLogout: () => void;
  userData: User | null;
}

const NavBar: React.FC<NavBarProps> = ({ onLogout, userData }) => {
  const [schoolClasses, setSchoolClasses] = useState<SchoolClass[]>([]);
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    if (userData?.role === 'STUDENT' && userData.cpf) {
      const fetchSchoolClass = async () => {
        try {
          const result = await getSchoolClassByStudentCpf(userData.cpf);
          setSchoolClasses(result);
        } catch {
          setSchoolClasses([]);
        }
      };
      fetchSchoolClass();
    }
  }, [userData]);

  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitle: '',
        drawerActiveTintColor: '#FFFFFF',
        drawerInactiveTintColor: '#FFFFFF',
        drawerActiveBackgroundColor: 'bg-primary-color',
        drawerLabelStyle: { color: '#FFFFFF' },
      }}
      drawerContent={(props: DrawerContentComponentProps) => (
        <CustomDrawerContent {...props} onLogout={onLogout} userData={userData} />
      )}
    >
      <Drawer.Screen
        name="home"
        children={() => <TabRoutes userData={userData} schoolClasses={schoolClasses} />}
        options={{
          drawerLabel: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Feather name="home" color="#FFFFFF" size={24} />
              <Text style={{ color: '#FFFFFF', marginLeft: 5 }}>Início</Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="profile"
        children={() => <ProfileRoute userData={userData} schoolClass={schoolClasses} />}
        options={{
          drawerLabel: () => (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Feather name="user" color="#FFFFFF" size={24} />
              <Text style={{ color: '#FFFFFF', marginLeft: 5 }}>Meu perfil</Text>
            </View>
          ),
        }}
      />
      {userData?.role === 'STUDENT' && (
        <Drawer.Screen
          name="grades"
          children={() => <StudentGradesRoute userData={userData} schoolClass={schoolClasses} />}
          options={{
            drawerLabel: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Feather name="book" color="#FFFFFF" size={24} />
                <Text style={{ color: '#FFFFFF', marginLeft: 5 }}>Meus conceitos</Text>
              </View>
            ),
          }}
        />
      )}
      {userData && (userData.role === 'STUDENT' || userData.role === 'PROFESSOR') && (
  <Drawer.Screen
    name="schedule"
    children={() => {
      // Filtrar a turma do ano atual
      const currentYearClass = schoolClasses.find(
        (schoolClass) => new Date(schoolClass.date).getFullYear() === currentYear
      );

      // Passar o ID da turma encontrada, ou null se não houver
      return (
        <Schedule
          userData={userData}
          schoolClassId={currentYearClass ? currentYearClass.id : null}
        />
      );
    }}
    options={{
      drawerLabel: () => (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Feather name="calendar" color="#FFFFFF" size={24} />
          <Text style={{ color: '#FFFFFF', marginLeft: 5 }}>Meu Horário</Text>
        </View>
      ),
    }}
  />
)}
      {userData?.role === 'PARENT' && (
        <Drawer.Screen
          name="relatedStudents"
          children={() => <RelatedStudentsRoute userData={userData} />}
          options={{
            drawerLabel: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Feather name="users" color="#FFFFFF" size={24} />
                <Text style={{ color: '#FFFFFF', marginLeft: 5 }}>Estudantes Relacionados</Text>
              </View>
            ),
          }}
        />
      )}
      <Drawer.Screen
        name="settings"
        component={Settings}
        options={{
          drawerItemStyle: { display: 'none' },
        }}
      />
    </Drawer.Navigator>
  );
};

export default NavBar;