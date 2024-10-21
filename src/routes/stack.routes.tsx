import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../screens/Profile';

const Stack = createStackNavigator();


const StackRoutes = () => {
  return (
   <Stack.Navigator screenOptions={{headerShown:false}}>
    <Stack.Screen name="home"
    component={Profile}
    
    />
   </Stack.Navigator>
  )
}

export default StackRoutes