import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

import LottieView from 'lottie-react-native';


const Interests = ({ navigation }) => {
    const maxSelectedTopics = 10;
    const [availableTopics, setAvailableTopics] = useState([
        { id: 1, name: 'TV Shows' },
        { id: 2, name: 'Cartoons' },
        { id: 3, name: 'Art' },
        { id: 4, name: 'History' },
        { id: 5, name: 'Music' },
        { id: 6, name: 'Anime' },
        { id: 7, name: 'Literature' },
        { id: 8, name: 'Nature' },
        { id: 9, name: 'Memes' },
        { id: 10, name: 'Dance' },
        { id: 11, name: 'Movies' },
        { id: 12, name: 'K-Drama' },
        { id: 13, name: 'Oscars' },
        { id: 14, name: 'K-Pop' },
    ]);

    const [selectedTopics, setSelectedTopics] = useState([]);

    const handleTopicSelection = (topic) => {
        const isSelected = selectedTopics.some((selected) => selected.id === topic.id);
        const selectedTopicsCount = selectedTopics.length;
        if (isSelected) {
            setSelectedTopics((prevTopics) => prevTopics.filter((selected) => selected.id !== topic.id));
        } else {
            if (selectedTopicsCount < maxSelectedTopics) {
                setSelectedTopics((prevTopics) => [...prevTopics, topic]);
            } else {
                alert('You can only select up to 10 topics.');
            }
        }
    };
    const handleOkButton = () => {
        console.log(selectedTopics);
        navigation.navigate('Register', { selectedTopics });
    };

    const renderTopics = () => {

        return availableTopics.map((topic) => (

            <TouchableOpacity
                key={topic.id}
                style={[styles.topicButton, selectedTopics.some((selected) => selected.id === topic.id) && styles.selectedTopic]}
                onPress={() => handleTopicSelection(topic)}
            >
                <Text>{topic.name}</Text>
                <Text>{selectedTopics.some((selected) => selected.id === topic.id) ? ' x ' : ' + '}</Text>
            </TouchableOpacity>
        ));
    };

    return <View style={styles.container}>
        <View >
            <LottieView style={styles.interestsLottie} source={require("../../assets/interests.json")} autoPlay loop
                resizeMode='cover' speed={2} />
        </View>
        <Text>You can select maximum of 10 topics </Text>
        <View style={styles.renderContainer}>{renderTopics()}</View>
        <TouchableOpacity style={styles.okButton}
            onPress={handleOkButton}>
            <Text style={styles.okButtonText}>Ok</Text>
        </TouchableOpacity>

    </View>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#CED3FC',
        justifyContent: 'center',
        alignItems: 'center',
    },
    renderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8,
        width: width * 0.9,
        flexWrap: 'wrap'
    },
    topicButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        padding: 16,
        margin: 8,
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 15,
    },
    selectedTopic: {
        backgroundColor: 'lightblue',
    },
    okButton: {
        backgroundColor: "black",
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
        padding: 12,
        margin: 4,
        paddingHorizontal: 16

    },
    okButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    interestsLottie: {
        width: width * 0.9,
        height: height * 0.3,
    },
});

export default Interests;
