import React, { useEffect, useState } from 'react';
import { View, ScrollView, } from 'react-native';
import { styles } from '../../assets/styles';
import NavBar from '../../components/NavBar';
import CustomButton from "../../components/CustomButton";
import DropdownField from "../../components/DropdownField";
import {addRecordToDB} from "../../services/database";
import {useAuth} from "../../services/AuthContext";
import RestockOrderComponent from "../../views/RestockOrderComponent";

const RawMaterialAddScreen = ({ navigation }) => {
    const { currentUser } = useAuth();

    const [data, setData] = useState([]);
    const [items, setItems] = useState([]);

    const [selectedTarget, setSelectedTarget] = useState("");
    // Automatically add a new issue when selectedTarget changes
    useEffect(() => {
        if (selectedTarget && selectedTarget !== "Issue Type") {
            setData(data => [...data, {
                item: selectedTarget,
                dueDate: null,
                unit: '',
                quantity: '',
                active: false,
                createdAt: new Date(),
                createdBy: currentUser.email,
                staffEmail: currentUser.email,
                staffName: currentUser.name,
                pending: true,
                completed: false,
                isDeleted: false,
            }]);
            setSelectedTarget("Issue Type");
        }
    }, [selectedTarget]);

    const saveHandler = async () => {
        for (let i = 0; i < data.length; i++) {
            await addRecordToDB("restocks", data[i]);
        }
        // console.log(data);
        navigation.navigate("RawMaterialListScreen");
    }

    const [isFormValid, setIsFormValid] = useState(false);

    const validateForm = () => {
        let isValid = true; // Assume the form is valid initially

        if (!selectedTarget) {
            // If no issue type is selected, the form is automatically invalid
            setIsFormValid(false);
            return;
        }

        for (const d of data) {
            if (!d.dueDate || !d.item || !d.quantity || !d.unit) {
                isValid = false;
            }
            // If any invalid, break out of the loop early
            if (!isValid) break;
        }

        setIsFormValid(isValid);
    };


    // Call validateForm function whenever data or selectedTarget changes
    useEffect(() => {
        validateForm();
    }, [data, selectedTarget]);

    useEffect(() => {
        const getItems = async () => {
            // get item names from foodics then set in items
            setItems([{label: "Test Item", value: "Test Item"}]);
        };
        getItems().catch((e) => console.error(e));
    }, [data, selectedTarget]);

    return (
        <View style={styles.issueContainer}>
            <NavBar title="Restock Order" backButton={true} navigation={navigation} />
            <ScrollView>
                <DropdownField active={data.length === 0 ? true : isFormValid} placeholder={"Raw Material"} items={items} onValueChange={setSelectedTarget} selectedValue={selectedTarget} />
                {data.map((issue, index) =>
                    <RestockOrderComponent key={index} index={index} data={data} setData={setData} />
                )}
            </ScrollView>
            <CustomButton title={"Save"} onPress={saveHandler} secondary={false} disable={!isFormValid} fixed={true} />
            <CustomButton title={"Cancel"} onPress={navigation.goBack} secondary={true} fixed={true} />
        </View>
    );
};

export default RawMaterialAddScreen;
