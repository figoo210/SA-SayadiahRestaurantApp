import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { List } from 'react-native-paper';
import NavBar from '../../components/NavBar';

const IssuesTypesScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <NavBar title={"Issues"} backButton={true} navigation={navigation} />
            <List.Section>
                <List.Item
                    title="Sales issues"
                    right={props => <List.Icon {...props} icon="chevron-right" />}
                    onPress={() => navigation.navigate('IssuesListScreen')}
                    style={styles.listItem}
                    titleStyle={styles.listItemTitle}
                />
                <List.Item
                    title="Maintenance issues"
                    right={props => <List.Icon {...props} icon="chevron-right" />}
                    onPress={() => navigation.navigate('MaintenanceListScreen')}
                    style={styles.listItem}
                    titleStyle={styles.listItemTitle}
                />
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

export default IssuesTypesScreen;
