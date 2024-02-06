import React, {useState} from 'react';
import { View, Text, ScrollView } from 'react-native';
import {styles} from "../../assets/styles";
import NavBar from "../../components/NavBar";
import CustomButton from "../../components/CustomButton";
import {Modal} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const RawMaterialDetailsScreen = ({ route, navigation }) => {
    // Extract the customer ID from the navigation parameters
    const { data } = route.params;

    return (
        <View style={styles.listContainer}>
            <NavBar title={data.item} backButton={true} navigation={navigation} />

            <ScrollView style={styles.listScrollView}>
                <View style={styles.cardContent}>

                    <View style={styles.cardBorder}>
                        <Text style={styles.cardText}>Raw material</Text>
                        <Text style={styles.cardInfo}>{data.item}</Text>
                    </View>

                    <View style={styles.cardBorder}>
                        <Text style={styles.cardText}>Current stock</Text>
                        <Text style={styles.cardInfo}>{data.quantity} {data.unit}</Text>
                    </View>

                    <View style={styles.cardBorder}>
                        <Text style={styles.cardText}>Last restock date</Text>
                        <Text style={styles.cardInfo}>{new Date(data.dueDate?.seconds * 1000)?.toLocaleDateString()}</Text>
                    </View>

                    <View style={styles.cardBorder}>
                        <Text style={styles.cardText}>Last restocked by</Text>
                        <Text style={styles.cardInfo}>{data.staffName}</Text>
                    </View>

                </View>

                <Text style={{...styles.cardTitleHomeScreen, textAlign: "left"}} >Restock History</Text>

                <View style={styles.cardContent}>

                    <Text style={styles.cardInfo}>No history yet</Text>
                    {/*{dataReviews.map((ur, index) => (*/}
                    {/*    <View style={styles.cardBorder} key={index}>*/}
                    {/*        <Text style={styles.cardText}>Manager ({ur.createdByName})</Text>*/}
                    {/*        <Text style={styles.cardText}>{ur.review}</Text>*/}
                    {/*        <Text style={styles.cardText}>{ur.rate}.0 <Icon name={'star'} size={starSize} color={'#FDCC0D'} /></Text>*/}
                    {/*    </View>*/}
                    {/*))}*/}

                </View>
            </ScrollView>

        </View>
    );
};

export default RawMaterialDetailsScreen;
