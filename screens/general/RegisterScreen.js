import React, { useState } from 'react';
import {View, Text, Alert, TouchableOpacity} from 'react-native';
import InputField from '../../components/InputField';
import CustomButton from '../../components/CustomButton';
import {styles} from "../../assets/styles";
import {signup} from "../../services/auth";
import {getOneRecordFromDB} from "../../services/database";
import FlashMessage from "../../components/FlashMessage";

const RegisterScreen = ({ navigation }) => {
    const [step, setStep] = useState(1); // Step 1 for branch code, Step 2 for registration

    const [branchCode, setBranchCode] = useState('');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const verifyBranchCode = () => {
        let branchSplit = branchCode.split("-");
        if (branchSplit[0] === "M" || branchSplit[0] === "E") {
            getOneRecordFromDB('branches', branchSplit[1]).then((record) => {
                if (record[0]) {
                    setRole(branchSplit[0] === "M" ? "Manager" : "Staff");
                    setStep(2);
                } else {
                    Alert.alert("Invalid Branch Code", "The branch code entered is invalid. Please try again.");
                }
            });
        } else {
            Alert.alert("Invalid Branch Code", "The branch code entered is invalid. Please try again.");
        }
    };

    const handleRegistration = async () => {
        const response = await signup(name, email, password, branchCode.split("-")[1], role);
        console.log(response);
        if (!response[0]) {
            setIsError(true);
            setErrorMessage(response[2].split(":")[1] || response[2]);
        } else {
            setIsError(false);
            let user = response[1];
            navigation.navigate(`${user.role}HomeScreen`);
        }
    };

    return (
        <View style={styles.loginContainer}>
            {step === 1 ? (
                <>
                    <View style={styles.loginTitleContainer}>
                        <Text style={styles.brandTitle}>Al Sayyadiah</Text>
                        <Text style={styles.loginTitle}>Enter Branch Code</Text>
                    </View>
                    <InputField
                        placeholder="Branch Code"
                        value={branchCode}
                        onValueChange={setBranchCode}
                    />
                    <CustomButton
                        title="Verify"
                        onPress={verifyBranchCode}
                        disable={!branchCode || branchCode.length === 0}
                    />
                </>
            ) : (
                <>
                    <View style={styles.loginTitleContainer}>
                        <Text style={styles.brandTitle}>Al Sayyadiah</Text>
                        <Text style={styles.loginTitle}>Register</Text>
                    </View>
                    {isError && <FlashMessage isError={true} message={errorMessage} />}
                    <InputField
                        placeholder="Name"
                        value={name}
                        onValueChange={setName}
                    />
                    <InputField
                        placeholder="Email"
                        value={email}
                        onValueChange={setEmail}
                    />
                    <InputField
                        placeholder="Password"
                        value={password}
                        onValueChange={setPassword}
                        secureTextEntry
                    />
                    <CustomButton
                        title="Register"
                        onPress={handleRegistration}
                        disable={!name || name.length === 0 || !email || email.length === 0 || !password || password.length === 0 }
                    />
                </>
            )}
            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ marginTop: 10 }}>
                <Text style={{ color: '#10515C' }}>Back to login</Text>
            </TouchableOpacity>

        </View>
    );
};

export default RegisterScreen;
