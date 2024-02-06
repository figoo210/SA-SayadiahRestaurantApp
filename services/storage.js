import {storage} from "./firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {getFilenameFromPath} from "./helper";
import {Alert} from "react-native";

export const uploadFileToStorage = (file, storagePath, filename) => {
    return new Promise((resolve, reject) => {
        const storageRef = ref(storage, `${storagePath}/${filename || getFilenameFromPath(file)}`);

        // Fetch the file from the local file system as a blob
        fetch(file).then(response => {
            return response.blob();
        }).then(blob => {
            const uploadTask = uploadBytesResumable(storageRef, blob);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    reject(new Error("Couldn't upload this file: " + error));
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
                        console.log('File available at', downloadURL);
                        resolve(downloadURL);
                    });
                }
            );
        }).catch(error => {
            reject(new Error("Couldn't fetch the file for upload: " + error));
        });
    });
};
