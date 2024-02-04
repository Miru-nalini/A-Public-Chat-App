import { ScrollView, StyleSheet, TouchableOpacity, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { addDoc, collection, getFirestore, onSnapshot } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { DocumentData } from 'firebase/firestore';
import GroupChat from './GroupChats/GroupChat';
import { useNavigation } from '@react-navigation/native';
const Groups = () => {

    const navigation = useNavigation();
    const [groupsCollectionRef, setGroupsCollectionRef] = useState(null);
    const [groups, setGroups] = useState([]);
    const fs = getFirestore();
    const user = getAuth().currentUser;
    useEffect(() => {

        const ref = collection(fs, 'groups');
        setGroupsCollectionRef(ref);

        const unsubscribe = onSnapshot(ref, (DocumentData) => {
            console.log('Current groups in database: ', DocumentData);
            const groupsData = DocumentData.docs.map((doc) => {
                return { id: doc.id, ...doc.data() };
            });

            setGroups(groupsData);
        });
        return unsubscribe;
    }, []);

    const goToChat = (groupId) => {

        navigation.navigate('GroupChat', { groupId });


    }

    const createGroup = async () => {
        console.log("create a group")
        try {
            await addDoc(groupsCollectionRef, {
                name: `Group #${Math.floor(Math.random() * 1000)}`,
                description: 'This is a chat group',
                creator: user.uid,
            })
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                {groups.map((group) => (
                    <TouchableOpacity
                        style={styles.groupChat}
                        key={group.id}
                        onPress={() => goToChat(group.id)}>
                        <View key={group.id}>
                            <Text>{group.name}</Text>
                            <Text>{group.description}</Text>
                        </View>
                    </TouchableOpacity>

                ))}
            </ScrollView>

            <TouchableOpacity style={styles.createButton} onPress={createGroup}>
                <Ionicons name='add' size={24} />
            </TouchableOpacity>


        </View>
    )
}

export default Groups

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 8,
        marginHorizontal: 4

    },
    createButton: {
        position: 'absolute',
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 20,
        backgroundColor: '#03a9f4',
        borderRadius: 50,
        elevation: 8,
    },
    groupChat: {
        padding: 16,
        backgroundColor: 'white',
        marginVertical: 4,
        marginHorizontal: 4,
        borderRadius: 15,
        elevation: 4
    }
})