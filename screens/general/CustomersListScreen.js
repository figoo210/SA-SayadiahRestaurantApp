// CustomersListScreen.js
import React, {useCallback, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {List} from 'react-native-paper';
import { styles } from '../../assets/styles';
import NavBar from '../../components/NavBar';
import {getRecordsFromDB} from "../../services/database";
import CustomButton from "../../components/CustomButton";
import CustomCard from "../../views/CustomCard";
import {useFocusEffect} from "@react-navigation/native";
import {useAuth} from "../../services/AuthContext";

const CustomersListScreen = ({ navigation }) => {
    const { currentUser } = useAuth();

    const [customers, setCustomers] = useState([]);

    useFocusEffect(useCallback(() => {
        const fetchData = async () => {
            const allData = await getRecordsFromDB("customers");
            setCustomers(allData);
        };

        fetchData().catch(console.error);
    }, []));

    return (
        <View style={styles.listContainer}>
            <NavBar title="Customers" backButton={true} navigation={navigation} />
            <ScrollView style={styles.listScrollView}>
                <List.Section>
                    {customers.map((customer, index) =>
                        <View key={index}>
                            <CustomCard
                                obj={customer} id={index + 1}
                                onPress={() => navigation.navigate('CustomerDetailsScreen', { customer : customer })}
                            />
                        </View>
                    )}
                </List.Section>
            </ScrollView>
            {currentUser.role === "Staff" && <CustomButton title={"Add Customer"} onPress={() => navigation.navigate('CustomerAddScreen')}
                           secondary={false} fixed={true}/>}
        </View>
    );
};


export default CustomersListScreen;
