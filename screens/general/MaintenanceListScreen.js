// MaintenanceListScreen.js
import React, {useCallback, useState} from 'react';
import {View, ScrollView, TouchableOpacity, Text} from 'react-native';
import {List} from 'react-native-paper';
import { styles } from '../../assets/styles';
import NavBar from '../../components/NavBar';
import {getRecordsFromDB} from "../../services/database";
import CustomButton from "../../components/CustomButton";
import CustomCard from "../../views/CustomCard";
import {useAuth} from "../../services/AuthContext";
import {useFocusEffect} from "@react-navigation/native";

const MaintenanceListScreen = ({ navigation }) => {
    const { currentUser } = useAuth();

    const [data, setData] = useState([]);
    const [activeStatusFilter, setActiveStatusFilter] = useState('Pending');

    const filterHandler = (status) => {
        setActiveStatusFilter(status);
    };

    useFocusEffect(useCallback(() => {
        const fetchData = async () => {
            const allData = await getRecordsFromDB("maintenance");
            const l = [];
            for (let i = 0; i < allData.length; i++) {
                const d = allData[i];
                if (!d.isDeleted) {
                    l.push(d);
                }
            }
            setData(l);
        };
        fetchData().catch(console.error);
    }, [activeStatusFilter]));

    return (
        <View style={styles.listContainer}>
            <NavBar title="Maintenance" backButton={true} navigation={navigation} />
            <View style={styles.filterTabsContainer}>
                {["Pending", "Completed"].map((status) => (
                    <TouchableOpacity
                        key={status}
                        onPress={() => filterHandler(status)}
                        style={{
                            borderRadius: 25,
                            backgroundColor: activeStatusFilter === status ? "#10515C" : "#E8E8E8",
                            paddingVertical: 15,
                            paddingHorizontal: 50,
                        }}
                    >
                        <Text style={{ color: activeStatusFilter === status ? "#E8E8E8" : "#484848", }}>{status}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <ScrollView style={styles.listScrollView}>
                <List.Section>
                    {data.map((d, index) => (activeStatusFilter === "Pending" ?  (
                        (d.pending || (!d.pending && !d.completed)) && <View key={index}>
                            <CustomCard obj={d} status={activeStatusFilter} id={index} cardType={"Maintenance"}
                                        onPress={() => navigation.navigate('MaintenanceDetailsScreen', { maintenance: d, status: activeStatusFilter })} />
                        </View>
                    ) : (
                        d.completed && <View key={index}>
                            <CustomCard obj={d} status={activeStatusFilter} id={index}
                                        onPress={() => navigation.navigate('MaintenanceDetailsScreen', { maintenance: d, status: activeStatusFilter })} />
                        </View>
                    )))}
                </List.Section>
            </ScrollView>
            {currentUser.role === "Staff" && <CustomButton title={"Request Maintenance"} onPress={() => navigation.navigate('MaintenanceRequestScreen')}
                           secondary={false} fixed={true}/>}
        </View>
    );
};


export default MaintenanceListScreen;
