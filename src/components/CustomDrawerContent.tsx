import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { User } from "../interfaces/userInterface";

const styles = {
  container: "flex-1 bg-blue-200",
  header: "p-6 bg-blue-500 items-center",
  image: "w-20 h-20 rounded-full mb-4 border-2 border-white",
  userName: "text-white text-2xl font-bold text-center",
  loadingText: "text-white text-xl",
  drawerList: "flex-1 bg-gray-100",
  footer: "border-t border-blue-200 p-4 bg-blue-500",
  footerButton: "flex-row items-center mb-4",
  footerIcon: "text-white",
  footerText: "text-lg ml-3 text-white",
  menuItem: "flex flex-row items-center px-4 py-3 rounded-sm",
  menuIcon: "mr-3",
  menuTextFocused: "text-white font-bold text-lg",
  menuTextUnfocused: "text-blue-500 text-lg",
};
interface CustomDrawerContentProps extends DrawerContentComponentProps {
  onLogout: () => void;
  userData: User | null;
}

const CustomDrawerContent: React.FC<CustomDrawerContentProps> = ({
  onLogout,
  userData,
  ...props
}) => {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ flex: 1, backgroundColor: "#3B82F6" }}
    >
      <View className={styles.header}>
        <Image
          source={require("../assets/avatar.png")}
          className={styles.image}
        />
        {userData ? (
          <Text className={styles.userName}>Bem-vindo, {userData.name}</Text>
        ) : (
          <Text className={styles.loadingText}>Carregando...</Text>
        )}
      </View>

      {/* Menu Items */}
      <View className={styles.drawerList}>
        {props.state.routes.map((route, index) => {
          if (route.name === "settings") return null;

          const isFocused = props.state.index === index;
          let iconName: keyof typeof Feather.glyphMap;
          let label: string;

          switch (route.name) {
            case "home":
              label = "Início";
              iconName = "home";
              break;
            case "profile":
              label = "Meu Perfil";
              iconName = "user";
              break;
            case "grades":
              label = "Meu Boletim";
              iconName = "book";
              break;
            case "schedule":
              label = "Meu Horário";
              iconName = "calendar";
              break;
            case "relatedStudents":
              label = "Estudantes Relacionados";
              iconName = "users";
              break;
            default:
              label = route.name;
              iconName = "file-text";
              break;
          }

          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => props.navigation.navigate(route.name)}
              className={`${styles.menuItem} ${isFocused ? "bg-blue-500" : ""}`}
            >
              <Feather
                name={iconName}
                size={24}
                style={{
                  color: isFocused ? "#FFFFFF" : "#3B82F6",
                }}
              />
              <Text
                className={
                  isFocused ? styles.menuTextFocused : styles.menuTextUnfocused
                }
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Footer */}
      <View className={styles.footer}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("settings")}
          className={styles.footerButton}
        >
          <Feather name="settings" size={24} className={styles.footerIcon} color= '#FFFFFF' />
          <Text className={styles.footerText}>Configurações</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onLogout} className={styles.footerButton}>
          <Feather name="log-out" size={24} className={styles.footerIcon} color= '#FFFFFF' />
          <Text className={styles.footerText}>Logout</Text>
        </TouchableOpacity>
        <Text className='text-white text-sm pt-5 ml-32'>Ver 1.1</Text>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
