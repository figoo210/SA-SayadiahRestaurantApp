import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import {PaperProvider} from "react-native-paper";
import * as Font from 'expo-font';
import {useCallback, useEffect, useState} from "react";
import * as SplashScreen from 'expo-splash-screen';
import {SafeAreaView} from "react-native-safe-area-context";
import {theme} from "./assets/styles";
import { enGB, registerTranslation } from 'react-native-paper-dates';


// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Preload fonts, make any API calls you need to do here
        await Font.loadAsync({
          'Inter': require('./assets/fonts/Inter-Regular.ttf'),
          // ... other fonts
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
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView onLayout={onLayoutRootView} style={styles.container}>
        <StatusBar style="auto" />
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
