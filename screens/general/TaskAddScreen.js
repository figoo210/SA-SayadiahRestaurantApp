// TaskAddScreen.js
import React, {useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';
import { Provider } from 'react-native-paper';
import {styles} from "../../assets/styles";
import NavBar from "../../components/NavBar";
import CustomButton from "../../components/CustomButton";
import InputField from "../../components/InputField";
import {useAuth} from "../../services/AuthContext";
import DatePickerField from "../../components/DatePickerField";
import DropdownField from "../../components/DropdownField";
import {uploadFileToStorage} from "../../services/storage";
import {addRecordToDB, getRecordsFromDB} from "../../services/database";
import {getFilenameFromPath} from "../../services/helper";
import AttachmentField from "../../components/AttachmentField";
import TextAreaField from "../../components/TextAreaField";

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


const TaskAddScreen = ({ navigation }) => {
    const { currentUser } = useAuth();

    const [task, setTask] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [priority, setPriority] = useState('');
    const [attachment, setAttachment] = useState(null);
    const [description, setDescription] = useState('');

    const [staffs, setStaffs] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
          const users = await getRecordsFromDB("users");
          const staffsList = [];
          for (let i = 0; i < users.length; i++) {
              const u = users[i]
              if (u.branchCode === currentUser.branchCode && u.email !== currentUser.email) {
                  staffsList.push({label: u.name, value: u.email});
              }
          }
          setStaffs(staffsList);
        };
        fetchData().catch((e) => console.error(e));
    }, []);

    const addTask = async () => {
        const req = {
            task: task,
            attachment: attachment,
            dueDate: dueDate,
            assignedTo: assignedTo,
            priority: priority,
            description: description,
            assignedBy: currentUser.email,
            createdBy: currentUser.email,
            createdAt: new Date(),
            pending: true,
            completed: false,
            isDeleted: false,
        };

        if (attachment) {
            req.attachment = await uploadFileToStorage(attachment.uri, "tasksAttachments", attachment.name);
        }
        await addRecordToDB("tasks", req);
        navigation.navigate("TasksListScreen");
    }

    return (
        <Provider>
            <View style={styles.listContainer}>
                <NavBar title="Add Task" backButton={true} navigation={navigation} />

                <ScrollView style={styles.listScrollView}>
                    <InputField onValueChange={setTask} value={task} placeholder={"Task"} />
                    <DatePickerField
                        onValueChange={setDueDate}
                        value={dueDate ? dueDate.toLocaleDateString() : dueDate}
                        placeholder={"Due Date"} startYear={1920}
                    />
                    {staffs && <DropdownField
                        items={staffs}
                        onValueChange={setAssignedTo}
                        selectedValue={assignedTo}
                        placeholder={"Assign to"}
                    />}
                    <DropdownField
                        items={priorities}
                        onValueChange={setPriority}
                        selectedValue={priority}
                        placeholder={"Priority"}
                    />
                    <AttachmentField
                        onAttachment={setAttachment}
                        value={attachment?.name || (attachment?.uri && getFilenameFromPath(attachment?.uri))}
                    />
                    <TextAreaField placeholder={"Description"} value={description} onValueChange={setDescription} />
                </ScrollView>
                <CustomButton title={"Add"} onPress={addTask} secondary={false} fixed={true} disable={!task || !priority || !dueDate || !assignedTo || !description} />
                <CustomButton title={"Cancel"} onPress={navigation.goBack} secondary={true} fixed={true} />
            </View>
        </Provider>
    );
};


export default TaskAddScreen;
