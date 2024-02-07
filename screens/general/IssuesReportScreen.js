import React, { useEffect, useState } from 'react';
import { View, ScrollView, } from 'react-native';
import { styles } from '../../assets/styles';
import NavBar from '../../components/NavBar';
import CustomButton from "../../components/CustomButton";
import ReportDamageComponent from "../../views/ReportDamageComponent";
import OrderIssuesComponent from "../../views/OrderIssuesComponent";
import LossIssuesComponent from "../../views/LossIssuesComponent";
import DropdownField from "../../components/DropdownField";
import {addRecordToDB} from "../../services/database";
import {useAuth} from "../../services/AuthContext";
import {uploadFileToStorage} from "../../services/storage";


const issueTypes = [
    {
        label: "Report damage",
        value: "Report damage",
    },
    {
        label: "Returned Order",
        value: "Returned Order",
    },
    {
        label: "Missing Order",
        value: "Missing Order",
    },
    {
        label: "Report Loss",
        value: "Report Loss",
    },
];
const priorities = [
    {
        label: "High",
        value: "High",
    },
    {
        label: "Medium",
        value: "Medium",
    },
    {
        label: "Low",
        value: "Low",
    },
];


const IssuesReportScreen = ({ navigation }) => {
    const { currentUser } = useAuth();

    const [issues, setIssues] = useState([]);

    const [selectedIssueType, setSelectedIssueType] = useState("");
    // Automatically add a new issue when selectedIssueType changes
    useEffect(() => {
        if (selectedIssueType && selectedIssueType !== "Issue Type") {
            setIssues(issues => [...issues, {
                issueType: selectedIssueType,
                issueDate: null,
                priority: '',
                attachment: null,
                notes: '',
                orderNumber: '',
                orderDetails: '',
                product: '',
                quantity: '',
                active: false,
                createdAt: new Date(),
                staffEmail: currentUser.email,
                staffName: currentUser.name,
                createdBy: currentUser.email,
                pending: true,
                completed: false,
                isDeleted: false,
            }]);
            setSelectedIssueType("Issue Type");
        }
    }, [selectedIssueType]);

    const saveIssues = async () => {
        for (let i = 0; i < issues.length; i++) {
            if (issues[i].attachment) {
                issues[i].attachment = await uploadFileToStorage(issues[i].attachment.uri, "salesIssuesAttachments", issues[i].attachment.name);
            }
            await addRecordToDB("salesIssues", issues[i]);
        }
        // console.log(issues);
        navigation.navigate("IssuesListScreen");
    }

    const [isFormValid, setIsFormValid] = useState(false);

    const validateForm = () => {
        let isValid = true; // Assume the form is valid initially

        if (!selectedIssueType) {
            // If no issue type is selected, the form is automatically invalid
            setIsFormValid(false);
            return;
        }

        for (const issue of issues) {
            // Depending on the issue type, validate the necessary fields
            switch (issue.issueType) {
                case "Report damage":
                    if (!issue.issueDate || !issue.priority || !issue.notes) {
                        isValid = false;
                    }
                    break;
                case "Returned Order":
                case "Missing Order":
                    if (!issue.issueDate || !issue.priority || !issue.notes || !issue.orderNumber || !issue.orderDetails) {
                        isValid = false;
                    }
                    break;
                case "Report Loss":
                    if (!issue.issueDate || !issue.priority || !issue.notes || !issue.product || !issue.quantity) {
                        isValid = false;
                    }
                    break;
                default:
                    // For any unrecognized issue type, consider the form invalid
                    isValid = false;
                    break;
            }

            // If any issue is invalid, break out of the loop early
            if (!isValid) break;
        }

        setIsFormValid(isValid);
    };


    // Call validateForm function whenever issues or selectedIssueType changes
    useEffect(() => {
        validateForm();
    }, [issues, selectedIssueType]);

    return (
        <View style={styles.issueContainer}>
            <NavBar title={"Report an issue"} backButton={true} navigation={navigation} />
            <ScrollView>
                <DropdownField active={issues.length === 0 ? true : isFormValid} placeholder={"Issue Type"} items={issueTypes} onValueChange={setSelectedIssueType} selectedValue={selectedIssueType} />
                {issues.map((issue, index) => {
                    switch (issue.issueType) {
                        case "Report damage":
                            return <ReportDamageComponent key={index} index={index} issues={issues} setIssues={setIssues} priorities={priorities} />;
                        case "Returned Order":
                        case "Missing Order":
                            return <OrderIssuesComponent key={index} index={index} issues={issues} setIssues={setIssues} priorities={priorities} />;
                        case "Report Loss":
                            return <LossIssuesComponent key={index} index={index} issues={issues} setIssues={setIssues} priorities={priorities} />;
                        default:
                            return null;
                    }
                })}
            </ScrollView>
            <CustomButton title={"Save"} onPress={saveIssues} secondary={false} disable={!isFormValid} fixed={true} />
            <CustomButton title={"Cancel"} onPress={navigation.goBack} secondary={true} fixed={true} />
        </View>
    );
};

export default IssuesReportScreen;
