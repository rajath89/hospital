import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './components/login';
import Signup from './components/signup';
import Dashboard from './components/dashboard';
import dashboardV2 from './components/dashboardV2';
import NewQues from './components/NewQues';

import { Container, Button, text, ListItem, Text } from "native-base";
import Expo from "expo";






const Stack = createStackNavigator();



function MyStack() {



  return (
    <Stack.Navigator
      initialRouteName="Signup"
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#3740FE',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen 
        name="Signup" 
        component={Signup} 
        options={{ title: 'Signup' }}
      />       
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={
          {title: 'Login'},
          {headerLeft: null} 
        }
      />
      <Stack.Screen 
       name="Dashboard" 
       component={dashboardV2} 
      //  options={
      //    //{ title: 'Dashboard' },
      //    {headerLeft: null} 
      //  }
      />

       <Stack.Screen 
       name="Questions" 
       component={NewQues} 
      //  options={
      //    //{ title: 'Dashboard' },
      //    {headerLeft: null} 
      //  }
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
  
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
   
  );
}
