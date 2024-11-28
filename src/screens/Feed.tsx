import React from 'react';
import { View, Text } from 'react-native';
import StudentFeed from '../components/student/StudentFeed';
import ParentFeed from '../components/parent/ParentFeed';
import { User } from '../interfaces/userInterface';
import { SchoolClass } from '../interfaces/schoolClassInterface';
import StudentFeedRoutes from '../routes/StudentFeedRoutes';
import { Notification } from '../interfaces/notificationInterface';
import ParentFeedRoutes from '../routes/ParentFeedRoutes';

interface FeedProps {
  userData: User | null;
  schoolClasses: SchoolClass[] | null; 
  notifications: Notification[];
  role: 'STUDENT' | 'ADMIN' | 'PROFESSOR' | 'PARENT';
}

const Feed: React.FC<FeedProps> = ({ userData, role, schoolClasses, notifications }) => {
  const renderContent = () => {
    switch (role) {
      case 'STUDENT':
        return <StudentFeedRoutes userData={userData} schoolClasses={schoolClasses} notifications={notifications} />;
      case 'PARENT':
        return <ParentFeedRoutes userData={userData} />;
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