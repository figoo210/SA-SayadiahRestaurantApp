import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const FlashMessage = ({ message, isError = false }) => {
    return (
        <View style={{...styles.container, backgroundColor: isError ? '#FFCCCC' : '#CCFFCC'}}>
            <Text style={{textAlign: 'center', color: isError ? '#CC0000': '#009900'}}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
    },
});

export default FlashMessage;