import { StyleSheet, Platform } from 'react-native';
import {Colors} from "../../utils/Colors";

export const styles = StyleSheet.create({
    input: {
        width: '100%',
        height: 48,
        backgroundColor: Colors.ColorInput,
        borderRadius: 20,
        paddingHorizontal: 20,
        alignItems: 'center',
        color: '#fff',
        marginTop: 10,
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