import React from 'react';
import { View, Text, ScrollView } from 'react-native';

const Contacts: React.FC = () => {
  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      <Text className="text-2xl font-bold text-primary-color mb-4">📞 Contatos</Text>
      <Text className="text-base text-secondary-color mb-4">
        Aqui estão os contatos de seus professores e da administração.
      </Text>
      {/* Adicione aqui as informações de contato, por exemplo: */}
      <View className="bg-white p-4 mb-4 rounded-lg shadow-md">
        <Text className="text-lg font-semibold text-primary-color">Professor de Matemática</Text>
        <Text className="text-sm text-secondary-color">Email: prof.mat@escola.com</Text>
        <Text className="text-sm text-secondary-color">Telefone: (11) 1234-5678</Text>
      </View>
      {/* Outros contatos podem ser listados aqui */}
    </ScrollView>
  );
};

export default Contacts;