import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Feather } from "@expo/vector-icons";

const LogoutButton: React.FC<{ onLogout: () => void }> = ({ onLogout }) => (
  <View style={{ padding: 16 }}>
    <TouchableOpacity onPress={onLogout} style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Feather name="log-out" size={20} />
      <Text style={{ marginLeft: 8 }}>Logout</Text>
    </TouchableOpacity>
  </View>
);

export default LogoutButton;
