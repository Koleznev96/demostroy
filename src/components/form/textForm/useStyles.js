import { StyleSheet, Platform } from 'react-native';
import {Colors} from "../../../utils/Colors";

export const styles = StyleSheet.create({
    root: {
        marginBottom: 20,
    },
    input: {
        backgroundColor: Colors.ColorInput,
        width: '100%',
        borderRadius: 20,
        color: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 12,
        minHeight: 150,
        textAlignVertical: "top",
        fontSize: 14,
    },
    error_text: {
        color: 'red',
        fontSize: 12,
        width: '100%',
        paddingLeft: 4,
        textAlign: 'left',
        marginTop: 4,
    },
});