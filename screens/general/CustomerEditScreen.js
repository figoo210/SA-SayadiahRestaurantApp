// CustomerEditScreen.js
import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {Provider, Switch} from 'react-native-paper';
import {styles} from "../../assets/styles";
import NavBar from "../../components/NavBar";
import CustomButton from "../../components/CustomButton";
import InputField from "../../components/InputField";
import {useAuth} from "../../services/AuthContext";
import DatePickerField from "../../components/DatePickerField";
import DropdownField from "../../components/DropdownField";
import PhoneNumberField from "../../components/PhoneNumberField";


const CustomerEditScreen = ({ navigation }) => {
    const { currentUser } = useAuth();

    const [name, setName] = useState('');
    const [dialCode, setDialCode] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [isBlacklisted, setIsBlacklisted] = useState();

    const editCustomer = async () => {
        const req = {
            "name": name,
            "dial_code": parseInt(dialCode.replace(phone, "").replace("+", "")),
            "phone": phone,
            "email": email,
            "gender": parseInt(gender),
            "birth_date": birthDate,
            "is_loyalty_enabled": false,
            "is_blacklisted": isBlacklisted,
            "is_house_account_enabled": true,
        };
        console.log("##########: ", req);
        // navigation.navigate("CustomersListScreen");
    }

    // make useEffect to get customer data

    return (
        <Provider>
            <View style={styles.listContainer}>
                <NavBar title="Add Customer" backButton={true} navigation={navigation} />

                <ScrollView style={styles.listScrollView}>
                    <InputField onValueChange={setName} value={name} placeholder={"Customer Name"} />
                    <InputField onValueChange={setEmail} value={email} placeholder={"Customer Email"} />
                    <PhoneNumberField getPhone={setPhone} getDialCode={setDialCode}  />
                    <DropdownField
                        items={[{label: "Male", value: "1"}, {label: "Female", value: "2"}]}
                        onValueChange={setGender}
                        selectedValue={gender}
                        placeholder={"Customer Gender"}
                    />
                    <DatePickerField
                        onValueChange={setBirthDate}
                        value={birthDate ? birthDate.toLocaleDateString() : birthDate}
                        placeholder={"Customer Birth Date"} startYear={1920}
                    />
                    <Switch value={isBlacklisted} onValueChange={setIsBlacklisted} />
                </ScrollView>
                <CustomButton title={"Save"} onPress={editCustomer} secondary={false} fixed={true} />
                <CustomButton title={"Cancel"} onPress={navigation.goBack} secondary={true} fixed={true} />
            </View>
        </Provider>
    );
};


export default CustomerEditScreen;
