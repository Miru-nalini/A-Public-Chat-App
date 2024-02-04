// src/screens/RegisterScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Dimensions } from 'react-native';
import { appSignUp } from '../store/AuthStore';
import LottieView from 'lottie-react-native';
import { fs } from '../FirebaseConfig';
import { doc, setDoc } from 'firebase/firestore';


const { width, height } = Dimensions.get('window');

const RegisterScreen = ({ route, navigation }) => {
    const { selectedTopics } = route.params;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    //const loading = useStoreState((state) => state.AuthStore.loading);

    const createProfile = async (user) => {
        console.log("Profile creation");
        try {
            const docRef = doc(fs, 'users', user.uid);


            await setDoc(docRef, {
                interests: selectedTopics,
                username: name,
                email: user.email,

            });

            console.log("Profile created successfully");
            navigation.navigate('HomeNavigator');
        } catch (error) {
            console.error("Error creating profile:", error);
        }
    };


    const handleRegister = async () => {
        try {
            const result = await appSignUp(email, password, name);

            if (!result.error) {

                const user = result.user;
                createProfile(user);
            } else {

                console.error(result.error);

            }
        } catch (error) {
            console.error("Error registering user:", error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 28 }}>Enter details to</Text>
            <Text style={{ fontSize: 28 }}>Register</Text>
            <KeyboardAvoidingView behavior='padding'>
                <View style={styles.registerContainer}>
                    <TextInput
                        placeholder="Your name"
                        value={name}
                        onChangeText={(text) => setName(text)}
                        style={styles.registerInput}
                    />
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        keyboardType="email-address"
                        style={styles.registerInput}
                    />
                    <TextInput
                        placeholder="Password"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry
                        style={styles.registerInput}
                    />

                    <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
                        <Text style={styles.registerButtonText}>Register</Text>
                    </TouchableOpacity>

                </View>
            </KeyboardAvoidingView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FCCAEE',
        alignItems: 'center',
        justifyContent: 'center'
    },
    registerContainer: {
        marginTop: 50,
        width: width * 0.9,
        alignItems: 'center',
        justifyContent: 'center'
    },
    registerInput: {
        borderRadius: 10,
        borderWidth: 0.5,
        width: '70%',
        height: 48,
        margin: 4,
        paddingHorizontal: 8
    },
    registerButton: {
        backgroundColor: "black",
        borderRadius: 10,
        width: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        margin: 4,
        paddingHorizontal: 16
    },
    registerButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    loadingLottie: {
        height: height * 0.1,
        width: width * 0.1,
    },
});

export default RegisterScreen;
