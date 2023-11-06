import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { View, StyleSheet, SafeAreaView, Text } from 'react-native';

import LandingScreen from './screens/LandingScreen';
import App from './App';

const Stack = createNativeStackNavigator();

function stackRouter() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Landing"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Landing">
          {props => <LandingScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="App">
          {props => <App {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default stackRouter;