import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import GroupChat from '../screens/GroupChats/GroupChat';

import HomeTabs from './Tabs/HomeTabs';
import Settings from '../screens/Settings';

const Stack = createStackNavigator();

const HomeNavigator = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }} >
        <Stack.Screen name="HomeTabs" component={HomeTabs} />
        <Stack.Screen name="GroupChat" component={GroupChat} />
    </Stack.Navigator>
);

export default HomeNavigator;
