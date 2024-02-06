import React, { useState, useEffect } from 'react';
import {View, Alert, TouchableOpacity, Platform} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { styles } from '../assets/styles';
import {TextInput} from "react-native-paper";

const AttachmentField = ({ onAttachment, value }) => {
    // const [value, setValue] = useState("");

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const handleAttachmentResult = (result) => {
        if (!result.canceled && result.assets && result.assets.length > 0) {
            const selectedAsset = result.assets[0];
            // setValue(selectedAsset.name || `photo-${Math.random()}.jpg`);
            onAttachment && onAttachment(selectedAsset);
        }
    };

    const pickImageOrDocument = async () => {
        Alert.alert(
            "Select Attachment",
            "Choose your attachment type",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Photo from Camera",
                    onPress: takePhoto
                },
                // {
                //     text: "Image from Gallery",
                //     onPress: pickImage
                // },
                {
                    text: "Attach Document",
                    onPress: pickDocument
                }
            ],
            { cancelable: true } // Ensure the alert is cancelable
        );
    };

    const takePhoto = async () => {
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
        });

        handleAttachmentResult(result);
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        handleAttachmentResult(result);
    };

    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({ type: "*/*" });

        handleAttachmentResult(result);
    };

    return (
        <View>
            <TouchableOpacity style={{...styles.customFieldContainer}} onPress={pickImageOrDocument}>
                <TextInput
                    style={styles.customField}
                    label={"Attachment"}
                    value={value}
                    underlineColor="transparent"
                    editable={false}
                    right={<TextInput.Icon icon="attachment" color={value && value.length > 0 ? "#10515C" : "#484848"} />}
                />
            </TouchableOpacity>


        </View>
    );
};

export default AttachmentField;
