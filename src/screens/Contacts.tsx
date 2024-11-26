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
    <View className="flex-1 bg-gray-100">
      <View className="bg-blue-500 p-6 rounded-b-lg shadow-md">
        <Text className="text-4xl font-bold text-white text-center">📞 Contatos</Text>
      </View>
      <ScrollView className="p-4" showsVerticalScrollIndicator={false}>
        {/* Coordenação */}
        <View className="bg-white p-6 mb-4 rounded-lg shadow-md">
          <Text className="text-3xl font-bold text-blue-600">Coordenação</Text>
          <TouchableOpacity
            className="flex-row items-center mt-4"
            onPress={() => openEmail('coordenacao@escola.com')}
          >
            <FontAwesome name="envelope" size={20} color="#EA4335" />
            <Text className="ml-3 text-lg text-gray-800">Email: coordenacao@escola.com</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center mt-3"
            onPress={() => openWhatsApp('5581987654321')}
          >
            <FontAwesome name="whatsapp" size={20} color="#25D366" />
            <Text className="ml-3 text-lg text-gray-800">WhatsApp: (81) 98765-4321</Text>
          </TouchableOpacity>
        </View>

        {/* Plantão Pedagógico */}
        <View className="bg-white p-6 mb-4 rounded-lg shadow-md">
          <Text className="text-3xl font-bold text-blue-600">Plantão Pedagógico</Text>
          <TouchableOpacity
            className="flex-row items-center mt-4"
            onPress={() => openEmail('pedagogico@escola.com')}
          >
            <FontAwesome name="envelope" size={20} color="#EA4335" />
            <Text className="ml-3 text-lg text-gray-800">Email: pedagogico@escola.com</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center mt-3"
            onPress={() => openWhatsApp('5581998877666')}
          >
            <FontAwesome name="whatsapp" size={20} color="#25D366" />
            <Text className="ml-3 text-lg text-gray-800">WhatsApp: (81) 99887-7666</Text>
          </TouchableOpacity>
        </View>

        {/* Plantão de Vendas */}
        <View className="bg-white p-6 mb-4 rounded-lg shadow-md">
          <Text className="text-3xl font-bold text-blue-600">Plantão de Vendas</Text>
          <TouchableOpacity
            className="flex-row items-center mt-4"
            onPress={() => openEmail('vendas@escola.com')}
          >
            <FontAwesome name="envelope" size={20} color="#EA4335" />
            <Text className="ml-3 text-lg text-gray-800">Email: vendas@escola.com</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center mt-3"
            onPress={() => openWhatsApp('5581912345678')}
          >
            <FontAwesome name="whatsapp" size={20} color="#25D366" />
            <Text className="ml-3 text-lg text-gray-800">WhatsApp: (81) 91234-5678</Text>
          </TouchableOpacity>
        </View>

        {/* Financeiro */}
        <View className="bg-white p-6 mb-4 rounded-lg shadow-md">
          <Text className="text-3xl font-bold text-blue-600">Financeiro</Text>
          <TouchableOpacity
            className="flex-row items-center mt-4"
            onPress={() => openEmail('financeiro@escola.com')}
          >
            <FontAwesome name="envelope" size={20} color="#EA4335" />
            <Text className="ml-3 text-lg text-gray-800">Email: financeiro@escola.com</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center mt-3"
            onPress={() => openWhatsApp('5581932165432')}
          >
            <FontAwesome name="whatsapp" size={20} color="#25D366" />
            <Text className="ml-3 text-lg text-gray-800">WhatsApp: (81) 93216-5432</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Contacts;