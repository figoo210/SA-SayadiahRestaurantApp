import React, {useRef, useState} from 'react';
import { View } from 'react-native';
import {styles} from "../assets/styles";
import {Text} from "react-native-paper";
import PhoneInput from "react-native-phone-number-input";


const PhoneNumberField = ({ onValueChange, getDialCode, getPhone, initValue, disable=false }) => {
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
                disabled={disable}
                ref={phoneInput}
                defaultValue={value || initValue}
                defaultCode="SA"
                layout="first"
                onChangeText={(text) => {
                    setValue(text);
                    checkPhoneValidation();
                    getPhone && getPhone(text);
                }}
                onChangeFormattedText={(text) => {
                    setFormattedValue(text);
                    onValueChange && onValueChange(text);
                    getDialCode && getDialCode(text);
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
