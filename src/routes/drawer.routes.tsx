import React from 'react'
import {Feather} from "@expo/vector-icons"
import { createDrawerNavigator } from '@react-navigation/drawer'
import TabRoutes from './tab.routes';
import StackRoutes from './stack.routes';

const Drawer = createDrawerNavigator();
const teste = 2;

const DrawerRoutes = () => {
  return (
   <Drawer.Navigator>
    <Drawer.Screen name="home"
    component={TabRoutes}
    options={{
        drawerIcon:({color, size}) => <Feather name="home"  color={color} size={size} />,
        drawerLabel: 'Início'
    }}
    />

  {
    teste === 1 ? (
      <Drawer.Screen name="profile"
      component={StackRoutes}
      options={{
          drawerIcon:({color, size}) => <Feather name="user"  color={color} size={size} />,
          drawerLabel: 'Meu perfil'
      }}
      />

    )
     
  : (
    <Drawer.Screen name="profile"
    component={StackRoutes}
    options={{
        drawerIcon:({color, size}) => <Feather name="user"  color={color} size={size} />,
        drawerLabel: 'test if'
    }}
    />

  )
 

  }

  
   </Drawer.Navigator>
  )
}

export default DrawerRoutes