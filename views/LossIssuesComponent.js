import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../assets/styles";
import InputField from "../components/InputField";
import DatePickerField from "../components/DatePickerField";
import DropdownField from "../components/DropdownField";
import AttachmentField from "../components/AttachmentField";
import { getFilenameFromPath } from "../services/helper";
import TextAreaField from "../components/TextAreaField";

const LossIssuesComponent = ({ index, issues, setIssues, priorities }) => {
    // Function to update a specific field of an issue at the given index
    const updateIssue = (field, value) => {
        const newIssues = [...issues];
        newIssues[index] = { ...newIssues[index], [field]: value };
        setIssues(newIssues);
    };

    return (
        <View>
            <TouchableOpacity onPress={() => updateIssue('active', !issues[index].active)} style={{
                ...styles.accordionHeader,
                backgroundColor: issues[index].active ? '#f0f0f0' : '#aaa',
            }}>
                <Text>Issue #{index + 1} ({issues[index].issueType})</Text>
            </TouchableOpacity>
            {issues[index].active && (
                <>
                    <InputField onValueChange={(value) => updateIssue('product', value)} placeholder={"Product"} value={issues[index].product} />
                    <InputField onValueChange={(value) => updateIssue('quantity', value)} placeholder={"Quantity"} value={issues[index].quantity} />
                    <DatePickerField onValueChange={(date) => updateIssue('issueDate', date)} placeholder={"Issue Date"} startYear={2024} value={issues[index].issueDate?.toLocaleDateString()} />
                    <DropdownField placeholder={"Priority"} onValueChange={(value) => updateIssue('priority', value)} selectedValue={issues[index].priority} items={priorities} />
                    <AttachmentField
                        onAttachment={(attachment) => updateIssue('attachment', attachment)}
                        value={issues[index].attachment?.name || (issues[index].attachment?.uri && getFilenameFromPath(issues[index].attachment?.uri))}
                    />
                    <TextAreaField onValueChange={(value) => updateIssue('notes', value)} placeholder={"Notes"} value={issues[index].notes} />
                </>
            )}
        </View>
    );
};

export default LossIssuesComponent;
