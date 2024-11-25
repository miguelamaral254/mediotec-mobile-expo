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
    <View className="flex-1 bg-gray-100 p-4">
      <Text className="text-4xl font-bold text-primary-color mb-4 mt-32">📞 Contatos</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
      {/* Coordenação */}
      <View className="bg-white p-4 mb-4 rounded-lg shadow-md">
        <Text className="text-3xl font-semibold">Coordenação</Text>
        <TouchableOpacity 
          className="flex-row items-center mt-2"
          onPress={() => openEmail('coordenacao@escola.com')}
        >
          <FontAwesome name="envelope" size={16} color="#EA4335" />
          <Text className="text-2x1 ml-2 font-bold">Email: coordenacao@escola.com</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className="flex-row items-center mt-2"
          onPress={() => openWhatsApp('5581987654321')}
        >
          <FontAwesome name="whatsapp" size={16} color="#25D366" />
          <Text className="text-2x1 ml-2 font-bold">WhatsApp: (81) 98765-4321</Text>
        </TouchableOpacity>
      </View>

      {/* Plantão Pedagógico */}
      <View className="bg-white p-4 mb-4 rounded-lg shadow-md">
        <Text className="text-3xl font-semibold">Plantão Pedagógico</Text>
        <TouchableOpacity 
          className="flex-row items-center mt-2"
          onPress={() => openEmail('pedagogico@escola.com')}
        >
          <FontAwesome name="envelope" size={16} color="#EA4335" />
          <Text className="text-2x1 ml-2 font-bold">Email: pedagogico@escola.com</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className="flex-row items-center mt-2"
          onPress={() => openWhatsApp('5581998877666')}
        >
          <FontAwesome name="whatsapp" size={16} color="#25D366" />
          <Text className="text-2x1 ml-2 font-bold">WhatsApp: (81) 99887-7666</Text>
        </TouchableOpacity>
      </View>

      {/* Plantão de Vendas */}
      <View className="bg-white p-4 mb-4 rounded-lg shadow-md">
        <Text className="text-3xl font-semibold">Plantão de Vendas</Text>
        <TouchableOpacity 
          className="flex-row items-center mt-2"
          onPress={() => openEmail('vendas@escola.com')}
        >
          <FontAwesome name="envelope" size={16} color="#EA4335" />
          <Text className="text-2x1 ml-2 font-bold">Email: vendas@escola.com</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className="flex-row items-center mt-2"
          onPress={() => openWhatsApp('5581912345678')}
        >
          <FontAwesome name="whatsapp" size={16} color="#25D366" />
          <Text className="text-2x1 ml-2 font-bold">WhatsApp: (81) 91234-5678</Text>
        </TouchableOpacity>
      </View>

      {/* Financeiro */}
      <View className="bg-white p-4 mb-4 rounded-lg shadow-md">
        <Text className="text-3xl font-semibold">Financeiro</Text>
        <TouchableOpacity 
          className="flex-row items-center mt-2"
          onPress={() => openEmail('financeiro@escola.com')}
        >
          <FontAwesome name="envelope" size={16} color="#EA4335" />
          <Text className="text-2x1 ml-2 font-bold">Email: financeiro@escola.com</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className="flex-row items-center mt-2"
          onPress={() => openWhatsApp('5581932165432')}
        >
          <FontAwesome name="whatsapp" size={16} color="#25D366" />
          <Text className="text-2x1 ml-2 font-bold">WhatsApp: (81) 93216-5432</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </View>
  );
};

export default Contacts;