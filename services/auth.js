import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "./firebase";
import {storeData} from "./secureStore";
import {getOneRecordFromDB, addOrUpdateRecord} from "./database";

export const signup = async (name, email, password, branchCode, role) => {
    // Validate Email & Password
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(String(email).toLowerCase())) {
        return [false, null, "Invalid Email, please write a valid email!"];
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
        return [false, null, "Invalid Password, Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"];
    }

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Assuming updateRecord and storeData return promises
        let u = {
            uid: user.uid,
            name: name,
            branchCode: branchCode,
            email: user.email,
            role: role
        };
        await addOrUpdateRecord("users", user.uid, u);
        await storeData("user", u);
        return [true, u, "User signed up successfully"];
    } catch (error) {
        console.log("Error: ", error);
        return [false, null, error.message || error];
    }
};


export const login = async (email, password) => {
    // Validate Email
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(String(email).toLowerCase())) {
        return [false, null, "Invalid Email, please write a valid email!"];
    }
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const userData = await getOneRecordFromDB("users", user.uid);
        await storeData("user", userData[1]);
        return [true, userData[1], "Logged In Successfully"];
    } catch (e) {
        console.log("Login Error: ", e);
        return [false, null, e.message || e];
    }
};


export const isUserLoggedIn = (navigation) => {
    const user = auth.currentUser;
    return !!user;
};
