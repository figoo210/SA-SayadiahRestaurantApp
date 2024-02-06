import React, {useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import {styles} from "../../assets/styles";
import NavBar from "../../components/NavBar";
import CustomButton from "../../components/CustomButton";
import {Modal} from "react-native-paper";
import {useAuth} from "../../services/AuthContext";
import {addOrUpdateRecord} from "../../services/database";

const TaskDetailsScreen = ({ route, navigation }) => {
    // Extract the customer ID from the navigation parameters
    const { task, status } = route.params;
    const { currentUser } = useAuth();

    const [deleteModal, setDeleteModal] = useState(false);
    const deleteTask = () => {
        setDeleteModal(true);
    };
    const confirmDelete = async () => {
        // Handle the deletion logic
        let updatedTask = task;
        updatedTask.isDeleted = true;
        await addOrUpdateRecord("tasks", task.id, updatedTask);
        // Close the modal and go back or navigate as necessary
        setDeleteModal(false);
        navigation.navigate("TasksListScreen");
    };

    const reportProblem = async () => {
        let updatedTask = task;
        updatedTask.pending = false;
        updatedTask.completed = false;
        await addOrUpdateRecord("tasks", task.id, updatedTask);
        navigation.navigate("TasksListScreen");
    }

    const completeTask = async () => {
        let updatedTask = task;
        updatedTask.pending = false;
        updatedTask.completed = true;
        await addOrUpdateRecord("tasks", task.id, updatedTask);
        navigation.navigate("TasksListScreen");
    }

    return (
        <View style={styles.listContainer}>
            <NavBar title={task.task} backButton={true} navigation={navigation} />

            <ScrollView style={styles.listScrollView}>
                <View style={styles.cardContent}>

                    <View style={styles.cardBorder}>
                        <Text style={styles.cardText}>Task Name</Text>
                        <Text style={styles.cardInfo}>{task.task}</Text>
                    </View>

                    <View style={styles.cardBorder}>
                        <Text style={styles.cardText}>Date Created</Text>
                        <Text style={styles.cardInfo}>{new Date(task.createdAt?.seconds * 1000)?.toLocaleDateString()}</Text>
                    </View>

                    <View style={styles.cardBorder}>
                        <Text style={styles.cardText}>Assigned By</Text>
                        <Text style={styles.cardInfo}>{task.assignedBy === currentUser.email ? "You" : "Manager - " + task.assignedBy}</Text>
                    </View>

                    <View style={styles.cardBorder}>
                        <Text style={styles.cardText}>Assigned To</Text>
                        <Text style={styles.cardInfo}>{task.assignedTo === currentUser.email ? "You" : task.assignedTo}</Text>
                    </View>

                    <View style={styles.cardBorder}>
                        <Text style={styles.cardText}>Attachment</Text>
                        {task.attachment ?
                            (<TouchableOpacity>
                                <Image
                                    src={task.attachment}
                                    style={{width: 100, height: 100}}
                                    source=""
                                />
                            </TouchableOpacity>) :
                            (<Text style={styles.cardInfo}>No Attachments</Text>)
                        }
                    </View>

                    <View style={styles.cardBorder}>
                        <Text style={styles.cardText}>Description</Text>
                        <Text style={styles.cardInfo}>{task.description}</Text>
                    </View>

                    <View style={styles.cardBorder}>
                        <Text style={styles.cardText}>Due Date</Text>
                        <Text style={styles.cardInfo}>{new Date(task.dueDate?.seconds * 1000)?.toLocaleDateString()}</Text>
                    </View>

                    <View style={styles.cardBorder}>
                        <Text style={styles.cardText}>Resolution Status</Text>
                        <Text style={styles.cardInfo}>{!task.completed && !task.pending ? "Reported" : status}</Text>
                    </View>
                </View>
            </ScrollView>
            {!task.completed && <CustomButton title={"Mark as completed"} onPress={completeTask}
                           secondary={false} fixed={true}/>}
            {!task.completed && currentUser.role !== "Staff" ?
                <CustomButton title={"Delete"} onPress={deleteTask} secondary={true} danger={true} fixed={true}/> :
                ((!task.completed && task.pending) && <CustomButton title={"Report a problem"} onPress={reportProblem} secondary={true} danger={true} fixed={true}/>)
            }

            <Modal
                animationType="slide"
                transparent={true}
                visible={deleteModal}
                onRequestClose={() => {
                    setDeleteModal(false);
                }}
                children={
                    <View style={styles.actionModal}>
                        <Text style={styles.actionModalTitle}>Delete Task</Text>
                        <Text style={styles.actionModalText}>Are you sure you want to delete this Task?</Text>
                        <CustomButton title={"Cancel"} onPress={() => setDeleteModal(false)} secondary={false} />
                        <CustomButton title={"Delete"} onPress={confirmDelete} secondary={true} danger={true} />
                    </View>
                }
            />
        </View>
    );
};

export default TaskDetailsScreen;
