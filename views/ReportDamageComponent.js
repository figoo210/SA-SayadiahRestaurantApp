import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../assets/styles";
import DatePickerField from "../components/DatePickerField";
import DropdownField from "../components/DropdownField";
import AttachmentField from "../components/AttachmentField";
import { getFilenameFromPath } from "../services/helper";
import TextAreaField from "../components/TextAreaField";
import React from "react";

const ReportDamageComponent = ({ index, issues, setIssues, priorities }) => {

    // Function to update a specific field of an issue at given index
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
                    <DatePickerField onValueChange={(date) => updateIssue('issueDate', date)} placeholder={"Issue Date"} startYear={2024} value={issues[index].issueDate?.toLocaleDateString()} />
                    <DropdownField placeholder={"Priority"} onValueChange={(priority) => updateIssue('priority', priority)} selectedValue={issues[index].priority} items={priorities} />
                    <AttachmentField
                        onAttachment={(attachment) => updateIssue('attachment', attachment)}
                        value={issues[index].attachment?.name || (issues[index].attachment?.uri && getFilenameFromPath(issues[index].attachment?.uri))}
                    />
                    <TextAreaField onValueChange={(notes) => updateIssue('notes', notes)} placeholder={"Notes"} value={issues[index].notes} />
                </>
            )}
        </View>
    );
}

export default ReportDamageComponent;
