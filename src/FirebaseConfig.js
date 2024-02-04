// Import the functions you need from the SDKs you need
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const fs = getFirestore(app);
export const st = getStorage(app);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})
