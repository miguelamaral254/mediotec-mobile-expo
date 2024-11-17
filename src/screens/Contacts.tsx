import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Linking } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 

const Contacts: React.FC = () => {
  const openWhatsApp = (phoneNumber: string) => {
    const url = `https://wa.me/${phoneNumber}`;
    Linking.openURL(url).catch((err: Error) =>
      console.error('Erro ao abrir o WhatsApp:', err)
    );
  };

  const openEmail = (email: string) => {
    const url = `mailto:${email}`;
    Linking.openURL(url).catch((err: Error) =>
      console.error('Erro ao abrir o email:', err)
    );
  };

  return (
    <ScrollView className="flex-1 bg-gray-100 p-4">
      <Text className="text-2xl font-bold text-primary-color mb-4">📞 Contatos</Text>
      <Text className="text-base text-secondary-color mb-4">
        Aqui estão os contatos da equipe escolar para ajudá-lo.
      </Text>

      {/* Coordenação */}
      <View className="bg-white p-4 mb-4 rounded-lg shadow-md">
        <Text className="text-lg font-semibold text-primary-color">Coordenação</Text>
        <TouchableOpacity 
          className="flex-row items-center mt-2"
          onPress={() => openEmail('coordenacao@escola.com')}
        >
          <FontAwesome name="envelope" size={16} color="#FF6F61" />
          <Text className="text-sm text-blue-500 ml-2">Email: coordenacao@escola.com</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className="flex-row items-center mt-2"
          onPress={() => openWhatsApp('5511987654321')}
        >
          <FontAwesome name="whatsapp" size={16} color="#25D366" />
          <Text className="text-sm text-blue-500 ml-2">WhatsApp: (11) 98765-4321</Text>
        </TouchableOpacity>
      </View>

      {/* Plantão Pedagógico */}
      <View className="bg-white p-4 mb-4 rounded-lg shadow-md">
        <Text className="text-lg font-semibold text-primary-color">Plantão Pedagógico</Text>
        <TouchableOpacity 
          className="flex-row items-center mt-2"
          onPress={() => openEmail('pedagogico@escola.com')}
        >
          <FontAwesome name="envelope" size={16} color="#FF6F61" />
          <Text className="text-sm text-blue-500 ml-2">Email: pedagogico@escola.com</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className="flex-row items-center mt-2"
          onPress={() => openWhatsApp('5511998877666')}
        >
          <FontAwesome name="whatsapp" size={16} color="#25D366" />
          <Text className="text-sm text-blue-500 ml-2">WhatsApp: (11) 99887-7666</Text>
        </TouchableOpacity>
      </View>

      {/* Plantão de Vendas */}
      <View className="bg-white p-4 mb-4 rounded-lg shadow-md">
        <Text className="text-lg font-semibold text-primary-color">Plantão de Vendas</Text>
        <TouchableOpacity 
          className="flex-row items-center mt-2"
          onPress={() => openEmail('vendas@escola.com')}
        >
          <FontAwesome name="envelope" size={16} color="#FF6F61" />
          <Text className="text-sm text-blue-500 ml-2">Email: vendas@escola.com</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className="flex-row items-center mt-2"
          onPress={() => openWhatsApp('5511912345678')}
        >
          <FontAwesome name="whatsapp" size={16} color="#25D366" />
          <Text className="text-sm text-blue-500 ml-2">WhatsApp: (11) 91234-5678</Text>
        </TouchableOpacity>
      </View>

      {/* Financeiro */}
      <View className="bg-white p-4 mb-4 rounded-lg shadow-md">
        <Text className="text-lg font-semibold text-primary-color">Financeiro</Text>
        <TouchableOpacity 
          className="flex-row items-center mt-2"
          onPress={() => openEmail('financeiro@escola.com')}
        >
          <FontAwesome name="envelope" size={16} color="#FF6F61" />
          <Text className="text-sm text-blue-500 ml-2">Email: financeiro@escola.com</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className="flex-row items-center mt-2"
          onPress={() => openWhatsApp('5511932165432')}
        >
          <FontAwesome name="whatsapp" size={16} color="#25D366" />
          <Text className="text-sm text-blue-500 ml-2">WhatsApp: (11) 93216-5432</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Contacts;