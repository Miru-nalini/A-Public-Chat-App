import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, StyleSheet, Pressable } from 'react-native';
import Groups from "../../screens/Groups";
import Discover from "../../screens/Discover";
import { Ionicons } from '@expo/vector-icons';
const Tab = createBottomTabNavigator();

const HomeTabs = () => (
    <View style={styles.container}>
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Groups') {
                        iconName = focused ? 'people-circle' : 'people-circle-outline';
                    } else if (route.name === 'Discover') {
                        iconName = focused ? 'search' : 'search-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })
            }
        >
            <Tab.Screen name="Groups" component={Groups} />
            <Tab.Screen name="Discover" component={Discover} />
        </Tab.Navigator>

        <Pressable style={styles.logoutButton}>
            <Text>LogOut</Text>
        </Pressable>
    </View>
);
const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    logoutButton: {
        position: 'absolute',
        top: 45,
        right: 20,
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
    },
});

export default HomeTabs;
