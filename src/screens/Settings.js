import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { appSignOut } from '../store/AuthStore';

const Settings = ({ navigation }) => {
    const handleLogout = async () => {
        try {
            const result = await appSignOut();
            if (!result.error) {
                navigation.navigate('Login');
            } else {
                console.error(result.error);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>
            <Button title="Logout" onPress={handleLogout} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default Settings;
