import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import dashboard from './dashboard';
import CameraComponent from './Camera';
import Fire from './fire';

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

      <Tab.Navigator>
        <Tab.Screen name="Home" component={dashboard} />
        <Tab.Screen name="Upload" component={CameraComponent} />
        <Tab.Screen name="Settings" component={Fire} />
      </Tab.Navigator>

  );
}