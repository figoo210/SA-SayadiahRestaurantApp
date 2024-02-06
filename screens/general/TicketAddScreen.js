// TicketAddScreen.js
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
import TextAreaField from "../../components/TextAreaField";
import AttachmentField from "../../components/AttachmentField";
import {getFilenameFromPath} from "../../services/helper";
import {uploadFileToStorage} from "../../services/storage";

const TicketAddScreen = ({ navigation }) => {
    const { currentUser } = useAuth();
    const [availableTypes, setAvailableTypes] = useState([]);

    const [ticketType, setTicketType] = useState('');
    const [dueDate, setDueDate] = useState(new Date());
    const [description, setDescription] = useState('');
    const [attachment, setAttachment] = useState('');

    const addTicket = async () => {
        const data = {
            ticketType: ticketType,
            dueDate: dueDate,
            description: description,
            attachment: attachment,
            createdAt: new Date(),
            createdBy: currentUser.email,
            completed: false,
            pending: true,
            isDeleted: false,
        };
        if (attachment) {
            data.attachment = await uploadFileToStorage(attachment.uri, "ticketsAttachments", attachment.name);
        }
        await addRecordToDB("tickets", data);
        if (!availableTypes.includes(ticketType)) {
            await addRecordToDB("ticketTypes", { ticketType: ticketType });
        }
        navigation.navigate("TicketsListScreen");
    }

    useEffect(() => {
        const getTypes = async () => {
            const types = await getRecordsFromDB("ticketTypes");
            const ts = [];
            for (let i = 0; i < types.length; i++) {
                ts.push(types[i].ticketType);
            }
            setAvailableTypes(ts);
        };
        getTypes().catch(console.error);
    }, []);

    return (
        <Provider>
            <View style={styles.listContainer}>
                <NavBar title="Add new ticket" backButton={true} navigation={navigation} />

                {availableTypes && availableTypes.length > 0 && <ScrollView style={styles.listScrollView}>
                    <TextInputDropdown options={availableTypes} onValueChange={setTicketType} value={ticketType} placeholder={"Ticket type"}/>
                    <DatePickerField onValueChange={setDueDate} value={dueDate.toLocaleDateString()}
                                     placeholder={"Due Date"}/>
                    <TextAreaField onValueChange={setDescription} value={description} placeholder={"Description"}/>
                    <AttachmentField onAttachment={setAttachment} value={attachment?.name || (attachment?.uri && getFilenameFromPath(attachment?.uri))} />
                </ScrollView>}
                <CustomButton title={"Add"} onPress={addTicket} secondary={false} fixed={true} disable={!ticketType || !dueDate || !description} />
                <CustomButton title={"Cancel"} onPress={navigation.goBack} secondary={true} fixed={true} />
            </View>
        </Provider>
    );
};


export default TicketAddScreen;
