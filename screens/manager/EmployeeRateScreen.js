// EmployeeRateScreen.js
import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import { Provider } from 'react-native-paper';
import {styles} from "../../assets/styles";
import NavBar from "../../components/NavBar";
import CustomButton from "../../components/CustomButton";
import {useAuth} from "../../services/AuthContext";
import {addRecordToDB} from "../../services/database";
import TextAreaField from "../../components/TextAreaField";
import RatingField from "../../components/RatingField";

const EmployeeRateScreen = ({ navigation, route }) => {
    const { currentUser } = useAuth();
    const { user } = route.params;

    const [rate, setRate] = useState(0);
    const [review, setReview] = useState('');

    const addRate = async () => {
        const req = {
            userName: user.name,
            userEmail: user.email,
            rate: rate,
            review: review,
            createdBy: currentUser.email,
            createdByName: currentUser.name,
            createdAt: new Date(),
            isDeleted: false,
        };

        await addRecordToDB("userReviews", req);
        navigation.goBack();
    }

    return (
        <Provider>
            <View style={styles.listContainer}>
                <NavBar title={"Rate " + user.name} backButton={true} navigation={navigation} />

                <ScrollView style={styles.listScrollView}>
                    <RatingField title={"Rating"} onRatingChange={setRate} initialRating={rate} />
                    <TextAreaField placeholder={"Review"} value={review} onValueChange={setReview} />
                </ScrollView>
                <CustomButton title={"Add"} onPress={addRate} secondary={false} fixed={true} disable={!rate || !review} />
                <CustomButton title={"Cancel"} onPress={navigation.goBack} secondary={true} fixed={true} />
            </View>
        </Provider>
    );
};


export default EmployeeRateScreen;
