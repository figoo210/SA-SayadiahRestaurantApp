import React from 'react';
import { Button } from 'react-native-paper';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from "../assets/styles";

const IconSmallButton = ({ onPress, title, icon, disable=false }) => {
    return (
        <Button
            icon={({ size, color }) => (
                <View style={styles.iconWrapper}>
                    <Icon name={icon || "plus"} size={size} color={color} />
                </View>
            )}
            style={{...styles.iconSmallButton, opacity: disable ? 0.5 : 1}}
            labelStyle={styles.iconSmallButtonText}
            mode="contained"
            onPress={onPress}
            uppercase={false}
            disabled={disable}
        >
            {title}
        </Button>
    );
};

export default IconSmallButton;
