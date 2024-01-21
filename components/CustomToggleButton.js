import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

// Calculate dimensions relative to the screen size
const screenWidth = Dimensions.get('window').width;
const buttonWidth = screenWidth * 0.13; // Adjust size relative to screen width
const buttonHeight = buttonWidth * 0.55; // Maintain aspect ratio
const borderRadius = buttonHeight / 2; // Circular border
const indicatorSize = buttonHeight * 0.7; // Indicator size relative to button height

const CustomToggleButton = () => {
    const [isEnabled, setIsEnabled] = useState(false);

    const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

    return (
        <TouchableOpacity
            onPress={toggleSwitch}
            style={{
                width: buttonWidth,
                height: buttonHeight,
                borderRadius: borderRadius,
                backgroundColor: isEnabled ? '#10515C' : '#C1C1C1',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
            }}
        >
            <View
                style={{
                    width: indicatorSize,
                    height: indicatorSize,
                    borderRadius: indicatorSize / 2,
                    marginLeft: isEnabled ? 'auto' : 2, // Move indicator based on toggle state
                    marginRight: isEnabled ? 2 : 'auto',
                    backgroundColor: '#FFFFFF',
                }}
            >
            </View>
        </TouchableOpacity>
    );
};

export default CustomToggleButton;
