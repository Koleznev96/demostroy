import { StyleSheet, Platform } from 'react-native';
import {Colors} from "../../../utils/Colors";

export const styles = StyleSheet.create({
    root: {
        marginBottom: 20,
    },
    input: {
        width: '100%',
        paddingHorizontal: -4,
        colors: '#fff',
        fontSize: 14,
        marginTop: -8,
        borderBottomWidth: 1,
        borderColor: 'rgba(203, 217, 255, 0.2)',
        paddingBottom: -8,
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