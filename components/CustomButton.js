import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import {styles} from "../assets/styles";


const CustomButton = ({ onPress, title, secondary }) => {
    let textColor = '#FFFFFF';
    let bgColor = '#10515C';
    if (secondary) {
        textColor = '#10515C';
        bgColor = '#FFFFFF';
    }
    return (
        <TouchableOpacity style={{...styles.customButton, backgroundColor: bgColor}} onPress={onPress}>
            <Text style={{...styles.customButtonText, color: textColor}}>{title}</Text>
        </TouchableOpacity>
    );
};

export default CustomButton;
