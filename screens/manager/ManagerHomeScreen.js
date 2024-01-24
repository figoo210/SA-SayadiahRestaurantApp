import React from 'react';
import { View, Text, Button } from 'react-native';

function ManagerHomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: 300 }}>
            <Text>Home Screen</Text>
            <Text>Home Screen</Text>
            <Text>Home Screen</Text>
            <Button
                title="Go to Test"
                onPress={() => navigation.navigate('Test')}
            />
        </View>
    );
}

export default ManagerHomeScreen;
