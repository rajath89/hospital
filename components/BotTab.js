import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import dashboard from './dashboard';
import CameraComponent from './Camera';
import Fire from './fire';

import mulImUp from './mulImUp';

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
            } else if (route.name === 'Info') {
              iconName = 'tag';
            } else if (route.name === 'Upload') {
              iconName = 'rocket';
            }

            // You can return any component that you like here!
            return <Icon name={iconName} size={22} color="#3740FE"/>;
          },
        })}

      >
        <Tab.Screen name="Home" component={dashboard}/>
        <Tab.Screen name="Upload" component={CameraComponent} />
        <Tab.Screen name="Info" component={Fire} />
      </Tab.Navigator>

  );
}