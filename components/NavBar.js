// NavBar.js
import React from 'react';
import { Appbar } from 'react-native-paper';
import {styles} from "../assets/styles";
import {Image, Text, TouchableOpacity, View} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const NavBar = ({ title, backButton, navigation }) => {

    const handleBackPress = () => {
        if (backButton) {
            navigation.goBack();
        } else {
            navigation.navigate('AccountScreen');
        }
    };

    return (
        <View style={{ padding: 20, paddingTop: 50, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row', }}>
            <TouchableOpacity
                style={!backButton && { backgroundColor: "#EEF3F4", padding: 7, borderRadius: 8, }}
                onPress={handleBackPress}
            >
                {backButton ?
                    (<Text style={{ color: "#10515C", fontSize: 16 }} >Back</Text>)
                    : (<Icon name={"account"} size={28} color={"#10515C"}/>)
                }
            </TouchableOpacity>
            <Text style={styles.brandTitle}>{title}</Text>
            <TouchableOpacity><Icon name={"bell"} size={25} color={"#000"} /></TouchableOpacity>
        </View>
    );
};

export default NavBar;
