import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import {styles} from "../../assets/styles";
import NavBar from "../../components/NavBar";

const BillDetailsScreen = ({ route, navigation }) => {
    // Extract the bill ID from the navigation parameters
    const { bill, status } = route.params;

    return (
        <View style={styles.listContainer}>
            <NavBar title={bill.billType + " Bill"} backButton={true} navigation={navigation} />

            <ScrollView style={styles.listScrollView}>
                <View style={styles.cardContent}>

                    <View style={styles.cardBorder}>
                        <Text style={styles.cardText}>Bill type</Text>
                        <Text style={styles.cardInfo}>{bill.billType} bill</Text>
                    </View>

                    <View style={styles.cardBorder}>
                        <Text style={styles.cardText}>Due date</Text>
                        <Text style={styles.cardInfo}>{new Date(bill.dueDate?.seconds * 1000)?.toLocaleDateString()}</Text>
                    </View>

                    <View style={styles.cardBorder}>
                        <Text style={styles.cardText}>Monthly payment cycle</Text>
                        <Text style={styles.cardInfo}>{bill.paymentCycle}</Text>
                    </View>

                    <View style={styles.cardBorder}>
                        <Text style={styles.cardText}>Amount</Text>
                        <Text style={styles.cardInfo}>{bill.amount}</Text>
                    </View>

                    <View style={styles.cardBorder}>
                        <Text style={styles.cardText}>Payment history</Text>
                        <Text style={styles.cardInfo}>History</Text>
                    </View>

                    <View style={styles.cardBorder}>
                        <Text style={styles.cardText}>Status</Text>
                        <Text style={styles.cardInfo}>{status}</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default BillDetailsScreen;
