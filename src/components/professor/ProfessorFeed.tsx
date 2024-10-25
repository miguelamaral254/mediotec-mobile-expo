import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProfessorFeed = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#f3f4f6", padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", color: "#333", marginBottom: 16 }}>
        Painel do Professor
      </Text>
      <Text style={{ fontSize: 16, color: "#666", marginBottom: 16 }}>
        Bem-vindo à área do professor! Fique por dentro das novidades.
      </Text>

      {/* Banner de Avisos */}
      <View style={{ backgroundColor: "#BFDBFE", padding: 16, borderRadius: 8, marginBottom: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", color: "#B45309" }}>🚨 Avisos Importantes</Text>
        <Text style={{ marginTop: 8, color: "#333" }}>Fique atento aos comunicados da escola:</Text>
        <View style={{ marginTop: 8, paddingLeft: 8 }}>
          <Text style={{ color: "#333" }}>📅 Reunião de professores dia 12/10 às 17h.</Text>
          <Text style={{ color: "#333" }}>📝 Entrega de notas até o dia 25/10.</Text>
          <Text style={{ color: "#333" }}>📊 Formação continuada no dia 30/10.</Text>
        </View>
      </View>

      {/* Grid de funcionalidades */}
      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
        {/* Minhas Aulas */}
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
       //   onPress={() => navigation.navigate("Schedules")}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#333", marginBottom: 8 }}>🕒 Minhas Aulas</Text>
          <Text style={{ fontSize: 14, color: "#666", marginBottom: 16 }}>Confira sua grade de aula.</Text>
          <Text style={{ color: "#4666AF", fontWeight: "600", textAlign: "center" }}>Ver turmas</Text>
        </TouchableOpacity>

        {/* Conceitos dos Alunos */}
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
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#333", marginBottom: 8 }}>📚 Conceitos dos Alunos</Text>
          <Text style={{ fontSize: 14, color: "#666", marginBottom: 16 }}>Acompanhe o desempenho dos alunos em suas disciplinas.</Text>
          <Text style={{ color: "#4666AF", fontWeight: "600", textAlign: "center" }}>Ver conceitos</Text>
        </TouchableOpacity>

        {/* Plano de Aula */}
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
       //   onPress={() => navigation.navigate("LessonPlans")}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#333", marginBottom: 8 }}>
            📖 Plano de Aula <Text style={{ color: "#D9534F", fontWeight: "500" }}>WORK IN PROGRESS</Text>
          </Text>
          <Text style={{ fontSize: 14, color: "#666", marginBottom: 16 }}>Organize e visualize seus planos de aula.</Text>
          <Text style={{ color: "#4666AF", fontWeight: "600", textAlign: "center" }}>Ver planos</Text>
        </TouchableOpacity>

        {/* Acesso ao Canvas */}
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
         // onPress={() => navigation.navigate("Canvas")}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#333", marginBottom: 8 }}>
            🖥️ Acesso ao Canvas <Text style={{ color: "#D9534F", fontWeight: "500" }}>WORK IN PROGRESS</Text>
          </Text>
          <Text style={{ fontSize: 14, color: "#666", marginBottom: 16 }}>Mantenha-se atualizado sobre suas atividades e tarefas.</Text>
          <Text style={{ color: "#4666AF", fontWeight: "600", textAlign: "center" }}>Ver atividades</Text>
        </TouchableOpacity>

        {/* Calendário Escolar */}
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
         // onPress={() => navigation.navigate("Calendar")}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#333", marginBottom: 8 }}>
            📅 Calendário Escolar <Text style={{ color: "#D9534F", fontWeight: "500" }}>WORK IN PROGRESS</Text>
          </Text>
          <Text style={{ fontSize: 14, color: "#666", marginBottom: 16 }}>Veja o calendário escolar e não perca nenhuma data importante.</Text>
          <Text style={{ color: "#4666AF", fontWeight: "600", textAlign: "center" }}>Ver calendário</Text>
        </TouchableOpacity>

        {/* Contato */}
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
          //onPress={() => navigation.navigate("Contact")}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold", color: "#333", marginBottom: 8 }}>
            📞 Contato <Text style={{ color: "#D9534F", fontWeight: "500" }}>WORK IN PROGRESS</Text>
          </Text>
          <Text style={{ fontSize: 14, color: "#666", marginBottom: 16 }}>Entre em contato com a administração ou outros professores.</Text>
          <Text style={{ color: "#4666AF", fontWeight: "600", textAlign: "center" }}>Ver contato</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfessorFeed;
