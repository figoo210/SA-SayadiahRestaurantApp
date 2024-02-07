import 'react-native-gesture-handler';
import {PaperProvider} from "react-native-paper";
import {theme} from "./assets/styles";
import {AuthProvider} from "./services/AuthContext";
import AppNavigator from "./AppNavigator";
import {useEffect, useState} from "react";
import {BackHandler, ToastAndroid} from "react-native";

export default function App() {
    const [lastBackPressed, setLastBackPressed] = useState(0);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => {
                if (lastBackPressed && lastBackPressed + 2000 >= Date.now()) {
                    BackHandler.exitApp(); // Exit the app if the back button is pressed twice within 2 seconds
                    return true;
                }

                // Update the last back press timestamp and show a toast
                setLastBackPressed(Date.now());
                ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);
                return true; // Prevent the default back button behavior
            }
        );


        return () => backHandler.remove(); // Clean up the event listener
    }, [lastBackPressed]);

  return (
    <PaperProvider theme={theme} >
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </PaperProvider>
  );
}

