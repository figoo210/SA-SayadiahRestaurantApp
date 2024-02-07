import 'react-native-gesture-handler';
import {PaperProvider} from "react-native-paper";
import {theme} from "./assets/styles";
import {AuthProvider} from "./services/AuthContext";
import AppNavigator from "./AppNavigator";

export default function App() {

  return (
    <PaperProvider theme={theme} >
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </PaperProvider>
  );
}

