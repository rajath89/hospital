import * as React from 'react';
import { NavigationContainer ,DarkTheme} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './components/login';
import Signup from './components/signup';
import Dashboard from './components/dashboard';
import dashboardV2 from './components/dashboardV2';
import NewQues from './components/NewQues';
import AfterQuestions from './components/afterques';
import updatePro from './components/updatePro';
import viewPro from './components/viewPro';
import pdfViewer from './components/pdfviewer';
import Faqpage from './components/faqPage';
import MyDrawer from './components/drawnav';
import Diabetes from './components/learMaterials/diabetes';


import { Container, Button, text, ListItem, Text } from "native-base";
import Expo from "expo";
import Visit from './components/visithos';
import Icon from 'react-native-vector-icons/FontAwesome';






const Stack = createStackNavigator();



function MyStack() {



  return (
    <Stack.Navigator
      initialRouteName="Login"
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
       name="Cardio App" 
       component={dashboardV2} 
       options={
         { headerLeft: null }
        //  {headerLeft: () => (
        //    <Icon.Button name="gear" size={25} backgroundColor="#009387" onPress={()=>navigation.openDrawer()}></Icon.Button>
        //  )} 
       }
      />

       <Stack.Screen 
       name="Questions" 
       component={NewQues} 
      //  options={
      //    //{ title: 'Dashboard' },
      //    {headerLeft: null} 
      //  }
      />

             <Stack.Screen 
       name="BP & Lab reports" 
       component={AfterQuestions} 
      //  options={
      //    //{ title: 'Dashboard' },
      //    {headerLeft: null} 
      //  }
      />

<Stack.Screen 
       name="Update Profile" 
       component={updatePro} 
      //  options={
      //    //{ title: 'Dashboard' },
      //    {headerLeft: null} 
      //  }
      />
<Stack.Screen 
       name="View Profile" 
       component={viewPro} 
      //  options={
      //    //{ title: 'Dashboard' },
      //    {headerLeft: null} 
      //  }
      />
    

<Stack.Screen 
name="Learning Materials" 
component={pdfViewer} 
//  options={
//    //{ title: 'Dashboard' },
//    {headerLeft: null} 
//  }
/>

<Stack.Screen 
name="FAQ page" 
component={Faqpage} 
//  options={
//    //{ title: 'Dashboard' },
//    {headerLeft: null} 
//  }
/>

<Stack.Screen 
name="Message" 
component={Visit} 
 options={
   //{ title: 'Dashboard' },
   {headerLeft: null} 
 }
/>

<Stack.Screen 
name="Diabetes" 
component={Diabetes} 
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
  //theme={DarkTheme}
    <NavigationContainer>
      <MyStack />
     
    </NavigationContainer>
   
  );
}



