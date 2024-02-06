import React from 'react';
import {Dimensions, SafeAreaView, ScrollView, TouchableOpacity, View} from 'react-native';
import { Card, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from "../../assets/styles";
import NavBar from "../../components/NavBar";
import { LineChart, BarChart } from 'react-native-chart-kit';

function StaffHomeScreen({ navigation }) {
    const items = [
        { title: 'Issues', icon: 'alert', screen: 'IssuesTypesScreen' },
        { title: 'Utility Bills', icon: 'file-document', screen: 'UtilitiesBills' },
        { title: 'Tickets', icon: 'ticket-confirmation', screen: 'TicketsListScreen' },
        { title: 'Customers', icon: 'account', screen: 'CustomersListScreen' },
        { title: 'Tasks', icon: 'clipboard-text', screen: 'TasksListScreen' },
        { title: 'Raw material', icon: 'basket-fill', screen: 'RawMaterialListScreen' },
        { title: 'Reports', icon: 'file-chart', screen: 'ReportsScreen' },
    ];

    const chartConfig = {
        backgroundGradientFrom: '#FFF',
        backgroundGradientTo: '#FFF',
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2,
        useShadowColorFromDataset: false,
    };

    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                data: [20, 45, 28, 80, 99, 43],
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                strokeWidth: 2
            },
            {
                data: [15, 66, 12, 70, 30, 89],
                color: (opacity = 1) => `rgba(10, 65, 100, ${opacity})`,
                strokeWidth: 2,
                legend: ['Last Year Sales']
            },
        ],
        legend: ['This Year Sales', 'Last Year Sales']
    };

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

                    <View style={{ marginTop: 30 }}>
                        <Title style={styles.chartTitle}>Sales Overview</Title>
                        <LineChart
                            data={data}
                            width={Dimensions.get('window').width - 16}
                            height={220}
                            chartConfig={chartConfig}
                            bezier
                        />
                    </View>
                    <View style={{ marginTop: 30 }}>
                        <Title style={styles.chartTitle}>Revenue of Sales</Title>
                        <BarChart
                            data={data}
                            width={Dimensions.get('window').width - 16}
                            height={220}
                            chartConfig={chartConfig}
                            bezier
                        />
                    </View>
                    <View style={{ marginTop: 30 }}>
                        <Title style={styles.chartTitle}>Total Expenses</Title>
                        <LineChart
                            data={data}
                            width={Dimensions.get('window').width - 16}
                            height={220}
                            chartConfig={chartConfig}
                            bezier
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}


export default StaffHomeScreen;
