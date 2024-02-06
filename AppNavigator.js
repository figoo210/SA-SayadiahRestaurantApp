import { StatusBar } from 'expo-status-bar';
import {View} from 'react-native';
import * as Font from 'expo-font';
import {useCallback, useEffect, useState} from "react";
import * as SplashScreen from 'expo-splash-screen';
import { enGB, registerTranslation } from 'react-native-paper-dates';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import LoginScreen from "./screens/general/LoginScreen";
import RegisterScreen from "./screens/general/RegisterScreen";
import AdminHomeScreen from "./screens/admin/AdminHomeScreen";
import ManagerHomeScreen from "./screens/manager/ManagerHomeScreen";
import StaffHomeScreen from "./screens/staff/StaffHomeScreen";
import {useAuth} from "./services/AuthContext";
import LoadingScreen from "./screens/general/LoadingScreen";
import IssuesTypesScreen from "./screens/general/IssuesTypesScreen";
import AccountScreen from "./screens/general/AccountScreen";
import IssuesReportScreen from "./screens/general/IssuesReportScreen";
import IssuesListScreen from "./screens/general/IssuesListScreen";
import BillsListScreen from "./screens/general/BillsListScreen";
import BillAddScreen from "./screens/general/BillAddScreen";
import BillDetailsScreen from "./screens/general/BillDetailsScreen";
import TicketsListScreen from "./screens/general/TicketsListScreen";
import TicketAddScreen from "./screens/general/TicketAddScreen";
import TicketDetailsScreen from "./screens/general/TicketDetailsScreen";
import CustomersListScreen from "./screens/general/CustomersListScreen";
import CustomerAddScreen from "./screens/general/CustomerAddScreen";
import CustomerDetailsScreen from "./screens/general/CustomerDetailsScreen";
import CustomerEditScreen from "./screens/general/CustomerEditScreen";
import RawMaterialAddScreen from "./screens/general/RawMaterialAddScreen";
import RawMaterialListScreen from "./screens/general/RawMaterialListScreen";
import RawMaterialDetailsScreen from "./screens/general/RawMaterialDetailsScreen";
import TasksListScreen from "./screens/general/TasksListScreen";
import TaskAddScreen from "./screens/general/TaskAddScreen";
import TaskDetailsScreen from "./screens/general/TaskDetailsScreen";
import MaintenanceListScreen from "./screens/general/MaintenanceListScreen";
import MaintenanceRequestScreen from "./screens/general/MaintenanceRequestScreen";
import MaintenanceDetailsScreen from "./screens/general/MaintenanceDetailsScreen";
import ReportsScreen from "./screens/general/ReportsScreen";
import IssueDetailsScreen from "./screens/general/IssueDetailsScreen";
import EmployeesListScreen from "./screens/manager/EmployeesListScreen";
import EmployeeDetailsScreen from "./screens/manager/EmployeeDetailsScreen";
import EmployeeRateScreen from "./screens/manager/EmployeeRateScreen";
import BranchesListScreen from "./screens/admin/BranchesListScreen";


// Keep the splash screen visible while we fetch resources
// SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

export default function AppNavigator() {
    const [appIsReady, setAppIsReady] = useState(false);

    const { currentUser, loading } = useAuth();

    useEffect(() => {
        async function prepare() {
            try {
                // Preload fonts, make any API calls you need to do here
                await Font.loadAsync({
                    'Inter': require('./assets/fonts/Inter-Regular.ttf'),
                    'InterBold': require('./assets/fonts/Inter-Bold.ttf'),
                });
                registerTranslation('en-GB', enGB)
            } catch (e) {
                console.warn(e);
            } finally {
                // Tell the application to render
                setAppIsReady(true);
            }
        }

        prepare();

    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

    return (
        <NavigationContainer>
            {loading ? (<LoadingScreen />) : (
                <Stack.Navigator initialRouteName={!currentUser ? "Login" : `${currentUser.role}HomeScreen`} screenOptions={{ headerShown: false }}>
                    {currentUser ? (
                        <>
                            {currentUser.role === "Admin" &&
                                <>
                                    <Stack.Screen name="AdminHomeScreen" component={AdminHomeScreen}/>
                                    <Stack.Screen name="BranchesListScreen" component={BranchesListScreen}/>
                                    <Stack.Screen name="EmployeesListScreen" component={EmployeesListScreen}/>
                                    <Stack.Screen name="EmployeeDetailsScreen" component={EmployeeDetailsScreen}/>
                                    <Stack.Screen name="EmployeeRateScreen" component={EmployeeRateScreen}/>
                                </>
                            }
                            {currentUser.role === "Manager" &&
                                <>
                                    <Stack.Screen name="ManagerHomeScreen" component={ManagerHomeScreen}/>
                                    <Stack.Screen name="EmployeesListScreen" component={EmployeesListScreen}/>
                                    <Stack.Screen name="EmployeeDetailsScreen" component={EmployeeDetailsScreen}/>
                                    <Stack.Screen name="EmployeeRateScreen" component={EmployeeRateScreen}/>
                                </>
                            }
                            {currentUser.role === "Staff" &&
                                <>
                                    <Stack.Screen name="StaffHomeScreen" component={StaffHomeScreen}/>

                                </>
                            }
                            <Stack.Screen name="AccountScreen" component={AccountScreen}/>
                            {/*Issues*/}
                            <Stack.Screen name="IssuesTypesScreen" component={IssuesTypesScreen}/>
                            <Stack.Screen name="IssuesReportScreen" component={IssuesReportScreen}/>
                            <Stack.Screen name="IssuesListScreen" component={IssuesListScreen}/>
                            <Stack.Screen name="IssueDetailsScreen" component={IssueDetailsScreen}/>
                            <Stack.Screen name="MaintenanceListScreen" component={MaintenanceListScreen}/>
                            <Stack.Screen name="MaintenanceRequestScreen" component={MaintenanceRequestScreen}/>
                            <Stack.Screen name="MaintenanceDetailsScreen" component={MaintenanceDetailsScreen}/>
                            {/*Bills*/}
                            <Stack.Screen name="UtilitiesBills" component={BillsListScreen}/>
                            <Stack.Screen name="AddBillScreen" component={BillAddScreen}/>
                            <Stack.Screen name="BillDetailsScreen" component={BillDetailsScreen}/>
                            {/*Tickets*/}
                            <Stack.Screen name="TicketsListScreen" component={TicketsListScreen}/>
                            <Stack.Screen name="TicketAddScreen" component={TicketAddScreen}/>
                            <Stack.Screen name="TicketDetailsScreen" component={TicketDetailsScreen}/>
                            {/*Customers*/}
                            <Stack.Screen name="CustomersListScreen" component={CustomersListScreen}/>
                            <Stack.Screen name="CustomerAddScreen" component={CustomerAddScreen}/>
                            <Stack.Screen name="CustomerEditScreen" component={CustomerEditScreen}/>
                            <Stack.Screen name="CustomerDetailsScreen" component={CustomerDetailsScreen}/>
                            {/*Raw Materials*/}
                            <Stack.Screen name="RawMaterialListScreen" component={RawMaterialListScreen}/>
                            <Stack.Screen name="RawMaterialAddScreen" component={RawMaterialAddScreen}/>
                            <Stack.Screen name="RawMaterialDetailsScreen" component={RawMaterialDetailsScreen}/>
                            {/*Tasks*/}
                            <Stack.Screen name="TasksListScreen" component={TasksListScreen}/>
                            <Stack.Screen name="TaskAddScreen" component={TaskAddScreen}/>
                            <Stack.Screen name="TaskDetailsScreen" component={TaskDetailsScreen}/>
                            {/*Reports*/}
                            <Stack.Screen name="ReportsScreen" component={ReportsScreen}/>
                        </>
                    ) : (
                        <>
                            <Stack.Screen name="Login" component={LoginScreen}/>
                            <Stack.Screen name="Register" component={RegisterScreen} />
                        </>
                    )}

                </Stack.Navigator>
            )}
            <View onLayout={onLayoutRootView}>
                <StatusBar style="auto" />
            </View>
        </NavigationContainer>
    );
}

