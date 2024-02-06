import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import {styles} from "../assets/styles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const deviceWidth = Dimensions.get('window').width;
const starSize = deviceWidth * 0.08;

const getPriorityStyle = (priority) => {
    let backgroundColor;
    switch (priority) {
        case 'High':
            backgroundColor = '#FF6B6B'; // Red
            break;
        case 'Medium':
            backgroundColor = '#FFD93D'; // Yellow or Orange
            break;
        case 'Low':
            backgroundColor = '#6BCB77'; // Green
            break;
        default:
            backgroundColor = '#E8E8E8'; // Grey
    }

    return {
        backgroundColor: backgroundColor,
        borderRadius: 14.5,
        justifyContent: 'center',
        alignItems: 'center',
        height: 25,
    };
};

const CustomCard = ({ obj, id, onPress, status, cardType }) => {

    return (
        <TouchableOpacity onPress={onPress} style={styles.styleCard}>
            <View style={{ flex: 4 }}>
                <View style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'row',
                }}>
                    <Text style={styles.issueNumber}>{cardType ? `${cardType} #${id + 1}` : (obj?.name || obj?.task)}</Text>
                    {!obj.completed && obj.priority && (<View style={getPriorityStyle(obj.priority)}>
                        <Text style={styles.issuePriority}>{obj.priority}</Text>
                    </View>)}
                </View>

                {obj?.email && <Text style={styles.issueCardTitle}>{obj?.email}</Text>}

                {obj?.is_blacklisted ?
                    <Text style={{...styles.issueCardTitle, color: "green"}}>Whitelisted</Text> :
                    obj?.is_blacklisted === false && <Text style={{...styles.issueCardTitle, color: "red"}}>Blacklisted</Text>
                }

                {cardType && <Text style={styles.issueDate}>{new Date(obj.dueDate?.seconds * 1000)?.toLocaleDateString()}</Text>}

                <Text style={styles.issueCardTitle}>
                    {obj.billType || obj.ticketType || obj.item || (obj.assignedTo && ("To " + obj.assignedTo)) || obj.maintenance}
                    {obj.amount && "- " + obj.amount + "SAR"}
                </Text>

                {obj.quantity && <Text style={styles.issueCardTitle}>{obj.quantity} {obj.unit}</Text>}
                {obj.staffName && <Text style={styles.issueCardTitle}>{obj.staffName}</Text>}

                {status && <Text style={styles.issueStatus}>{!obj.completed && !obj.pending ? "Reported" : status}</Text>}
            </View>
            {/*<View style={{ flex: 1 }}><Text><Icon name={"arrow-right"} color={"#aaa"} size={starSize} /></Text></View>*/}
        </TouchableOpacity>
    );
};


export default CustomCard;
