import { StyleSheet, Platform } from 'react-native';
import {Colors} from "../../utils/Colors";

export const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: 48,
        backgroundColor: Colors.Orange,
        borderRadius: 20,
        aliginItems: 'center',
        justifyContent: 'center',
    },
    button_text: {
        width: '100%',
        textAlign: 'center',
    }
});