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

const IssueCard = ({ issue, id, onPress }) => {


    return (
        <TouchableOpacity onPress={onPress} style={styles.styleCard}>
            <View style={{ flex: 4 }} >
                <View style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'row',
                }}>
                    <Text style={styles.issueNumber}>{`Issue #${id}`}</Text>
                    {!issue.completed && (<View style={getPriorityStyle(issue.priority)}>
                        <Text style={styles.issuePriority}>{issue.priority}</Text>
                    </View>)}
                </View>
                <Text style={styles.issueDate}>{new Date(issue.issueDate?.seconds * 1000)?.toDateString()}</Text>
                <Text style={styles.issueCardTitle}>{issue.issueType}</Text>
                <Text style={styles.issueStatus}>{!issue.completed && !issue.pending ? "Escalated" : (issue.pending ? "Pending" : "Solved")}</Text>
            </View>
            {/*<View style={{ flex: 1 }}><Text><Icon name={"arrow-right"} color={"#aaa"} size={starSize} /></Text></View>*/}
        </TouchableOpacity>
    );
};


export default IssueCard;
