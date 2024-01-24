import { StatusBar } from 'expo-status-bar';
import {View} from 'react-native';
import {PaperProvider} from "react-native-paper";
import * as Font from 'expo-font';
import {useCallback, useContext, useEffect, useState} from "react";
import * as SplashScreen from 'expo-splash-screen';
import {theme} from "./assets/styles";
import { enGB, registerTranslation } from 'react-native-paper-dates';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import LoginScreen from "./screens/general/LoginScreen";
import RegisterScreen from "./screens/general/RegisterScreen";
import AdminHomeScreen from "./screens/admin/AdminHomeScreen";
import ManagerHomeScreen from "./screens/manager/ManagerHomeScreen";
import StaffHomeScreen from "./screens/staff/StaffHomeScreen";

import { onAuthStateChanged } from "firebase/auth";
import {auth} from "./services/firebase";
import {retrieveData} from "./services/secureStore";
import {getOneRecordFromDB} from "./services/database";

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [user, setUser] = useState(null);


  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      if (u) {
        const userData = await getOneRecordFromDB("users", u.uid);
        setUser(userData[1]);
        console.log("App User: ", userData[1]);
        console.log("App User: ", retrieveData("user"));
      } else {
        setUser(null);
        console.log("No User Signed In");
      }
    });

    async function prepare() {
      try {
        // Preload fonts, make any API calls you need to do here
        await Font.loadAsync({
          'Inter': require('./assets/fonts/Inter-Regular.ttf'),
          'InterBold': require('./assets/fonts/Inter-Bold.ttf'),
        });
        registerTranslation('en-GB', enGB)
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <PaperProvider theme={theme} >
      <NavigationContainer>
        <Stack.Navigator initialRouteName={user ? `${user.role}HomeScreen` : "Login"} screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="AdminHomeScreen" component={AdminHomeScreen} />
          <Stack.Screen name="ManagerHomeScreen" component={ManagerHomeScreen} />
          <Stack.Screen name="StaffHomeScreen" component={StaffHomeScreen} />
        </Stack.Navigator>
        <View onLayout={onLayoutRootView}>
          <StatusBar style="auto" />
        </View>
      </NavigationContainer>
    </PaperProvider>
  );
}

