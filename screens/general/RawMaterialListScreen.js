// RawMaterialListScreen.js
import React, {useCallback, useState} from 'react';
import {View, ScrollView, TouchableOpacity, Text} from 'react-native';
import {List} from 'react-native-paper';
import { styles } from '../../assets/styles';
import NavBar from '../../components/NavBar';
import {getRecordsFromDB} from "../../services/database";
import CustomButton from "../../components/CustomButton";
import CustomCard from "../../views/CustomCard";
import {useFocusEffect} from "@react-navigation/native";
import {useAuth} from "../../services/AuthContext";

const RawMaterialListScreen = ({ navigation }) => {
    const { currentUser, loading } = useAuth();

    const [data, setData] = useState([]);
    const [activeStatusFilter, setActiveStatusFilter] = useState('Pending');

    const filterHandler = (status) => {
        setActiveStatusFilter(status);
    };

    useFocusEffect(useCallback(() => {
        const fetchData = async () => {
            const allData = await getRecordsFromDB("restocks");
            setData(allData);
        };

        fetchData().catch(console.error);
    }, []));

    return (
        <View style={styles.listContainer}>
            <NavBar title="Raw Material" backButton={true} navigation={navigation} />
            <ScrollView style={styles.listScrollView}>
                <List.Section>
                    {data.map((d, index) => activeStatusFilter === "Pending" ?  (
                        (d.pending || (!d.pending && !d.completed)) && <View key={index}>
                            <CustomCard obj={d} cardType={"Restock Order"} id={index} onPress={() => navigation.navigate("RawMaterialDetailsScreen", { data: d })} />
                        </View>
                    ) : (
                        d.completed && <View key={index}>
                            <CustomCard obj={d} cardType={"Restock Order"} id={index} />
                        </View>
                    ))}
                </List.Section>
            </ScrollView>
            <CustomButton title={"Add Restock Order"} onPress={() => navigation.navigate('RawMaterialAddScreen')} secondary={false} fixed={true}/>
        </View>
    );
};


export default RawMaterialListScreen;
