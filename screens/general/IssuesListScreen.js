// IssuesListScreen.js
import React, {useCallback, useState} from 'react';
import {View, ScrollView, TouchableOpacity, Text} from 'react-native';
import {List} from 'react-native-paper';
import { styles } from '../../assets/styles';
import NavBar from '../../components/NavBar';
import {getRecordsFromDB} from "../../services/database";
import IssueCard from "../../views/IssueCard";
import CustomButton from "../../components/CustomButton";
import {useFocusEffect} from "@react-navigation/native";
import IssuesReportScreen from "./IssuesReportScreen";
import {useAuth} from "../../services/AuthContext";

const IssuesListScreen = ({ navigation }) => {
    const { currentUser } = useAuth();

    const [issues, setIssues] = useState([]);
    const [activeStatusFilter, setActiveStatusFilter] = useState('Pending');

    const filterIssues = (status) => {
        setActiveStatusFilter(status);
    };

    useFocusEffect(useCallback(() => {
        const fetchIssues = async () => {
            const allIssues = await getRecordsFromDB(`salesIssues`);
            // console.log("###: ", allIssues);
            setIssues(allIssues);
        };

        fetchIssues().catch(console.error);
    }, []));

    return (
        <View style={styles.listContainer}>
            <NavBar title={"Sales Issues"} backButton={true} navigation={navigation} />
            <View style={styles.filterTabsContainer}>
                {["Pending", "Solved"].map((status) => (
                    <TouchableOpacity
                        key={status}
                        onPress={() => filterIssues(status)}
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
                    {issues.map((issue, index) => activeStatusFilter === "Pending" ?  (
                        (issue.pending || (!issue.pending && !issue.completed)) && <View key={index}>
                            <IssueCard issue={issue} id={index + 1} onPress={() => navigation.navigate("IssueDetailsScreen", { issue: issue, status: activeStatusFilter })} />
                        </View>
                    ) : (
                        issue.completed && <View key={index}>
                            <IssueCard issue={issue} id={index + 1} onPress={() => navigation.navigate("IssueDetailsScreen", { issue: issue, status: activeStatusFilter })} />
                        </View>
                    ))}
                </List.Section>
            </ScrollView>
            {currentUser.role === "Staff" && <CustomButton title={"Report an Issue"} onPress={() => navigation.navigate('IssuesReportScreen')}
                           secondary={false} fixed={true}/>}
        </View>
    );
};


export default IssuesListScreen;
