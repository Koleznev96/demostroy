import { StyleSheet, Platform } from 'react-native';
import {Colors} from "../../../utils/Colors";

export const styles = StyleSheet.create({
    root: {
        marginBottom: 20,
    },
    liner: {
        width: '100%',
        paddingHorizontal: -4,
        height: 35,
        paddingTop: 10,
        paddingBottom: 0,
        marginTop: -5,
        borderBottomWidth: 1,
        borderColor: 'rgba(203, 217, 255, 0.2)',
        paddingBottom: -8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    value: {
        color: '#fff',
        fontSize: 14,
    },
    loader: {
        width: 20,
        height: 20,
    },
    button: {
        width: 40,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        flexDirection: 'row',
    },
    error_text: {
        color: 'red',
        fontSize: 12,
        width: '100%',
        paddingLeft: 4,
        textAlign: 'left',
        marginTop: 4,
    },
    label: {
        fontSize: 14,
        color: Colors.ColorIcon
    }
});