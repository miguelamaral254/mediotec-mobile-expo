import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const StudentFeed = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f3f4f6", padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", color: "#333", marginBottom: 16 }}>
        Painel do Estudante
      </Text>
      <Text style={{ fontSize: 16, color: "#666", marginBottom: 16 }}>
        Bem-vindo à área do estudante! Fique por dentro das novidades.
      </Text>

      {/* Banner de Avisos */}
      <View style={{ backgroundColor: "#FEF3C7", padding: 16, borderRadius: 8, marginBottom: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#92400E" }}>🚨 Avisos Importantes</Text>
        <Text style={{ marginTop: 8, color: "#333" }}>Fique atento aos comunicados da escola:</Text>
        <View style={{ marginTop: 8, paddingLeft: 8 }}>
          <Text style={{ color: "#333" }}>📅 Reunião de pais e mestres dia 10/10 às 18h.</Text>
          <Text style={{ color: "#333" }}>📝 Entrega de trabalhos até o dia 15/10.</Text>
          <Text style={{ color: "#333" }}>📊 Prova de matemática dia 20/10.</Text>
        </View>
      </View>

      {/* Grid de funcionalidades */}
      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
        {/* Grade de Horários */}
        <TouchableOpacity
          style={{
            backgroundColor: "#fff",
            borderRadius: 8,
            padding: 16,
            marginBottom: 16,
            width: "48%",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
          }}
         // onPress={() => navigation.navigate("Schedules")}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#333", marginBottom: 8 }}>🕒 Grade de Horários</Text>
          <Text style={{ fontSize: 14, color: "#666", marginBottom: 16 }}>Confira sua grade de horários e não perca nenhuma aula!</Text>
          <Text style={{ color: "#4666AF", fontWeight: "600", textAlign: "center" }}>Ver grade de horários</Text>
        </TouchableOpacity>

        {/* Conceitos */}
        <TouchableOpacity
          style={{
            backgroundColor: "#fff",
            borderRadius: 8,
            padding: 16,
            marginBottom: 16,
            width: "48%",
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
          }}
         // onPress={() => navigation.navigate("Grades")}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#333", marginBottom: 8 }}>📚 Conceitos</Text>
          <Text style={{ fontSize: 14, color: "#666", marginBottom: 16 }}>Acompanhe suas notas e desempenho nas disciplinas.</Text>
          <Text style={{ color: "#4666AF", fontWeight: "600", textAlign: "center" }}>Ver meus conceitos</Text>
        </TouchableOpacity>

        {/* Disciplinas */}
        <TouchableOpacity style={{
          backgroundColor: "#fff",
          borderRadius: 8,
          padding: 16,
          marginBottom: 16,
          width: "48%",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#333", marginBottom: 8 }}>
            📘 Disciplinas <Text style={{ color: "#D9534F", fontWeight: "500" }}>WORK IN PROGRESS</Text>
          </Text>
          <Text style={{ fontSize: 14, color: "#666", marginBottom: 16 }}>Confira as disciplinas em que você está matriculado.</Text>
          <Text style={{ color: "#4666AF", fontWeight: "600", textAlign: "center" }}>Ver disciplinas</Text>
        </TouchableOpacity>

        {/* Acesso ao Canvas */}
        <TouchableOpacity style={{
          backgroundColor: "#fff",
          borderRadius: 8,
          padding: 16,
          marginBottom: 16,
          width: "48%",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#333", marginBottom: 8 }}>
            🖥️ Acesso ao Canvas <Text style={{ color: "#D9534F", fontWeight: "500" }}>WORK IN PROGRESS</Text>
          </Text>
          <Text style={{ fontSize: 14, color: "#666", marginBottom: 16 }}>Fique em dia com suas atividades e tarefas.</Text>
          <Text style={{ color: "#4666AF", fontWeight: "600", textAlign: "center" }}>Ver atividades</Text>
        </TouchableOpacity>

        {/* Calendário Escolar */}
        <TouchableOpacity style={{
          backgroundColor: "#fff",
          borderRadius: 8,
          padding: 16,
          marginBottom: 16,
          width: "48%",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#333", marginBottom: 8 }}>
            📅 Calendário Escolar <Text style={{ color: "#D9534F", fontWeight: "500" }}>WORK IN PROGRESS</Text>
          </Text>
          <Text style={{ fontSize: 14, color: "#666", marginBottom: 16 }}>Veja o calendário escolar e não perca nenhuma data importante.</Text>
          <Text style={{ color: "#4666AF", fontWeight: "600", textAlign: "center" }}>Ver calendário</Text>
        </TouchableOpacity>

        {/* Contato */}
        <TouchableOpacity style={{
          backgroundColor: "#fff",
          borderRadius: 8,
          padding: 16,
          marginBottom: 16,
          width: "48%",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
        }}>
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#333", marginBottom: 8 }}>
            📞 Contato <Text style={{ color: "#D9534F", fontWeight: "500" }}>WORK IN PROGRESS</Text>
          </Text>
          <Text style={{ fontSize: 14, color: "#666", marginBottom: 16 }}>Entre em contato com seus professores ou a administração.</Text>
          <Text style={{ color: "#4666AF", fontWeight: "600", textAlign: "center" }}>Ver informações de contato</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default StudentFeed;
