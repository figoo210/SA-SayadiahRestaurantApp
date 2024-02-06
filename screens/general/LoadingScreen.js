// LoadingScreen.js
import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';

const LoadingScreen = ({ message = "Loading..." }) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.message}>{message}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent background
    },
    message: {
        marginTop: 20,
        color: '#ffffff',
    },
});

export default LoadingScreen;
