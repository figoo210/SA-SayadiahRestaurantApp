import React from 'react';
import { View } from 'react-native';
import { Button, Text, Card } from 'react-native-paper';
import {useAuth} from "../../services/AuthContext";
import NavBar from "../../components/NavBar";
import {styles} from "../../assets/styles";
import CustomButton from "../../components/CustomButton";

const AccountScreen = ({ navigation }) => {
    const { currentUser, logout } = useAuth();

    const handleChangePassword = () => {
        // Implement change password functionality
        console.log('Change Password');
    };

    const handleLogout = () => {
        console.log("Logging out....")
        logout().catch((e) => console.error(e));
        // navigation.navigate("Login");
    };

    return (
        <View style={styles.containerHomeScreen}>
            <NavBar title={"Account Info"} navigation={navigation} backButton={true} />
            <View style={styles.listScrollView}>

                <View style={styles.cardBorder}>
                    <Text style={styles.cardText}>User Name</Text>
                    <Text style={styles.cardInfo}>{currentUser?.name}</Text>
                </View>

                <View style={styles.cardBorder}>
                    <Text style={styles.cardText}>User Email</Text>
                    <Text style={styles.cardInfo}>{currentUser?.email}</Text>
                </View>
            </View>
            <CustomButton title={"Change Password"} secondary={true} danger={true} onPress={handleChangePassword} fixed={true} />
            <CustomButton title={"Logout"} secondary={false} onPress={handleLogout} fixed={true} />
        </View>
    );
};

export default AccountScreen;
