import React, {useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import {styles} from "../../assets/styles";
import NavBar from "../../components/NavBar";
import CustomButton from "../../components/CustomButton";
import {useAuth} from "../../services/AuthContext";
import {Modal} from "react-native-paper";
import TextAreaField from "../../components/TextAreaField";
import {addOrUpdateRecord} from "../../services/database";

const IssueDetailsScreen = ({ route, navigation }) => {
    const { currentUser } = useAuth();
    // Extract the ticket ID from the navigation parameters
    const { issue, status } = route.params;

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
        await addOrUpdateRecord('salesIssues', issue.id, {...issue, comment: comment, completed: true, pending: false, solvedBy: currentUser.name});
        setResolving(false);
        navigation.goBack();
    }

    const escalateHandler = async () => {
        await addOrUpdateRecord('salesIssues', issue.id, {...issue, comment: comment, completed: false, pending: false});
        setEscalating(false);
        navigation.goBack();
    }

    return (
        <View style={styles.listContainer}>
            <NavBar title={issue.id} backButton={true} navigation={navigation} />

            <ScrollView style={styles.listScrollView}>
                <View style={styles.cardContent}>

                    <View style={styles.cardBorder}>
                        <Text style={styles.cardText}>Issue type</Text>
                        <Text style={styles.cardInfo}>{issue.issueType}</Text>
                    </View>

                    <View style={styles.cardBorder}>
                        <Text style={styles.cardText}>Issue date</Text>
                        <Text style={styles.cardInfo}>{new Date(issue.issueDate?.seconds * 1000)?.toLocaleDateString()}</Text>
                    </View>

                    {issue.orderNumber && <View style={styles.cardBorder}>
                        <Text style={styles.cardText}>Order number</Text>
                        <Text
                            style={styles.cardInfo}>{issue.orderNumber}</Text>
                    </View>}

                    {issue.product && <View style={styles.cardBorder}>
                        <Text style={styles.cardText}>Product</Text>
                        <Text
                            style={styles.cardInfo}>{issue.product}</Text>
                    </View>}

                    {issue.quantity && <View style={styles.cardBorder}>
                        <Text style={styles.cardText}>Quantity</Text>
                        <Text
                            style={styles.cardInfo}>{issue.quantity + " " + issue.unit}</Text>
                    </View>}

                    {issue.orderDetails && <View style={styles.cardBorder}>
                        <Text style={styles.cardText}>Order details</Text>
                        <Text
                            style={styles.cardInfo}>{issue.orderDetails}</Text>
                    </View>}

                    <View style={styles.cardBorder}>
                        <Text style={styles.cardText}>Submitted By</Text>
                        <Text style={styles.cardInfo}>{issue.staffName}</Text>
                    </View>

                    <View style={styles.cardBorder}>
                        <Text style={styles.cardText}>Notes</Text>
                        <Text style={styles.cardInfo}>{issue.notes}</Text>
                    </View>

                    <View style={styles.cardBorder}>
                        <Text style={styles.cardText}>Attachment</Text>
                        {issue.attachment ?
                            (<TouchableOpacity>
                                <Image
                                    src={issue.attachment}
                                    style={{width: 100, height: 100}}
                                    source=""
                                />
                            </TouchableOpacity>) :
                            (<Text style={styles.cardInfo}>No Attachments</Text>)
                        }
                    </View>

                    <View style={styles.cardBorder}>
                        <Text style={styles.cardText}>Comments</Text>
                        <Text style={styles.cardInfo}>{issue.comment ? issue.comment : "No Comments"}</Text>
                    </View>

                    <View style={styles.cardBorder}>
                        <Text style={styles.cardText}>Status</Text>
                        <Text style={styles.cardInfo}>{!issue.completed && !issue.pending ? "Escalated" : status}</Text>
                    </View>

                    {issue.solvedBy && <View style={styles.cardBorder}>
                        <Text style={styles.cardText}>Solved By</Text>
                        <Text
                            style={styles.cardInfo}>{issue.solvedBy}</Text>
                    </View>}
                </View>
            </ScrollView>
            {currentUser.role === "Manager" && (!issue.completed) && <CustomButton title={"Mark as resolved"} onPress={resolved}
                                                           secondary={false} fixed={true}/>}
            {currentUser.role === "Manager" && (!issue.completed && issue.pending) && <CustomButton title={"Escalate to supervisor"} onPress={escalate}
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

export default IssueDetailsScreen;
