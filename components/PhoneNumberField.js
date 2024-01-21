import React, {useRef, useState} from 'react';
import { View } from 'react-native';
import {styles} from "../assets/styles";
import {Text} from "react-native-paper";
import PhoneInput from "react-native-phone-number-input";


const PhoneNumberField = ({ onValueChange }) => {
    const [value, setValue] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    const [valid, setValid] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const phoneInput = useRef(null);

    const checkPhoneValidation = () => {
        const checkValid = phoneInput.current?.isValidNumber(value);
        setShowMessage(true);
        setValid(checkValid ? checkValid : false);
    }

    return (
        <View>
            <PhoneInput
                ref={phoneInput}
                defaultValue={value}
                defaultCode="SA"
                layout="first"
                onChangeText={(text) => {
                    setValue(text);
                    checkPhoneValidation();
                }}
                onChangeFormattedText={(text) => {
                    setFormattedValue(text);
                    onValueChange && onValueChange(text);
                }}
                containerStyle={styles.customFieldContainer}
                textContainerStyle={styles.customField}
            />
            {/*{showMessage && value && value.length > 0 && (*/}
            {/*    <Text style={{color: valid ? `green` : `red`}}>Phone Number {value}  {valid ? `Valid` : `Invalid`}</Text>*/}
            {/*)}*/}
        </View>
    );
};

export default PhoneNumberField;
