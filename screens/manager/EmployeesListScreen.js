// EmployeesListScreen.js
import React, {useCallback, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {List} from 'react-native-paper';
import { styles } from '../../assets/styles';
import NavBar from '../../components/NavBar';
import {getRecordsFromDB} from "../../services/database";
import {useAuth} from "../../services/AuthContext";
import {useFocusEffect} from "@react-navigation/native";
import UserCard from "../../views/UserCard";
import InputField from "../../components/InputField";

const EmployeesListScreen = ({ navigation }) => {
    const { currentUser } = useAuth();

    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useFocusEffect(useCallback(() => {
        const fetchData = async () => {
            const allData = await getRecordsFromDB("users");
            const filteredData = allData.filter(d =>
                !d.isDeleted &&
                currentUser.branchCode === d.branchCode &&
                currentUser.email !== d.email &&
                d.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            const readyData = [];
            for (let i = 0; i < filteredData.length; i++) {
                const fd = filteredData[i];
                const rData = await getRecordsFromDB("userReviews");
                const filteredRData = rData.filter(d => !d.isDeleted && fd.email === d.userEmail);
                const rates = [];
                for (let j = 0; j < filteredRData.length; j++) {
                    const r = filteredRData[j];
                    rates.push(r.rate);
                }
                const sum = rates.reduce((accumulator, currentValue) => {
                    return accumulator + currentValue;
                }, 0);
                fd.avgRating = sum/rates.length || 0;
                readyData.push(fd);
            }
            setData([...readyData].sort((a, b) => b.avgRating - a.avgRating));
        };
        fetchData().catch(console.error);
    }, [searchQuery]));

    return (
        <View style={styles.listContainer}>
            <NavBar title="Employees" backButton={true} navigation={navigation} />
            <View style={{ paddingHorizontal: 20 }}>
                <InputField placeholder={"Search"} value={searchQuery} onValueChange={setSearchQuery} />
            </View>
            <ScrollView style={styles.listScrollView}>
                <List.Section>
                    {data.map((d, index) => <View key={index}>
                            <UserCard obj={d} avgRating={d.avgRating} onPress={() => navigation.navigate('EmployeeDetailsScreen', { user: d })} />
                        </View>
                    )}
                </List.Section>
            </ScrollView>
        </View>
    );
};


export default EmployeesListScreen;
