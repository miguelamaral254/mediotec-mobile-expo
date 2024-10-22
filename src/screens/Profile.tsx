import { View, Text } from 'react-native';
import React from 'react';
import { User } from '../interfaces/userInterface';

interface ProfileProps {
  userData: User | null; // Define the props type
}

const Profile: React.FC<ProfileProps> = ({ userData }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", backgroundColor: "#fff", justifyContent: "center" }}>
      <Text style={{ fontSize: 22, fontWeight: "bold" }}>Profile</Text>
      {userData ? (
        <View style={{ marginTop: 20 }}>
          <Text>CPF: {userData.cpf}</Text>
          <Text>Parent CPF: {userData.parentCPF}</Text>
          <Text>Name: {userData.name}</Text>
          <Text>Email: {userData.email}</Text>
          <Text>Role: {userData.role}</Text>
          <Text>Active: {userData.active ? 'Yes' : 'No'}</Text>
          <Text>Birth Date: {userData.birthDate || 'N/A'}</Text>
          <Text>Phone: {userData.phone || 'N/A'}</Text>
          <Text>Registration: {userData.registration || 'N/A'}</Text>
          <Text>Address: {userData.address || 'N/A'}</Text>
          <Text>Student CPF: {userData.studentCPF || 'N/A'}</Text>
          <Text>Expertise Area: {userData.expertiseArea || 'N/A'}</Text>
          <Text>Academic Title: {userData.academicTitle || 'N/A'}</Text>
        </View>
      ) : (
        <Text>No user data available.</Text>
      )}
    </View>
  );
}

export default Profile;
