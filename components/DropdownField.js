import React from 'react';
import { Picker } from '@react-native-picker/picker';
import {styles} from "../assets/styles";
import {View} from "react-native";

const DropdownField = ({ selectedValue, onValueChange, items, placeholder, active=true, width }) => {
    return (
        <View style={!width ? styles.customFieldContainer : {...styles.customFieldContainer, width: width}}>
            <Picker
                dropdownIconColor="#10515C"
                style={styles.customField}
                selectedValue={selectedValue}
                onValueChange={onValueChange}
                enabled={active}
            >
                <Picker.Item
                    color={"#aaa"}
                    // enabled={false}
                    style={styles.pickerItem}
                    label={placeholder || "Select"}
                    value={placeholder}
                />
                {items && items.map((item, index) => (
                    <Picker.Item
                        style={styles.pickerItem}
                        key={index}
                        label={item.label}
                        value={item.value}
                    />
                ))}
            </Picker>
        </View>
    );
};

export default DropdownField;
