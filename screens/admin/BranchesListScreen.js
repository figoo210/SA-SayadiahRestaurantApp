import React, {useCallback, useState} from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { List } from 'react-native-paper';
import NavBar from '../../components/NavBar';
import {useFocusEffect} from "@react-navigation/native";
import {getRecordsFromDB} from "../../services/database";

const BranchesListScreen = ({ navigation, getBranch }) => {
    const [branches, setBranches] = useState([]);
    useFocusEffect(useCallback(() => {
        const fetchData = async () => {
            const allData = await getRecordsFromDB("branches");
            const l = [];
            for (let i = 0; i < allData.length; i++) {
                const d = allData[i];
                if (!d.isDeleted) {
                    l.push(d);
                }
            }
            setBranches(l);
        };
        fetchData().catch(console.error);
    }, []));
    return (
        <View style={styles.container}>
            <NavBar title={"Branches"} backButton={false} navigation={navigation} />
            <List.Section>
                {branches && branches.map((b, index) => (
                    <List.Item
                        key={index}
                        title={b.branchName}
                        right={props => <List.Icon {...props} icon="chevron-right" />}
                        onPress={() => getBranch(b.id)}
                        style={styles.listItem}
                        titleStyle={styles.listItemTitle}
                    />
                ))}
            </List.Section>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    listItem: {
        backgroundColor: '#EEF3F4',
        marginVertical: 4,
        borderRadius: 5,
        borderWidth: 0,
        borderColor: 'transparent',
    },
    listItemTitle: {
        color: '#10515C',
    },
    // Add other styles from your styles.js file if necessary
});

export default BranchesListScreen;
