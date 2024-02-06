// BillsListScreen.js
import React, {useEffect, useState} from 'react';
import {View, ScrollView, TouchableOpacity, Text} from 'react-native';
import {List} from 'react-native-paper';
import { styles } from '../../assets/styles';
import NavBar from '../../components/NavBar';
import {getRecordsFromDB} from "../../services/database";
import CustomButton from "../../components/CustomButton";
import CustomCard from "../../views/CustomCard";

const BillsListScreen = ({ navigation }) => {

    const [bills, setBills] = useState([]);
    const [activeStatusFilter, setActiveStatusFilter] = useState('Upcoming');

    const filterHandler = (status) => {
        setActiveStatusFilter(status);
    };

    useEffect(() => {
        const fetchData = async () => {
            const allData = await getRecordsFromDB("utilityBills");
            setBills(allData);
        };

        fetchData().catch(console.error);
    }, []);

    return (
        <View style={styles.listContainer}>
            <NavBar title="Utilities Bills" backButton={true} navigation={navigation} />
            <View style={styles.filterTabsContainer}>
                {["Overdue", "Upcoming", "Paid"].map((status) => (
                    <TouchableOpacity
                        key={status}
                        onPress={() => filterHandler(status)}
                        style={{
                            borderRadius: 25,
                            backgroundColor: activeStatusFilter === status ? "#10515C" : "#E8E8E8",
                            paddingVertical: 15,
                            paddingHorizontal: 25,
                        }}
                    >
                        <Text style={{ color: activeStatusFilter === status ? "#E8E8E8" : "#484848", }}>{status}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <ScrollView style={styles.listScrollView}>
                <List.Section>
                    {bills.map((bill, index) => {
                        if (activeStatusFilter === "Upcoming") {
                            if (!bill.paid && new Date(bill.dueDate?.seconds * 1000) >= new Date()) {
                                return <CustomCard id={index} key={index} status={"Upcoming"} obj={bill} onPress={() => navigation.navigate('BillDetailsScreen', { bill : bill, status: activeStatusFilter })} cardType={"Bill"} />
                            }
                        }

                        if (activeStatusFilter === "Overdue") {
                            if (!bill.paid && new Date(bill.dueDate?.seconds * 1000) < new Date()) {
                                return <CustomCard id={index} key={index} status={"Overdue"} obj={bill} onPress={() => navigation.navigate('BillDetailsScreen', { bill : bill, status: activeStatusFilter })} cardType={"Bill"} />
                            }
                        }

                        if (activeStatusFilter === "Paid") {
                            if (bill.paid) {
                                return <CustomCard id={index} key={index} status={"Upcoming"} obj={bill} onPress={() => navigation.navigate('BillDetailsScreen', { bill : bill, status: activeStatusFilter })} cardType={"Bill"} />
                            }
                        }
                    }
                    )}
                </List.Section>
            </ScrollView>
            <CustomButton title={"Add Bill"} onPress={() => navigation.navigate('AddBillScreen')} secondary={false} fixed={true} />
        </View>
    );
};

const getPriorityColor = (priority) => {
    switch (priority) {
        case 'High': return 'red';
        case 'Medium': return 'orange';
        case 'Low': return 'green';
        default: return 'grey';
    }
};
export default BillsListScreen;
