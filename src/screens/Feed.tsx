import React from 'react';
import { View, Text } from 'react-native';
import StudentFeed from '../components/student/StudentFeed';
import ParentFeed from '../components/parent/ParentFeed';
import { User } from '../interfaces/userInterface';
import { SchoolClass } from '../interfaces/schoolClassInterface';
import StudentFeedRoutes from '../routes/StudentFeedRoutes';

interface FeedProps {
  userData: User | null;
  schoolClass: SchoolClass | null; 

  role: 'STUDENT' | 'ADMIN' | 'PROFESSOR' | 'PARENT';
}

const Feed: React.FC<FeedProps> = ({ userData, role ,schoolClass}) => {
  const renderContent = () => {
    switch (role) {
      case 'STUDENT':
        return <StudentFeedRoutes userData={userData} schoolClass={schoolClass} />;
      case 'PROFESSOR':
        return <ParentFeed userData={userData} />;
      case 'ADMIN':
        return (
          <WelcomeMessage title="Professor Feed" subtitle="Bem-vindo, Professor!" />
        );
      case 'PARENT':
        return <ParentFeed userData={userData} />;
      default:
        return null; 
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {renderContent()}
    </View>
  );
};

// Define the prop types for WelcomeMessage
interface WelcomeMessageProps {
  title: string;
  subtitle: string;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ title, subtitle }) => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <Text style={{ fontSize: 22, fontWeight: "bold" }}>{title}</Text>
    <Text style={{ fontSize: 16 }}>{subtitle}</Text>
  </View>
);

export default Feed;