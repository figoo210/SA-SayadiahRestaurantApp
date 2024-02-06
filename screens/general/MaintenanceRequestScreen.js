// MaintenanceRequestScreen.js
import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import { Provider } from 'react-native-paper';
import {styles} from "../../assets/styles";
import NavBar from "../../components/NavBar";
import CustomButton from "../../components/CustomButton";
import {useAuth} from "../../services/AuthContext";
import DatePickerField from "../../components/DatePickerField";
import DropdownField from "../../components/DropdownField";
import {uploadFileToStorage} from "../../services/storage";
import {addRecordToDB} from "../../services/database";
import {getFilenameFromPath} from "../../services/helper";
import AttachmentField from "../../components/AttachmentField";
import TextAreaField from "../../components/TextAreaField";

const maintenances = [
    {
        label: "Major Maintenance",
        value: "Major Maintenance",
    },
    {
        label: "Minor Maintenance",
        value: "Minor Maintenance",
    },
];


const MaintenanceRequestScreen = ({ navigation }) => {
    const { currentUser } = useAuth();

    const [maintenance, setMaintenance] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [attachment, setAttachment] = useState(null);
    const [description, setDescription] = useState('');

    const addTask = async () => {
        const req = {
            maintenance: maintenance,
            attachment: attachment,
            dueDate: dueDate,
            description: description,
            comments: "",
            createdBy: currentUser.email,
            createdAt: new Date(),
            pending: true,
            completed: false,
            isDeleted: false,
        };

        if (attachment) {
            req.attachment = await uploadFileToStorage(attachment.uri, "maintenanceAttachments", attachment.name);
        }
        await addRecordToDB("maintenance", req);
        navigation.navigate("MaintenanceListScreen");
    }

    return (
        <Provider>
            <View style={styles.listContainer}>
                <NavBar title="Request Maintenance" backButton={true} navigation={navigation} />

                <ScrollView style={styles.listScrollView}>
                    <DropdownField
                        items={maintenances}
                        onValueChange={setMaintenance}
                        selectedValue={maintenance}
                        placeholder={"Maintenance Type"}
                    />
                    <DatePickerField
                        onValueChange={setDueDate}
                        value={dueDate ? dueDate.toLocaleDateString() : dueDate}
                        placeholder={"Due Date"} startYear={1920}
                    />
                    <TextAreaField placeholder={"Description"} value={description} onValueChange={setDescription} />
                    <AttachmentField
                        onAttachment={setAttachment}
                        value={attachment?.name || (attachment?.uri && getFilenameFromPath(attachment?.uri))}
                    />
                </ScrollView>
                <CustomButton title={"Request"} onPress={addTask} secondary={false} fixed={true} disable={!maintenance || !dueDate || !description} />
                <CustomButton title={"Cancel"} onPress={navigation.goBack} secondary={true} fixed={true} />
            </View>
        </Provider>
    );
};


export default MaintenanceRequestScreen;
