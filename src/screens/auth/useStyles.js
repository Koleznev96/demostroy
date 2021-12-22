import { StyleSheet, Platform, Dimensions } from 'react-native';
import {Colors, InputStyle} from "../../utils/Colors";
const {width, height} = Dimensions.get('screen');
const width_logo = width * 0.88;

export const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: Colors.FirstColor,
        paddingTop: height / 5,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        textTransform: 'uppercase',
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
        lineHeight: 30,
        marginBottom: 30,
    },
    input: {
        ...InputStyle,
    },
    error_text: {
        color: 'red',
        fontSize: 12,
        width: '100%',
        paddingLeft: 4,
        textAlign: 'left',
        marginTop: 4,
    },
    liner: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: '100%',
        marginTop: 15,
    },
    recet_password_text: {
        fontSize: 14,
        color: Colors.TextBlack,
    },
    hr: {
        marginTop: 20,
        marginBottom: 20,
        height: 1,
        backgroundColor: 'rgba(203, 217, 255, 0.2)',
        width: '100%',
    },
    button_registr_text: {
        fontSize: 16,
    },
});