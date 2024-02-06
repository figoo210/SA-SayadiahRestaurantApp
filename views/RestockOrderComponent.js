import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../assets/styles";
import DatePickerField from "../components/DatePickerField";
import DropdownField from "../components/DropdownField";
import React from "react";
import InputField from "../components/InputField";

const units = [
    {
        label: "KG",
        value: "kg"
    },
    {
        label: "Gram",
        value: "gram"
    },
    {
        label: "Box",
        value: "box"
    },
]

const RestockOrderComponent = ({ index, data, setData }) => {

    // Function to update a specific field of an issue at given index
    const updateData = (field, value) => {
        const newData = [...data];
        newData[index] = { ...newData[index], [field]: value };
        setData(newData);
    };

    return (
        <View>
            <TouchableOpacity onPress={() => updateData('active', !data[index].active)} style={{
                ...styles.accordionHeader,
                backgroundColor: data[index].active ? '#f0f0f0' : '#aaa',
            }}>
                <Text>Restock Order #{index + 1} ({data[index].item})</Text>
            </TouchableOpacity>
            {data[index].active && (
                <>
                    <DatePickerField onValueChange={(date) => updateData('dueDate', date)} placeholder={"Due Date"} startYear={2024} value={data[index].dueDate?.toLocaleDateString()} />
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <InputField value={data[index].quantity} onValueChange={(q) => updateData('quantity', q)} placeholder={"Quantity"} width={"48%"} />
                        <DropdownField placeholder={"Unit"} onValueChange={(unit) => updateData('unit', unit)} selectedValue={data[index].unit} width={"48%"} items={units} />
                    </View>
                </>
            )}
        </View>
    );
}

export default RestockOrderComponent;
