// BillAddScreen.js
import React, {useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';
import { Provider } from 'react-native-paper';
import DatePickerField from "../../components/DatePickerField";
import {styles} from "../../assets/styles";
import NavBar from "../../components/NavBar";
import TextInputDropdown from "../../components/TextInputDropdown";
import CustomButton from "../../components/CustomButton";
import DropdownField from "../../components/DropdownField";
import InputField from "../../components/InputField";
import {addRecordToDB, getRecordsFromDB} from "../../services/database";
import {useAuth} from "../../services/AuthContext";

const paymentCycles = [
    {label: "One Time", value: "One Time"},
    {label: "Daily", value: "Daily"},
    {label: "Weekly", value: "Weekly"},
    {label: "Monthly", value: "Monthly"},
    {label: "Quarterly", value: "Quarterly"},
    {label: "Yearly", value: "Yearly"}
];

const BillAddScreen = ({ navigation }) => {
    const { currentUser } = useAuth();
    const [availableTypes, setAvailableTypes] = useState([]);

    const [billType, setBillType] = useState('Gas');
    const [dueDate, setDueDate] = useState(new Date());
    const [paymentCycle, setPaymentCycle] = useState('Monthly');
    const [amount, setAmount] = useState('');

    const addBill = async () => {
        await addRecordToDB("utilityBills", {
            billType: billType,
            dueDate: dueDate,
            paymentCycle: paymentCycle,
            amount: amount,
            createdAt: new Date(),
            createdBy: currentUser.email,
            paid: false,
            isDeleted: false,
        });
        if (!availableTypes.includes(billType)) {
            await addRecordToDB("billsTypes", { billType: billType });
        }
        navigation.navigate("UtilitiesBills");
    }

    useEffect(() => {
        const getTypes = async () => {
            const types = await getRecordsFromDB("billsTypes");
            const ts = [];
            for (let i = 0; i < types.length; i++) {
                ts.push(types[i].billType);
            }
            setAvailableTypes(ts);
        };
        getTypes().catch(console.error);
    }, []);

    return (
        <Provider>
            <View style={styles.listContainer}>
                <NavBar title="Utility Bill" backButton={true} navigation={navigation} />

                {availableTypes && availableTypes.length > 0 && <ScrollView style={styles.listScrollView}>
                    <TextInputDropdown options={availableTypes} onValueChange={setBillType} value={billType} />
                    <DatePickerField onValueChange={setDueDate} value={dueDate.toLocaleDateString()} placeholder={"Due Date"} />
                    <DropdownField onValueChange={setPaymentCycle} placeholder={"Payment cycle"} selectedValue={paymentCycle} items={paymentCycles} />
                    <InputField onValueChange={setAmount} value={amount} placeholder={"Amount"} />
                </ScrollView>}
                <CustomButton title={"Add"} onPress={addBill} secondary={false} fixed={true} disable={!billType || !dueDate || !paymentCycle || !amount} />
                <CustomButton title={"Cancel"} onPress={navigation.goBack} secondary={true} fixed={true} />
            </View>
        </Provider>
    );
};


export default BillAddScreen;
