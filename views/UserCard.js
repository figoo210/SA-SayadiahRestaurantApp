import React, {useCallback, useState} from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import {styles} from "../assets/styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {useFocusEffect} from "@react-navigation/native";
import {getRecordsFromDB} from "../services/database";


const deviceWidth = Dimensions.get('window').width;
const starSize = deviceWidth * 0.04;


const UserCard = ({ obj, onPress, avgRating }) => {

    return (
        <TouchableOpacity onPress={onPress} style={styles.styleCard}>
            <View style={{ flex: 4 }} >
                <View style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'row',
                }}>
                    <Text style={styles.issueNumber}>{obj.name}</Text>
                </View>

                <Text style={styles.issueCardTitle}>{avgRating} <Icon name={'star'} size={starSize} color={'#FDCC0D'} /></Text>
            </View>
            <View style={{ flex: 1 }}><Text><Icon name={"arrow-right"} color={"#aaa"} size={starSize} /></Text></View>
        </TouchableOpacity>
    );
};


export default UserCard;
