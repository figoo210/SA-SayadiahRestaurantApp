import React, { useState } from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import InputField from '../../components/InputField';
import CustomButton from '../../components/CustomButton';
import {styles} from "../../assets/styles";
import FlashMessage from "../../components/FlashMessage";
import {login} from "../../services/auth";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async () => {
        const response = await login(email, password);
        if (!response[0]) {
            setIsError(true);
            setErrorMessage(response[2]);
        } else {
            let user = response[1];
            navigation.navigate(`${user.role}HomeScreen`);
        }
    };

    return (
        <View style={styles.loginContainer}>
            <View style={styles.loginTitleContainer}>
                <Text style={styles.brandTitle}>Al Sayyadiah</Text>
                <Text style={styles.loginTitle}>Please login</Text>
            </View>
            {isError && <FlashMessage isError={true} message={errorMessage} />}
            <InputField
                placeholder="Email"
                value={email}
                onValueChange={setEmail}
            />
            <InputField
                placeholder="Password"
                value={password}
                onValueChange={setPassword}
                // Assuming your InputField supports secureTextEntry prop
                secureTextEntry
            />
            <CustomButton
                disable={(!email || email.length === 0 || !password || password.length === 0)}
                title="Login"
                onPress={handleLogin}
            />
            {/* a button for navigating to a registration screen */}
            <TouchableOpacity onPress={() => navigation.navigate('Register')} style={{ marginTop: 10 }}>
                <Text style={{ color: '#10515C' }}>Don't have an account? Register here</Text>
            </TouchableOpacity>


        </View>
    );
};


export default LoginScreen;
