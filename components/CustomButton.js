import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import {styles} from "../assets/styles";


const CustomButton = ({ onPress, title, secondary, disable = false }) => {
    let textColor = '#FFFFFF';
    let bgColor = '#10515C';
    if (secondary) {
        textColor = '#10515C';
        bgColor = '#FFFFFF';
    }
    return (
        <TouchableOpacity style={{...styles.customButton, backgroundColor: bgColor, opacity: disable ? 0.5 : 1}} onPress={onPress} disabled={disable}>
            <Text style={{...styles.customButtonText, color: textColor}}>{title}</Text>
        </TouchableOpacity>
    );
};

export default CustomButton;
