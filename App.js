import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthStore, unsub } from './src/store/AuthStore';
import AuthNavigator from './src/navigation/AuthNavigator';
import HomeNavigator from './src/navigation/HomeNavigator';

import { app } from './src/FirebaseConfig';
const Stack = createStackNavigator();

const App = () => {
  const { initialized, isLoggedIn } = AuthStore.useState();

  useEffect(() => {

    return () => unsub;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {
          isLoggedIn ?
            <Stack.Screen name="HomeNavigator" component={HomeNavigator} />
            :
            <Stack.Screen name="AuthNavigator" component={AuthNavigator} />

        }
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
