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
        width: '100%',
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
        width: "30%",
        marginTop: 20,
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
        marginTop: 20,
    },

    // Login
    loginContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
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

    // Home
    containerHomeScreen: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentHomeScreen: {
        padding: 20,
        paddingTop: 30,
    },
    titleHomeScreen: {
        textAlign: 'center',
        marginVertical: 20,
    },
    gridHomeScreen: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    },
    cardHomeScreen: {
        position: 'relative',
        width: '100%',
        paddingVertical: 5,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EEF3F4',
    },
    cardButtonHomeScreen: {
        position: 'relative',
        width: '45%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    cardContentHomeScreen: {
        alignItems: 'center',
        color: '#10515C',
    },
    cardTitleHomeScreen: {
        marginTop: 8,
        color: '#10515C',
    },
    chartTitle: {
        textAlign: 'center',
        color: '#10515C',
        fontSize: 16,
        marginVertical: 10,
        textDecorationLine: 'underline',
    },

    // Issues
    issueContainer: {
        padding: 20,
        backgroundColor: '#fff',
        flex: 1,
    },
    issueTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#10515C',
    },
    input: {
        backgroundColor: '#EEF3F4',
        marginBottom: 15,
    },
    button: {
        marginVertical: 10,
    },
    buttonLabel: {
        color: '#fff',
    },
    accordionHeader: {
        // Style your accordion header here
        padding: 20,
        // backgroundColor: '#f0f0f0',
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        marginVertical: 10,
    },
    listContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    listScrollView: {
        flex: 1,
        padding: 20,
        height: '100%',
        marginBottom: 20,
    },
    listAddButton: {
        margin: 16,
        paddingVertical: 8,
    },
    listAddButtonText: {
        fontSize: 16,
        lineHeight: 26,
    },

    styleCard: {
        backgroundColor: '#E8E8E8',
        borderRadius: 8,
        padding: 16,
        marginBottom: 16,
        width: "100%",
        alignSelf: 'center',
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    issueNumber: {
        fontFamily: 'Inter',
        fontWeight: 'bold',
        fontSize: 16,
        color: '#484848',
    },
    issueDate: {
        fontFamily: 'Inter',
        fontWeight: '500',
        fontSize: 16,
        color: '#484848',
        marginTop: 4,
    },
    issueCardTitle: {
        fontFamily: 'Inter',
        fontWeight: '500',
        fontSize: 16,
        color: '#484848',
        marginTop: 4,
    },
    issueStatus: {
        fontFamily: 'Inter',
        fontWeight: '500',
        fontSize: 16,
        color: '#484848',
        marginTop: 4,
    },
    issuePriority: {
        fontFamily: 'Inter',
        fontWeight: '500',
        fontSize: 12,
        color: '#FFFFFF', // White color for the text inside the priority label
        paddingHorizontal: 10,
    },
    filterTabsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: 'transparent',
        paddingVertical: 8,
    },
    cardTitle: {
        fontFamily: 'Inter',
        fontWeight: 'bold',
        fontSize: 18,
        color: theme.colors.primary,
    },
    cardContent: {
        marginTop: 10,
        marginBottom: 30,
        padding: 20,
        backgroundColor: "#E8E8E8",
        borderRadius: 8,
        borderColor: "#000",
        borderWidth: 1,
    },
    cardBorder: {
        borderBottomWidth: 1,
        borderBottomColor: "#D9D9D9",
        marginVertical: 5,
    },
    cardText: {
        fontFamily: 'Inter',
        fontSize: 14,
        color: '#484848',
        marginTop: 4,
    },
    cardInfo: {
        fontFamily: 'InterBold',
        fontSize: 16,
        color: '#000',
        marginBottom: 8,
    },
    actionModal: {
        backgroundColor: "#fff",
        padding: 50,
        margin: 10,
        borderRadius: 18,
    },
    actionModalTitle: {
        color: "#10515C",
        textAlign: "center",
        marginBottom: 10,
        fontSize: 16,
    },
    actionModalText: {
        color: "#000",
        textAlign: "center",
        marginBottom: 20,
        fontSize: 16,
    },
});
