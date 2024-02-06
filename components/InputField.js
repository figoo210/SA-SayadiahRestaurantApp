import React, {useState} from 'react';
import { View } from 'react-native';
import {styles} from "../assets/styles";
import {TextInput} from "react-native-paper";

const InputField = ({ placeholder, value, onValueChange, onFocus, password=false, icon = null, width }) => {
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisibility(!passwordVisibility);
    };

    return (
        <View style={!width ? styles.customFieldContainer : {...styles.customFieldContainer, width: width}}>
            <TextInput
                secureTextEntry={password ? !passwordVisibility : false}
                right={password ?
                    <TextInput.Icon
                        icon={passwordVisibility ? "eye" : "eye-off"}
                        onPress={togglePasswordVisibility}
                    /> :
                    (icon && <TextInput.Icon
                        icon={icon}
                    />)
                }
                style={styles.customField}
                label={placeholder || "Input Text"}
                underlineColor="transparent"
                activeUnderlineColor="#aaa"
                value={value}
                onChangeText={onValueChange}
                activeOutlineColor="transparent"
                outlineColor="transparent"
                onFocus={onFocus}
            />
        </View>
    );
};

export default InputField;
