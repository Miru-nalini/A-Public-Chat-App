import { StyleSheet, TouchableOpacity, Modal, Text, KeyboardAvoidingView, View, Dimensions } from 'react-native'
import { React, useState } from 'react';
import { getFormatedDate } from 'react-native-modern-datepicker';
import DatePicker from 'react-native-modern-datepicker'
import LottieView from 'lottie-react-native';
const { width, height } = Dimensions.get('window');
const GetStarted = ({ navigation }) => {

    const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
    const today = new Date();
    const startDate = getFormatedDate(today.setDate(today.getDate() + 1), 'DD/MM/YYYY');
    const [selectedStartDate, setSelectedStartDate] = useState(startDate);
    const [startedDate, setStartedDate] = useState("");


    function handleChangeStartDate(propDate) {
        setStartedDate(propDate)

    }

    function handleSubmit() {
        navigation.navigate("Interest")

    }

    const handleOnPressStartDate = () => {
        setOpenStartDatePicker(!openStartDatePicker);
    }


    return (
        <View style={styles.container}>
            <View >
                <LottieView style={styles.helloLottie} source={require("../../assets/helloAnimation.json")} autoPlay loop
                    resizeMode='cover' speed={2} />
            </View>
            <Text style={styles.hellotext}>Hello There,</Text>
            <Text style={styles.hellotext}>Happy to have you onboard!</Text>
            <KeyboardAvoidingView style={styles.dateInputContainer}>
                <View style={styles.dateInputContainer}>
                    <Text style={{ fontSize: 20, }}>Enter your Date of Birth</Text>
                    <TouchableOpacity style={styles.dateInput}
                        onPress={handleOnPressStartDate}>
                        <Text > {selectedStartDate}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.submitDate}
                        onPress={handleSubmit}
                    >
                        <Text style={{ color: 'white' }}> Submit</Text>
                    </TouchableOpacity>
                    <Modal
                        animationType='slide'
                        transparent={true}
                        visible={openStartDatePicker} >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <DatePicker
                                    mode="calendar"
                                    minimumDate={startDate}
                                    selected={startedDate}
                                    onDateChange={handleChangeStartDate}
                                    onSelectedChange={date => setSelectedStartDate(date)}
                                    options={{
                                        backgroundColor: '#090C08',
                                        textHeaderColor: '#FFA25B',
                                        textDefaultColor: '#F6E7C1',
                                        selectedTextColor: '#fff',
                                        mainColor: '#F4722B',
                                        textSecondaryColor: '#D6C7A1',
                                        borderColor: 'rgba(122, 146, 165, 0.1)',
                                    }}

                                    minuteInterval={30}
                                    style={{ borderRadius: 10 }}
                                />
                                <TouchableOpacity
                                    onPress={handleOnPressStartDate}>
                                    <Text style={{ color: 'white' }}>Close</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </Modal>


                </View>

            </KeyboardAvoidingView>
        </View>
    )
}

export default GetStarted

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        backgroundColor: '#FAF1D4',
        justifyContent: 'center',
        alignItems: 'center'
    },
    hellotext: {
        fontSize: 32,
    },
    helloLottie: {
        height: height * 0.5,
        width: width * 0.9,
    },
    dateInputContainer: {
        marginTop: 8,
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%'
    },
    dateInput: {
        width: '60%',
        borderRadius: 10,
        borderWidth: 0.8,
        margin: 8,
        marginTop: 16,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16

    },
    submitDate: {
        backgroundColor: "black",
        borderRadius: 10,
        width: '40%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        paddingHorizontal: 16,
        margin: 4,
        paddingHorizontal: 16

    },
    centeredView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalView: {
        margin: 20,
        backgroundColor: '#080516',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        padding: 36,
        width: '90%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
});