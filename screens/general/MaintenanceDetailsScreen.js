import React from 'react';
import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import {styles} from "../../assets/styles";
import NavBar from "../../components/NavBar";

const MaintenanceDetailsScreen = ({ route, navigation }) => {
    // Extract the ticket ID from the navigation parameters
    const { maintenance, status } = route.params;

    return (
        <View style={styles.listContainer}>
            <NavBar title={maintenance.id} backButton={true} navigation={navigation} />

            <ScrollView style={styles.listScrollView}>
                <View style={styles.cardContent}>

                    <View style={styles.cardBorder}>
                        <Text style={styles.cardText}>Maintenance type</Text>
                        <Text style={styles.cardInfo}>{maintenance.maintenance}</Text>
                    </View>

                    <View style={styles.cardBorder}>
                        <Text style={styles.cardText}>Due date</Text>
                        <Text style={styles.cardInfo}>{new Date(maintenance.dueDate?.seconds * 1000)?.toLocaleDateString()}</Text>
                    </View>

                    <View style={styles.cardBorder}>
                        <Text style={styles.cardText}>Requested By</Text>
                        <Text style={styles.cardInfo}>{maintenance.createdBy}</Text>
                    </View>

                    <View style={styles.cardBorder}>
                        <Text style={styles.cardText}>Description</Text>
                        <Text style={styles.cardInfo}>{maintenance.description}</Text>
                    </View>

                    <View style={styles.cardBorder}>
                        <Text style={styles.cardText}>Attachment</Text>
                        {maintenance.attachment ?
                            (<TouchableOpacity>
                                <Image
                                    src={maintenance.attachment}
                                    style={{width: 100, height: 100}}
                                    source=""
                                />
                            </TouchableOpacity>) :
                            (<Text style={styles.cardInfo}>No Attachments</Text>)
                        }
                    </View>

                    <View style={styles.cardBorder}>
                        <Text style={styles.cardText}>Comments</Text>
                        <Text style={styles.cardInfo}>{maintenance.comments || "No Comments"}</Text>
                    </View>

                    <View style={styles.cardBorder}>
                        <Text style={styles.cardText}>Status</Text>
                        <Text style={styles.cardInfo}>{status}</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default MaintenanceDetailsScreen;
