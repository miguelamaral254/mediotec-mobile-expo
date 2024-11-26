import React, { useState, useEffect } from 'react';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import { Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
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
      screenOptions={({ route }) => ({
        headerTitle: "",
        drawerActiveTintColor: '#FFFFFF',
        drawerInactiveTintColor: '#A9A9A9',
        drawerActiveBackgroundColor: '#3B82F6',
        drawerLabelStyle: { color: '#FFFFFF', fontSize: 16 },
        drawerStyle: { backgroundColor: '#1E1E1E' },
      })}
      drawerContent={(props: DrawerContentComponentProps) => (
        <CustomDrawerContent {...props} onLogout={onLogout} userData={userData} />
      )}
    >
      <Drawer.Screen
        name="home"
        children={() => <TabRoutes userData={userData} schoolClasses={schoolClasses} />}
        options={{
          drawerLabel: ({ focused }) => (
            <View className="flex flex-row items-center">
              <Feather name="home" size={24} color={focused ? '#FFFFFF' : '#A9A9A9'} />
              <Text
                className={`text-lg ml-3 ${
                  focused ? 'text-white font-bold' : 'text-gray-400'
                }`}
              >
                Início
              </Text>
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="profile"
        children={() => <ProfileRoute userData={userData} schoolClass={schoolClasses} />}
        options={{
          drawerLabel: ({ focused }) => (
            <View className="flex flex-row items-center">
              <Feather name="user" size={24} color={focused ? '#FFFFFF' : '#A9A9A9'} />
              <Text
                className={`text-lg ml-3 ${
                  focused ? 'text-white font-bold' : 'text-gray-400'
                }`}
              >
                Meu Perfil
              </Text>
            </View>
          ),
        }}
      />
      {userData?.role === 'STUDENT' && (
        <Drawer.Screen
          name="grades"
          children={() => <StudentGradesRoute userData={userData} schoolClass={schoolClasses} />}
          options={{
            drawerLabel: ({ focused }) => (
              <View className="flex flex-row items-center">
                <Feather name="book" size={24} color={focused ? '#FFFFFF' : '#A9A9A9'} />
                <Text
                  className={`text-lg ml-3 ${
                    focused ? 'text-white font-bold' : 'text-gray-400'
                  }`}
                >
                  Meu Boletim
                </Text>
              </View>
            ),
          }}
        />
      )}
      {userData && (userData.role === 'STUDENT' || userData.role === 'PROFESSOR') && (
        <Drawer.Screen
          name="schedule"
          children={() => {
            const currentYearClass = schoolClasses.find(
              (schoolClass) => new Date(schoolClass.date).getFullYear() === currentYear
            );

            return (
              <Schedule
                userData={userData}
                schoolClassId={currentYearClass ? currentYearClass.id : null}
              />
            );
          }}
          options={{
            drawerLabel: ({ focused }) => (
              <View className="flex flex-row items-center">
                <Feather name="calendar" size={24} color={focused ? '#FFFFFF' : '#A9A9A9'} />
                <Text
                  className={`text-lg ml-3 ${
                    focused ? 'text-white font-bold' : 'text-gray-400'
                  }`}
                >
                  Meu Horário
                </Text>
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
            drawerLabel: ({ focused }) => (
              <View className="flex flex-row items-center">
                <Feather name="users" size={24} color={focused ? '#FFFFFF' : '#A9A9A9'} />
                <Text
                  className={`text-lg ml-3 ${
                    focused ? 'text-white font-bold' : 'text-gray-400'
                  }`}
                >
                  Estudantes Relacionados
                </Text>
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