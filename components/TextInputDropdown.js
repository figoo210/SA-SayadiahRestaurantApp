import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Menu, Button } from 'react-native-paper';
import InputField from "./InputField";

const TextInputDropdown = ({ options, placeholder, onValueChange, value }) => {
    const [visible, setVisible] = useState(false);
    const [filteredOptions, setFilteredOptions] = useState(options);

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const selectOption = (option) => {
        onValueChange(option);
        closeMenu();
    };

    const filterOptions = (inputText) => {
        const filtered = options.filter(option =>
            option.toLowerCase().includes(inputText.toLowerCase())
        );
        setFilteredOptions(filtered);
    };

    const handleTextChange = (inputText) => {
        onValueChange(inputText);
        filterOptions(inputText);
        if (!visible) openMenu(); // Keep the menu open while typing
    };

    return (
        <View>
            <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={
                    <InputField value={value} placeholder={placeholder || "Add / Select"} onValueChange={handleTextChange} onFocus={openMenu} icon={"menu-down"} />
                }>
                {filteredOptions.map((option, index) => (
                    <Menu.Item
                        key={index}
                        title={option}
                        onPress={() => selectOption(option)}
                    />
                ))}
            </Menu>
        </View>
    );
};

export default TextInputDropdown;
