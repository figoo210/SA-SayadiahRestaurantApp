import React from "react";
import {TouchableOpacity, View} from "react-native";
import { TextInput } from 'react-native-paper';
import { DatePickerModal } from 'react-native-paper-dates';
import {styles} from "../assets/styles";

export default function DatePickerField({ placeholder, startYear, date, onValueChange }) {
    const [value, setValue] = React.useState("");
    const [open, setOpen] = React.useState(false);

    const onDismissSingle = React.useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    const onConfirmSingle = React.useCallback(
        (params) => {
            setOpen(false);
            onValueChange && onValueChange(params.date);
            setValue(params.date.toLocaleDateString());
        },
        [setOpen]
    );

    return (
        <View>
            <TouchableOpacity style={{...styles.customFieldContainer}} onPress={() => setOpen(true)}>
                <TextInput
                    label={placeholder || "Date"}
                    value={value}
                    style={styles.customField}
                    underlineColor="transparent"
                    editable={false}
                    right={<TextInput.Icon icon="calendar" color={value && value.length > 0 ? "#10515C" : "#484848"} />}
                />
            </TouchableOpacity>
            <DatePickerModal
                locale="en-GB"
                mode="single"
                visible={open}
                onDismiss={onDismissSingle}
                date={date}
                onConfirm={onConfirmSingle}
                presentationStyle="formSheet"
                startYear={startYear || 2024}
            />
        </View>
    )
}