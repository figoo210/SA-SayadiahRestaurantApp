import React from 'react';
import { View } from 'react-native';
import {styles} from "../assets/styles";
import {TextInput} from "react-native-paper";

const TextAreaField = ({ placeholder, value, onValueChange }) => {

    return (
        <View style={styles.customFieldContainer}>
            <TextInput
                style={styles.customField}
                label={placeholder || "Notes"}
                underlineColor="transparent"
                activeUnderlineColor="#aaa"
                value={value}
                onChangeText={onValueChange}
                activeOutlineColor="transparent"
                outlineColor="transparent"
                multiline={true}
                rows={3}
            />
        </View>
    );
};

export default TextAreaField;
