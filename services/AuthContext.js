import React, {createContext, useContext, useEffect, useState} from 'react';
import {auth} from "./firebase";
import {onAuthStateChanged, signOut} from "firebase/auth";
import {getOneRecordFromDB} from "./database";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        return onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userData = await getOneRecordFromDB("users", user.uid);
                console.log("userData: ", userData);
                setCurrentUser(userData[1]);
            }
            setLoading(false);
        });
    }, []);

    const logout = async () => {
        await signOut(auth);
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider value={{ currentUser, loading, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
