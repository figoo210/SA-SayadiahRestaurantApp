import {Dimensions, StyleSheet} from "react-native";
import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

// Get the device width to make the button responsive
const deviceWidth = Dimensions.get('window').width;

export const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'tomato',
        secondary: 'yellow',
    },
};

export const styles = StyleSheet.create({
    pickerItem: {
        fontFamily: 'Inter', // Make sure this font is loaded in your project
        fontSize: 16,
    },
    // Styles for DatePickerField
    customField: {
        backgroundColor: 'transparent',
        width: '100%',
        borderRadius: 0,
        borderWidth: 0,
        borderBottomWidth: 0,
        borderBottomColor: 'transparent',
        textDecorationLine: 'none',
        textDecorationColor: 'transparent',


    },
    customFieldContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgb(232, 232, 232)',
        borderRadius: 8,
        borderWidth: 0,
        width: '85%',
        marginVertical: 8,
    },
    iconField: {
        marginRight: 10,
        color: 'rgb(72, 72, 72)',
    },
    textInput: {
        flex: 1,
    },
    iconSmallButton: {
        borderRadius: 24,
        padding: 5,
        justifyContent: 'center',
        backgroundColor: '#0C8CE9',
    },
    iconSmallButtonText: {
        fontFamily: 'Inter',
        fontWeight: '600',
        fontSize: 16,
        color: '#FFFFFF',
    },
    iconWrapper: {
        width: 24, // Icon size, adjust as needed
        height: 24, // Icon size, adjust as needed
        justifyContent: 'center',
        alignItems: 'center',
    },
    customButton: {
        backgroundColor: '#10515C',
        borderRadius: 8,
        width: deviceWidth * 0.85, // Adjust the multiplier to fit your design needs
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center', // Centers the button horizontally
        marginTop: 20, // Example of how to position the button, adjust as needed
        shadowColor: '#10515C',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // Elevation for Android
    },
    customButtonText: {
        color: '#FFFFFF',
        fontFamily: 'Inter',
        fontWeight: '600',
        fontSize: 16,
        textAlign: 'center',
    },
    ratingFieldCard: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginVertical: 8,
        padding: 3,
        width: deviceWidth * 0.85, // Adjust as needed
    },
    ratingFieldTitle: {
        fontFamily: 'Inter',
        fontWeight: 500,
        fontSize: 16,
        color: '#484848',
    },
    ratingFieldContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: deviceWidth * 0.85, // Adjust as needed
        marginTop: 2,
    },

    // Screens
    brandTitle: {
        fontFamily: 'InterBold',
        fontSize: 16,
        lineHeight: 19,
        textAlign: 'center',
        textTransform: 'uppercase',
        color: '#10515C',
        marginBottom: 15,
    },

    // Login
    loginContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginTitle: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
    },
    loginTitleContainer: {
        marginBottom: '10%',
        textAlign: 'center',
    },
});