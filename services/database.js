import {addDoc, collection, doc, getDoc, getDocs, setDoc} from "firebase/firestore";
import { db } from "./firebase";


export const addRecordToDB = async (tableName, dataObj) => {
    try {
        const docRef = await addDoc(collection(db, tableName), dataObj);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
};


export const getRecordsFromDB = async (tableName) => {
    const results = [];
    try {
        const docRef = collection(db, tableName);
        // console.log("DOC_REF: ", docRef);
        const querySnapshot = await getDocs(docRef);
        querySnapshot && querySnapshot.forEach((doc) => {
            // console.log(`${doc.id} => ${doc.data()}`);
            results.push({
                id: doc.id,
                ...doc.data(),
            });
        });
    } catch (e) {
        console.log("querySnapshot ERROR: ", e);
        return []; // Return an empty array or handle the error as needed
    }
    return results;
};


export const getOneRecordFromDB = async (tableName, id) => {
    const docRef = doc(db, tableName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return [true, docSnap.data()];
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
        return [false, null];
    }
};


export const addOrUpdateRecord = async (tableName, id, dataObj) => {
    const docRef = doc(db, tableName, id);
    return await setDoc(docRef, dataObj);
};

