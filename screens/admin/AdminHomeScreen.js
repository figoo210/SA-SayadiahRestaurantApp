import React, {useState} from 'react';
import {SafeAreaView, ScrollView, TouchableOpacity, View} from 'react-native';
import { Card, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from "../../assets/styles";
import NavBar from "../../components/NavBar";
import {CategoryPieChart, DynamicLineChart, GoalsProgressChart, SalesBarChart} from "../../views/Charts";
import BranchesListScreen from "./BranchesListScreen";

function AdminHomeScreen({ navigation }) {
    const items = [
        { title: 'Issues', icon: 'alert', screen: 'IssuesTypesScreen' },
        { title: 'Utility Bills', icon: 'file-document', screen: 'UtilitiesBills' },
        { title: 'Tickets', icon: 'ticket-confirmation', screen: 'TicketsListScreen' },
        { title: 'Customers', icon: 'account', screen: 'CustomersListScreen' },
        { title: 'Tasks', icon: 'clipboard-text', screen: 'TasksListScreen' },
        { title: 'Raw material', icon: 'basket-fill', screen: 'RawMaterialListScreen' },
        { title: 'Reports', icon: 'file-chart', screen: 'ReportsScreen' },
        { title: 'Employees', icon: 'account', screen: 'EmployeesListScreen' },
    ];

    const [branch, setBranch] = useState(null);

    if (!branch) {
        return (
            <BranchesListScreen navigation={navigation} getBranch={setBranch} />
        )
    }

    return (
        <SafeAreaView style={styles.containerHomeScreen}>
            <NavBar title={"Al Sayyadiah"} backButton={false} navigation={navigation} />
            <ScrollView contentContainerStyle={styles.contentHomeScreen}>
                <View style={styles.gridHomeScreen}>
                    {items.map((item, index) => (
                        <TouchableOpacity
                            style={styles.cardButtonHomeScreen}
                            onPress={() => navigation.navigate(item.screen)}
                            key={index}
                        >
                            <Card style={styles.cardHomeScreen}>
                                <Card.Content style={styles.cardContentHomeScreen}>
                                    <Icon name={item.icon}  size={24} color={'#10515C'} />
                                    <Title style={styles.cardTitleHomeScreen}>{item.title}</Title>
                                </Card.Content>
                            </Card>
                        </TouchableOpacity>
                    ))}

                    {/* Charts */}
                    <DynamicLineChart />
                    <SalesBarChart />
                    <CategoryPieChart />
                    <GoalsProgressChart />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}


export default AdminHomeScreen;
