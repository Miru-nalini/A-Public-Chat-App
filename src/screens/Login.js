import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { useStoreState, useStores, useStoreActions } from 'pullstate';
import { appSignIn } from '../store/AuthStore';
import LottieView from 'lottie-react-native';

const { height, width } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');






    const handleLogin = async () => {

        navigation.navigate('HomeNavigator');

    };

    const handleGetStarted = () => {
        navigation.navigate('GetStarted');
    };

    return (
        <View style={styles.container}>
            <View style={{ marginTop: 100 }}>
                <LottieView
                    style={styles.loginLottie}
                    source={require('../../assets/login.json')}
                    resizeMode='cover'
                    speed={2}
                    autoPlay
                    loop
                />
            </View>
            <Text style={{ fontSize: 32, marginTop: 70 }}>Already a user?</Text>
            <KeyboardAvoidingView behavior='padding'>
                <View style={styles.loginContainer}>
                    <TextInput
                        style={styles.loginInput}
                        placeholder='Email'
                        keyboardType="email-address"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <TextInput
                        style={styles.loginInput}
                        placeholder='Password'
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />

                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                        <Text style={styles.loginButtonText}>Login</Text>
                    </TouchableOpacity>

                </View>
            </KeyboardAvoidingView>
            <View style={styles.bottomContainer}>
                <Text style={{ fontSize: 16 }}>Not Registered yet? </Text>
                <TouchableOpacity style={styles.getStartedButton} onPress={handleGetStarted}>
                    <Text style={styles.getStartedText}>Let's Get Started!</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LoginScreen;


const styles = StyleSheet.create({
    container: {
        width: width,
        height: height,
        flex: 1,
        paddingVertical: 100,
        alignItems: 'center',
        backgroundColor: '#F5ACB0'
    },
    loginContainer: {
        width: width,
        marginTop: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginInput: {
        width: '80%',
        height: 48,
        margin: 4,
        padding: 8,
        paddingHorizontal: 16,
        borderColor: '#000',
        borderRadius: 16,
        borderWidth: 0.8,
    },
    loginButton: {
        width: '30%',
        margin: 8,
        paddingHorizontal: 16,
        padding: 12,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 24,
    },
    loginButtonText: {
        color: "#fff"
    },
    loginLottie: {
        height: height * 0.2,
        width: width * 0.9,
    },
    getStartedButton: {
        margin: 8,
        paddingHorizontal: 28,
        padding: 16,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 24,
    },
    getStartedText: {
        color: "#fff"
    },
    bottomContainer: {
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center'
    }
})