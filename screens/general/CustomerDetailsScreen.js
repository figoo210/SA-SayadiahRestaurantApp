import React, {useState} from 'react';
import { View, Text, ScrollView } from 'react-native';
import {styles} from "../../assets/styles";
import NavBar from "../../components/NavBar";
import CustomButton from "../../components/CustomButton";
import {Modal} from "react-native-paper";

const CustomerDetailsScreen = ({ route, navigation }) => {
    // Extract the customer ID from the navigation parameters
    const { customer } = route.params;

    const [deleteModal, setDeleteModal] = useState(false);
    const deleteCustomer = () => {
        setDeleteModal(true);
    };
    const confirmDelete = () => {
        // Handle the deletion logic

        // Close the modal and go back or navigate as necessary
        setDeleteModal(false);
        navigation.goBack();
    };

    return (
        <View style={styles.listContainer}>
            <NavBar title={customer.name} backButton={true} navigation={navigation} />

            <ScrollView style={styles.listScrollView}>
                <View style={styles.cardContent}>

                    <View style={styles.cardBorder}>
                        <Text style={styles.cardText}>Customer Name</Text>
                        <Text style={styles.cardInfo}>{customer.name}</Text>
                    </View>

                    <View style={styles.cardBorder}>
                        <Text style={styles.cardText}>Customer Email</Text>
                        <Text style={styles.cardInfo}>{customer.email}</Text>
                    </View>

                    <View style={styles.cardBorder}>
                        <Text style={styles.cardText}>Customer Phone Number</Text>
                        <Text style={styles.cardInfo}>{`(${customer.dial_code}) ` + customer.phone}</Text>
                    </View>

                    <View style={styles.cardBorder}>
                        <Text style={styles.cardText}>Status</Text>
                        <Text style={styles.cardInfo}>{customer.is_blacklisted ? "Blacklisted" : "Whitelisted"}</Text>
                    </View>
                </View>
            </ScrollView>
            <CustomButton title={"Edit"} onPress={() => navigation.navigate('CustomerEditScreen')} secondary={false} fixed={true} />
            <CustomButton title={"Delete"} onPress={deleteCustomer} secondary={true} danger={true} fixed={true} />

            <Modal
                animationType="slide"
                transparent={true}
                visible={deleteModal}
                onRequestClose={() => {
                    setDeleteModal(false);
                }}
                children={
                    <View style={styles.actionModal}>
                        <Text style={styles.actionModalTitle}>Delete Customer</Text>
                        <Text style={styles.actionModalText}>Are you sure you want to delete customer ({customer.name})?</Text>
                        <CustomButton title={"Cancel"} onPress={() => setDeleteModal(false)} secondary={false} />
                        <CustomButton title={"Delete"} onPress={confirmDelete} secondary={true} danger={true} />
                    </View>
                }
            />
        </View>
    );
};

export default CustomerDetailsScreen;
