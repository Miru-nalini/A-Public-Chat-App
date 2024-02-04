import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/Login';
import GetStarted from '../screens/GetStarted';
import Interests from '../screens/Interest';
import Register from '../screens/Register';
import HomeNavigator from './HomeNavigator';

const Stack = createStackNavigator();

const AuthNavigator = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="GetStarted" component={GetStarted} />
        <Stack.Screen name="Interest" component={Interests} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name='HomeNavigator' component={HomeNavigator} />
    </Stack.Navigator>
);

export default AuthNavigator;
