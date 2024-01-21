import React from 'react';
import { View } from 'react-native';
import {styles} from "../assets/styles";
import {TextInput} from "react-native-paper";

const InputField = ({ placeholder, value, onValueChange }) => {

    return (
        <View style={styles.customFieldContainer}>
            <TextInput
                style={styles.customField}
                label={placeholder || "Input Text"}
                underlineColor="transparent"
                activeUnderlineColor="#aaa"
                value={value}
                onChangeText={onValueChange}
                activeOutlineColor="transparent"
                outlineColor="transparent"
            />
        </View>
    );
};

export default InputField;
