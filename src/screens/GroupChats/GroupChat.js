import { Button, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimensions, KeyboardAvoidingView, FlatList, Platform } from 'react-native';
import React, { useLayoutEffect, useState } from 'react';
import { getFirestore, collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from 'firebase/firestore';
import { uploadBytes, ref, getDownloadURL, } from 'firebase/storage';
import { AuthStore } from '../../store/AuthStore';
import { fs } from '../../FirebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { st } from '../../FirebaseConfig';
import { Alert } from 'react-native';



const { height, width } = Dimensions.get('window');

const GroupChat = ({ route }) => {
    const { groupId } = route.params;
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const [media, setMedia] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [url, setUrl] = useState(null);
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setMedia(result.assets[0].uri);
        }
    };

    const uploadMedia = async () => {
        setUploading(true);

        try {
            const { uri } = await FileSystem.getInfoAsync(media);

            if (!uri) {
                throw new Error("Invalid file URI");
            }

            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    resolve(xhr.response);
                };
                xhr.onerror = (e) => {
                    reject(new TypeError("Network request failed"));
                };
                xhr.responseType = 'blob';
                xhr.open('GET', uri, true);
                xhr.send(null);
            });

            const filename = media.substring(media.lastIndexOf('/') + 1);
            const storageRef = ref(st, `groups/${groupId}/media/${filename}`);
            await uploadBytes(storageRef, blob);

            const mediaUrl = await getDownloadURL(storageRef);

            setUploading(false);
            Alert.alert("Media Uploaded!!!");
            setUrl(mediaUrl);
            setMedia(null);

        } catch (error) {
            console.error(error);
            setUploading(false);

        }
    };



    const sendMessage = async () => {
        const msg = message.trim();
        if (msg.length === 0) return;

        try {
            const msgCollectionRef = collection(fs, `groups/${groupId}/messages`);
            let mediaUrl = null;

            if (url) {
                mediaUrl = url;
            }

            await addDoc(msgCollectionRef, {
                message: msg,
                sender: user.uid,
                createdAt: serverTimestamp(),
                mediaUrl: url,
            });

            setMessage('');
            setMedia(null);

        } catch (error) {
            console.error(error);

        }
    };




    const user = AuthStore.useState((s) => s.user);

    useLayoutEffect(() => {
        const msgCollectionRef = collection(fs, `groups/${groupId}/messages`);
        const q = query(msgCollectionRef, orderBy('createdAt', 'asc'));
        const unsubscribe = onSnapshot(q, (documentSnapshot) => {
            const messages = documentSnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            console.log('Current messages database: ', messages);
            setMessages(messages);
        });
        return unsubscribe;
    }, [groupId]);



    const renderMessage = ({ item }) => {
        const myMessage = item.sender === user.uid;

        return (
            <View style={[styles.messageContainer, myMessage ? styles.myMessageContainer : styles.otherMessageContainer]}>
                {item.mediaUrl ? (

                    <View>
                        <Image source={{ uri: item.mediaUrl }} style={{ width: 200, height: 200, borderRadius: 8 }} />
                        <Text style={styles.time}>{item.createdAt?.toDate().toLocaleDateString()}</Text>
                    </View>
                ) : (

                    <View>
                        <Text style={styles.messageText}>{item.message}</Text>
                        <Text style={styles.time}>{item.createdAt?.toDate().toLocaleDateString()}</Text>
                    </View>
                )}
            </View>
        );
    };



    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={renderMessage}
            />
            <KeyboardAvoidingView behavior={Platform.OS === 'android' ? 'height' : 'padding'} keyboardVerticalOffset={100} style={{
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
            }}>


                <View style={styles.imageContainer}>
                    {media && <Image
                        source={{ uri: media }}
                        style={{ width: 300, height: 400 }} />
                    }
                    <TouchableOpacity
                        style={styles.uploadButton}
                        onPress={uploadMedia}
                    >
                        <Text>Send media</Text>
                    </TouchableOpacity>

                </View>


                <View style={styles.inputContainer}>
                    <TextInput
                        multiline
                        value={message}
                        style={styles.messageInput}
                        onChangeText={(text) => setMessage(text)}
                        placeholder='Type a message'
                    />
                    <TouchableOpacity style={styles.sendButton} onPress={pickImage}>
                        <Text >Media</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.sendButton}
                        onPress={sendMessage}
                        disabled={message === ''}
                    >
                        <Text>Send</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
};







const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        marginTop: 40,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: 10,
        width: width,
        backgroundColor: 'white',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    messageInput: {
        borderRadius: 25,
        borderColor: 'grey',
        width: '70%',
        borderWidth: 0.5,
        paddingHorizontal: 16,
        paddingVertical: 8
    },
    messageText: {
        fontSize: 14,
    },
    time: {
        fontSize: 9
    },
    messageContainer: {
        padding: 12,
        paddingHorizontal: 16,
        marginBottom: 4,
        borderRadius: 40,
        maxWidth: '80%',
        marginHorizontal: 15,
    },
    myMessageContainer: {
        backgroundColor: 'lightgreen',
        alignSelf: 'flex-end',
        alignItems: 'flex-end'

    },
    otherMessageContainer: {
        backgroundColor: 'white',
        alignSelf: 'flex-start',
        alignItems: 'flex-start'
    },
    uploadButton: {
        borderRadius: 8,
        padding: 16,
        backgroundColor: 'grey',
        alignItems: 'center',
        justifyContent: 'center',
        width: '30%'
    },
    imageContainer: {
        backgroundColor: "white",
        padding: 8,
        gap: 4,
        width: '100%',
        alignItems: 'center'
    }
});

export default GroupChat;
