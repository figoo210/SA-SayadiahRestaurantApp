import React, {useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import {styles} from "../../assets/styles";
import NavBar from "../../components/NavBar";
import {useAuth} from "../../services/AuthContext";
import CustomButton from "../../components/CustomButton";
import {Modal} from "react-native-paper";
import TextAreaField from "../../components/TextAreaField";
import {addOrUpdateRecord} from "../../services/database";

const TicketDetailsScreen = ({ route, navigation }) => {
    const { currentUser } = useAuth();
    // Extract the ticket ID from the navigation parameters
    const { ticket, status } = route.params;

    const [comment, setComment] = useState("");
    const [resolving, setResolving] = useState(false);
    const [escalating, setEscalating] = useState(false);

    const resolved = () => {
        setResolving(true);
    }

    const escalate = () => {
        setEscalating(true);
    }

    const resolveHandler = async () => {
        await addOrUpdateRecord('tickets', ticket.id, {...ticket, comment: comment, completed: true, pending: false, solvedBy: currentUser.name});
        setResolving(false);
        navigation.goBack();
    }

    const escalateHandler = async () => {
        await addOrUpdateRecord('tickets', ticket.id, {...ticket, comment: comment, completed: false, pending: false});
        setEscalating(false);
        navigation.goBack();
    }

    return (
        <View style={styles.listContainer}>
            <NavBar title={ticket.ticketType + "(Ticket)"} backButton={true} navigation={navigation} />

            <ScrollView style={styles.listScrollView}>
                <View style={styles.cardContent}>

                    <View style={styles.cardBorder}>
                        <Text style={styles.cardText}>Ticket type</Text>
                        <Text style={styles.cardInfo}>{ticket.ticketType}</Text>
                    </View>

                    <View style={styles.cardBorder}>
                        <Text style={styles.cardText}>Due date</Text>
                        <Text style={styles.cardInfo}>{new Date(ticket.dueDate?.seconds * 1000)?.toLocaleDateString()}</Text>
                    </View>

                    <View style={styles.cardBorder}>
                        <Text style={styles.cardText}>Description</Text>
                        <Text style={styles.cardInfo}>{ticket.description}</Text>
                    </View>

                    <View style={styles.cardBorder}>
                        <Text style={styles.cardText}>Attachment</Text>
                        {ticket.attachment ?
                            (<TouchableOpacity>
                                <Image
                                    src={ticket.attachment}
                                    style={{width: 100, height: 100}}
                                    source=""
                                />
                            </TouchableOpacity>) :
                            (<Text style={styles.cardInfo}>No Attachments</Text>)
                        }
                    </View>

                    <View style={styles.cardBorder}>
                        <Text style={styles.cardText}>Comments</Text>
                        <Text style={styles.cardInfo}>{ticket.comment ? ticket.comment : "No Comments"}</Text>
                    </View>

                    <View style={styles.cardBorder}>
                        <Text style={styles.cardText}>Status</Text>
                        <Text style={styles.cardInfo}>{!ticket.completed && !ticket.pending ? "Escalated" : status}</Text>
                    </View>

                    {ticket.solvedBy && <View style={styles.cardBorder}>
                        <Text style={styles.cardText}>Solved By</Text>
                        <Text
                            style={styles.cardInfo}>{ticket.solvedBy}</Text>
                    </View>}
                </View>
            </ScrollView>
            {currentUser.role === "Manager" && (!ticket.completed) && <CustomButton title={"Mark as resolved"} onPress={resolved}
                                                                                   secondary={false} fixed={true}/>}
            {currentUser.role === "Manager" && (!ticket.completed && ticket.pending) && <CustomButton title={"Escalate to supervisor"} onPress={escalate}
                                                                                                    secondary={true} fixed={true}/>}

            {/*Resolve Modal*/}
            <Modal
                animationType="slide"
                transparent={true}
                visible={resolving}
                onRequestClose={() => {
                    setResolving(false);
                }}
                children={
                    <View style={styles.actionModal}>
                        <Text style={styles.actionModalTitle}>Add Comment</Text>
                        <Text style={styles.actionModalText}>Resolving Comment</Text>
                        <TextAreaField onValueChange={setComment} value={comment} placeholder={"Comment"} />
                        <CustomButton title={"Add"} onPress={resolveHandler} secondary={false} />
                        <CustomButton title={"Skip"} onPress={resolveHandler} secondary={true} />
                    </View>
                }
            />
            {/*Escalate Modal*/}
            <Modal
                animationType="slide"
                transparent={true}
                visible={escalating}
                onRequestClose={() => {
                    setEscalating(false);
                }}
                children={
                    <View style={styles.actionModal}>
                        <Text style={styles.actionModalTitle}>Add Comment</Text>
                        <Text style={styles.actionModalText}>Escalating Comment</Text>
                        <TextAreaField onValueChange={setComment} value={comment} placeholder={"Comment"} />
                        <CustomButton title={"Add"} onPress={escalateHandler} secondary={false} />
                        <CustomButton title={"Skip"} onPress={escalateHandler} secondary={true} />
                    </View>
                }
            />
        </View>
    );
};

export default TicketDetailsScreen;
