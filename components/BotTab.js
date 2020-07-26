import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import dashboard from './dashboard';
import CameraComponent from './Camera';
import Fire from './fire';

import mulImUp from './mulImUp';
import profile from './profile';
import Comments from './comments';

import Icon from 'react-native-vector-icons/FontAwesome';

// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Home!</Text>
//     </View>
//   );
// }

// function SettingsScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Settings!</Text>
//     </View>
//   );
// }

const Tab = createBottomTabNavigator();

export default function BotTab() {
  return (

      <Tab.Navigator
      screenOptions={({ route }) => ({
          tabBarIcon: ({  size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'home';
            }
             else if (route.name === 'Comment') {
              iconName = 'tag';
            } 
            else if (route.name === 'Profile') {
              iconName = 'user';
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={22} color="#3740FE"/>;
          },
        })}
        

      >
        <Tab.Screen name="Home" component={dashboard}
        listeners={{
          tabPress: e => {
            // Prevent default action
            //e.preventDefault();
            console.log("home.................")
          }
        }}
        />
        <Tab.Screen name="Profile" component={profile} />
        <Tab.Screen name="Comment" component={Comments} />
   
      </Tab.Navigator>

  );
}