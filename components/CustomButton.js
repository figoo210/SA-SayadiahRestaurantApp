import React, {useState} from 'react';
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {styles} from "../assets/styles";


const CustomButton = ({ onPress, title, secondary, danger, disable = false, fixed = false }) => {
    const [loadingButton, setLoadingButton] = useState(false);

    const onPressButton = async () => {
        if (disable) return;

        setLoadingButton(true);
        try {
            await onPress();
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingButton(false);
        }
    };

    let textColor = '#FFFFFF';
    let bgColor = '#10515C';
    if (secondary) {
        textColor = !danger ? '#10515C' : 'red';
        bgColor = '#FFFFFF';
    }

    return (
        <TouchableOpacity style={{
            ...styles.customButton,
            backgroundColor: bgColor,
            opacity: disable ? 0.5 : 1,
            position: fixed ? 'fixed' : 'relative',
            bottom: 20,
        }} onPress={onPressButton} disabled={disable}>
            <Text style={{...styles.customButtonText, color: textColor}}>{loadingButton ? <ActivityIndicator size="large" color="#bbb" /> : title}</Text>
        </TouchableOpacity>
    );
};

export default CustomButton;
