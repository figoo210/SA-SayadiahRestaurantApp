// ReportsScreen.js
import React, {useState} from 'react';
import {View, ScrollView, Text} from 'react-native';
import {Modal, Provider} from 'react-native-paper';
import {styles} from "../../assets/styles";
import NavBar from "../../components/NavBar";
import CustomButton from "../../components/CustomButton";
import {useAuth} from "../../services/AuthContext";
import DatePickerField from "../../components/DatePickerField";
import DropdownField from "../../components/DropdownField";
import {uploadFileToStorage} from "../../services/storage";
import {addRecordToDB, getRecordsFromDB} from "../../services/database";
import {
    convertListToCSV,
    convertListToExcel,
    downloadFile,
    getFilenameFromPath,
    saveFile,
    shareFile
} from "../../services/helper";
import AttachmentField from "../../components/AttachmentField";
import TextAreaField from "../../components/TextAreaField";

const reportsCategories = [
    {
        label: "System Reports",
        value: "System Reports",
    },
    {
        label: "Foodics Reports",
        value: "Foodics Reports",
    },
];

const reportsTypes = {
    "System Reports": [
        {
            label: "Sales Report",
            value: "Sales Report",
        },
        {
            label: "Maintenance Report",
            value: "Maintenance Report",
        },
    ],
    "Foodics Reports": [
        {
            label: "Raw Material Report",
            value: "Raw Material Report",
        },
        {
            label: "Customers Report",
            value: "Customers Report",
        },
    ],
};

const formats = [
    // {
    //     label: "PDF",
    //     value: "PDF",
    // },
    {
        label: "Excel",
        value: "Excel",
    },
    {
        label: "CSV",
        value: "CSV",
    },
];


const ReportsScreen = ({ navigation }) => {
    const { currentUser } = useAuth();

    const [reportCategory, setReportCategory] = useState('');
    const [reportType, setReportType] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');

    const [format, setFormat] = useState('CSV');
    const [results, setResults] = useState([]);
    const [saved, setSaved] = useState(false);

    const getData = async (table) => {
        let data = await getRecordsFromDB(table);
        const rs = [];
        for (let i = 0; i < data.length; i++) {
            const d = data[i];
            if (!d.isDeleted) {
                rs.push(d);
            }
        }
        setResults(rs);
    };

    const prepareReportFile = async () => {
        let fileData;
        let fileUri;
        if (format === "Excel") {
            fileData = await convertListToExcel(results);
            fileUri = await saveFile(fileData, `${reportType.replace(" ","-")}-${new Date().valueOf()}.xlsx`);
        }
        if (format === "CSV") {
            fileData = await convertListToCSV(results);
            fileUri = await saveFile(fileData, `${reportType.replace(" ","-")}-${new Date().valueOf()}.csv`);
        }
        return fileUri;
    };

    const findReport = async () => {
        const reportData = {
            reportCategory,
            reportType,
            fromDate,
            toDate,
        }
        switch (reportType) {
            case "Sales Report":
                // Generate Report to results state
                await getData("salesIssues");
                break;
            case "Maintenance Report":
                // Generate Report to results state
                await getData("maintenance");
                break;
            case "Raw Material Report":
                // Generate Report to results state
                await getData("restocks");
                break;
            case "Customers Report":
                // Generate Report to results state
                break;
            default:
                setResults([]);
                break;
        }
        console.log(reportData);
    }

    const exportReport = async () => {
        // Logic
        let f = await prepareReportFile();
        setSaved(true);
        setResults([]);
    }

    const shareReport = async () => {
        // Logic
        let f = await prepareReportFile();
        await shareFile(f);
        setResults([]);
    }

    return (
        <Provider>
            <View style={styles.listContainer}>
                <NavBar title="Reports" backButton={true} navigation={navigation} />

                <ScrollView style={styles.listScrollView}>
                    <DropdownField
                        items={reportsCategories}
                        onValueChange={setReportCategory}
                        selectedValue={reportCategory}
                        placeholder={"Report Category"}
                    />
                    <DropdownField
                        items={reportsTypes[reportCategory]}
                        onValueChange={setReportType}
                        selectedValue={reportType}
                        placeholder={"Report Type"}
                        active={!!reportCategory}
                    />
                    <DatePickerField
                        onValueChange={({ startDate, endDate }) => {
                            setFromDate(startDate);
                            setToDate(endDate);
                        }}
                        value={(fromDate ? fromDate.toLocaleDateString() : fromDate) + " - " + (toDate ? toDate.toLocaleDateString() : toDate)}
                        placeholder={"Report Period"} startYear={2020}
                        range={true}
                        startDate={fromDate}
                        endDate={toDate}
                    />
                    {/*{results.length > 0 && <DropdownField*/}
                    {/*    items={formats}*/}
                    {/*    onValueChange={setFormat}*/}
                    {/*    selectedValue={format}*/}
                    {/*    placeholder={"Format"}*/}
                    {/*/>}*/}
                </ScrollView>
                {results.length === 0 && <CustomButton
                    title={"Search"}
                    onPress={findReport}
                    secondary={false}
                    fixed={true}
                    disable={!reportCategory || !reportType}
                />}
                {results.length > 0 && <>
                    <CustomButton title={"Export"} onPress={exportReport} secondary={false} fixed={true} disable={!format}/>
                    <CustomButton title={"Share"} onPress={shareReport} secondary={false} fixed={true} disable={!format}/>
                </>}
                {/*Success Modal*/}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={saved}
                    onRequestClose={() => {
                        setSaved(false);
                    }}
                    children={
                        <View style={styles.actionModal}>
                            <Text style={styles.actionModalTitle}>Saved!</Text>
                            <Text style={styles.actionModalText}>File saved successfully.</Text>
                            <CustomButton title={"Ok"} onPress={() => setSaved(false)} secondary={false} />
                        </View>
                    }
                />
            </View>
        </Provider>
    );
};


export default ReportsScreen;
