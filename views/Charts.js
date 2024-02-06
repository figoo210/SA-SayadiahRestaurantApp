import React, {useEffect, useState} from 'react';
import {Dimensions, View} from 'react-native';
import {ProgressChart, PieChart, BarChart, LineChart} from 'react-native-chart-kit';
import {Text} from "react-native-paper";
import {styles} from "../assets/styles";


export const DynamicLineChart = () => {
    // Initial data state
    const [salesData, setSalesData] = useState({
        labels: ["B001", "B002", "B003", "B004", "B005", "B006"],
        datasets: [{
            data: [50, 45, 28, 80, 90, 43],
            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
            strokeWidth: 2
        }]
    });

    // Function to simulate fetching new data
    const fetchSalesData = () => {
        // Simulating data fetching and updating the dataset
        const newData = {
            labels: salesData.labels.map((label, index) => `B00${index + 1}`),
            datasets: [{
                data: salesData.datasets[0].data.map(() => Math.round(Math.random() * 100)),
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                strokeWidth: 2
            }]
        };

        setSalesData(newData);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            fetchSalesData();
        }, 5000); // Update data every 5 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [salesData]);

    return (
        <View>
            <Text style={{...styles.titleHomeScreen, color: "#10515C", fontSize: 18}}>Branches Live Sales</Text>
            <LineChart
                data={salesData}
                width={Dimensions.get('window').width - 16}
                height={220}
                chartConfig={{
                    backgroundColor: '#e26a00',
                    backgroundGradientFrom: '#fb8c00',
                    backgroundGradientTo: '#ffa726',
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />
            <Text style={{ textAlign: 'center' }}>Data updates every 5 seconds</Text>
        </View>
    );
};

export const SalesLineChart = () => {
    const data = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [
            {
                data: [50, 45, 28, 80, 99, 43],
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                strokeWidth: 2 // optional
            }
        ]
    };
    return (
        <View>
            <Text style={{...styles.titleHomeScreen, color: "#10515C", fontSize: 18}}>Last Six Months Sales</Text>
            <LineChart
                data={data}
                width={Dimensions.get('window').width - 16}
                height={220}
                chartConfig={{
                    backgroundColor: '#e26a00',
                    backgroundGradientFrom: '#fb8c00',
                    backgroundGradientTo: '#ffa726',
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />
        </View>
    )
};

export const SalesBarChart = () => {
    const data = {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        datasets: [
            {
                data: [20, 45, 28, 80, 99],
            }
        ],
    };
    return (
        <View>
            <Text style={{...styles.titleHomeScreen, color: "#10515C", fontSize: 18}}>Last Week Sales</Text>
            <BarChart
                data={data}
                width={Dimensions.get('window').width - 16}
                height={220}
                chartConfig={{
                    backgroundGradientFrom: '#fff',
                    backgroundGradientTo: '#fff',
                    decimalPlaces: 2,
                    strokeWidth: 2,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,

                }}
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                    paddingTop: 10,
                }}
                yAxisSuffix={""}
            />
        </View>
    )
};

export const CategoryPieChart = () => {
    const data = [
        { name: 'Seafood', population: 215000, color: 'rgba(131, 167, 234, 1)', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Meat', population: 280000, color: '#F00', legendFontColor: '#7F7F7F', legendFontSize: 15 },
        { name: 'Vegetarian', population: 527612, color: '#2ecc71', legendFontColor: '#7F7F7F', legendFontSize: 15 }
    ];
    return (
        <View>
            <Text style={{...styles.titleHomeScreen, color: "#10515C", fontSize: 18}}>Annual sales based on meals type.</Text>
            <PieChart
                data={data}
                width={Dimensions.get('window').width - 16}
                height={220}
                chartConfig={{
                    backgroundColor: '#1cc910',
                    backgroundGradientFrom: '#eff3ff',
                    backgroundGradientTo: '#efefef',
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                accessor={"population"}
                backgroundColor={"transparent"}
                paddingLeft={"15"}
                center={[0, 0]}
                absolute
            />
        </View>
    )
};

export const GoalsProgressChart = () => {
    const data = {
        labels: ["Sales", "Customers", "Inventory"], // optional
        data: [0.4, 0.6, 0.8]
    };
    return (
        <View>
            <Text style={{...styles.titleHomeScreen, color: "#10515C", fontSize: 18}}>Goals Progress</Text>
            <ProgressChart
                data={data}
                width={Dimensions.get('window').width}
                padding={30}
                height={220}
                strokeWidth={16}
                radius={32}
                chartConfig={{
                    backgroundGradientFrom: 'blue',
                    backgroundGradientTo: 'green',
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                }}
                hideLegend={false}
            />
        </View>
    )
};
