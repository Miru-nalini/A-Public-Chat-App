// AuthStore.js
import { Store, registerInDevtools } from 'pullstate';
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    updateProfile,
} from 'firebase/auth';
import { auth } from '../FirebaseConfig';

export const AuthStore = new Store({
    isLoggedIn: false,
    initialized: false,
    user: null,
    loading: false,

});

const unsub = onAuthStateChanged(auth, (user) => {
    console.log('onAuthStateChange', user);
    AuthStore.update((store) => {
        store.user = user;
        store.isLoggedIn = user ? true : false;
        store.initialized = true;
    });
});

export const appSignIn = async (email, password) => {
    try {
        AuthStore.update((store) => {
            store.loading = true;
        });

        const resp = await signInWithEmailAndPassword(auth, email, password);
        AuthStore.update((store) => {
            store.user = resp.user;
            store.isLoggedIn = resp.user ? true : false;
            store.loading = false;
        });
        return { user: auth.currentUser };
    } catch (e) {
        AuthStore.update((store) => {
            store.loading = false;
        });
        return { error: e };
    }
};

export const appSignOut = async () => {
    try {
        await signOut(auth);
        AuthStore.update((store) => {
            store.user = null;
            store.isLoggedIn = false;
        });
        return { user: null };
    } catch (e) {
        return { error: e };
    }
};

export const appSignUp = async (email, password, displayName) => {
    try {
        AuthStore.update((store) => {
            store.loading = true;
        });

        const resp = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(resp.user, { displayName });

        AuthStore.update((store) => {
            store.user = auth.currentUser;
            store.isLoggedIn = true;
            store.loading = false;
        });

        return { user: auth.currentUser };
    } catch (e) {
        AuthStore.update((store) => {
            store.loading = false;
        });
        return { error: e };
    }
};

registerInDevtools({ AuthStore });
