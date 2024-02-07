// TicketsListScreen.js
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

const TicketsListScreen = ({ navigation }) => {
    const { currentUser } = useAuth();

    const [tickets, setTickets] = useState([]);
    const [activeStatusFilter, setActiveStatusFilter] = useState('Pending');

    const filterHandler = (status) => {
        setActiveStatusFilter(status);
    };

    useFocusEffect(useCallback(() => {
        const fetchData = async () => {
            const allData = await getRecordsFromDB("tickets");
            const l = [];
            for (let i = 0; i < allData.length; i++) {
                const d = allData[i];
                if (!d.isDeleted) {
                    if (currentUser.role === "Staff") {
                        if (d.createdBy === currentUser.email) {
                            l.push(d);
                        }
                    } else {
                        l.push(d);
                    }
                }
            }
            setTickets(l);
        };

        fetchData().catch(console.error);
    }, []));

    return (
        <View style={styles.listContainer}>
            <NavBar title="Tickets" backButton={true} navigation={navigation} />
            <View style={styles.filterTabsContainer}>
                {["Pending", "Solved"].map((status) => (
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
                    {tickets.map((ticket, index) => activeStatusFilter === "Pending" ?  (
                        (ticket.pending || (!ticket.pending && !ticket.completed)) && <View key={index}>
                            <CustomCard
                                obj={ticket} id={index + 1}
                                onPress={() => navigation.navigate(
                                    'TicketDetailsScreen',
                                    { ticket : ticket, status: !ticket.pending && !ticket.completed ? "Escalated" : activeStatusFilter })}
                                status={!ticket.pending && !ticket.completed ? "Escalated" : activeStatusFilter}
                                cardType={"Ticket"}
                            />
                        </View>
                    ) : (
                        ticket.completed && <View key={index}>
                            <CustomCard
                                obj={ticket} id={index + 1}
                                onPress={() => navigation.navigate('TicketDetailsScreen', { ticket : ticket, status: "Solved" })}
                                status={!ticket.pending && !ticket.completed ? "Escalated" : activeStatusFilter}
                                cardType={"Ticket"}
                            />
                        </View>
                    ))}
                </List.Section>
            </ScrollView>
            {currentUser.role === "Staff" && <CustomButton title={"Open a new ticket"} onPress={() => navigation.navigate('TicketAddScreen')}
                           secondary={false} fixed={true}/>}
        </View>
    );
};


export default TicketsListScreen;
