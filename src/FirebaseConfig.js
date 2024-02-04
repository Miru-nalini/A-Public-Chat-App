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
    apiKey: "AIzaSyCQXHS2-PePVxlbp4rVymzL4yR0BBfbpTg",
    authDomain: "publicchatapp-94200.firebaseapp.com",
    projectId: "publicchatapp-94200",
    storageBucket: "publicchatapp-94200.appspot.com",
    messagingSenderId: "522373785417",
    appId: "1:522373785417:web:c3577234ee165c0527dc98"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const fs = getFirestore(app);
export const st = getStorage(app);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})