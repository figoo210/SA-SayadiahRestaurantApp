import React, {useCallback, useState} from 'react';
import {View, Text, ScrollView, Dimensions} from 'react-native';
import {styles} from "../../assets/styles";
import NavBar from "../../components/NavBar";
import {useAuth} from "../../services/AuthContext";
import {useFocusEffect} from "@react-navigation/native";
import {getRecordsFromDB} from "../../services/database";
import CustomButton from "../../components/CustomButton";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


const deviceWidth = Dimensions.get('window').width;
const starSize = deviceWidth * 0.04;


const EmployeeDetailsScreen = ({ route, navigation }) => {
    // Extract the customer ID from the navigation parameters
    const { user } = route.params;
    const { currentUser } = useAuth();

    const [userReviews, setUserReviews] = useState([]);
    const [avgRating, setAvgRating] = useState(0.0);

    useFocusEffect(useCallback(() => {
        const fetchData = async () => {
            const allData = await getRecordsFromDB("userReviews");
            const filteredData = allData.filter(d =>
                !d.isDeleted &&
                user.email === d.userEmail
            );
            setUserReviews(filteredData);
            // Get AVG
            const rates = [];
            for (let i = 0; i < filteredData.length; i++) {
                const r = filteredData[i];
                rates.push(r.rate);
            }
            const sum = rates.reduce((accumulator, currentValue) => {
                return accumulator + currentValue;
            }, 0);
            setAvgRating(sum/rates.length);
        };
        fetchData().catch(console.error);
    }, []));

    return (
        <View style={styles.listContainer}>
            <NavBar title={user.name} backButton={true} navigation={navigation} />

            <ScrollView style={styles.listScrollView}>
                <View style={styles.cardContent}>

                    <View style={styles.cardBorder}>
                        <Text style={styles.cardText}>Employee Name</Text>
                        <Text style={styles.cardInfo}>{user.name}</Text>
                    </View>

                    <View style={styles.cardBorder}>
                        <Text style={styles.cardText}>Average rating</Text>
                        <Text style={styles.cardInfo}>{avgRating} <Icon name={'star'} size={starSize} color={'#FDCC0D'} /> ({userReviews.length} rating/s)</Text>
                    </View>

                </View>

                <Text style={{...styles.cardTitleHomeScreen, textAlign: "left"}} >Reviews</Text>

                <View style={styles.cardContent}>

                    {userReviews.length === 0 && <Text style={styles.cardInfo}>No reviews yet</Text>}
                    {userReviews.map((ur, index) => (
                        <View style={styles.cardBorder} key={index}>
                            <Text style={styles.cardText}>Manager ({ur.createdByName})</Text>
                            <Text style={styles.cardText}>{ur.review}</Text>
                            <Text style={styles.cardText}>{ur.rate}.0 <Icon name={'star'} size={starSize} color={'#FDCC0D'} /></Text>
                        </View>
                    ))}

                </View>
            </ScrollView>

            <CustomButton title={"Rate"} onPress={() => navigation.navigate('EmployeeRateScreen', { user: user })} secondary={false} fixed={true}/>

        </View>
    );
};

export default EmployeeDetailsScreen;
