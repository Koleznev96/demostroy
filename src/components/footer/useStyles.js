import { StyleSheet, Platform } from 'react-native';
import {Colors} from "../../utils/Colors";

export const styles = StyleSheet.create({
    root: {
        position: 'absolute',
        bottom: 30,
    },
    title: {
        fontSize: 15,
        width: '100%',
        textAlign: 'center',
    },
    title_org: {
        color: Colors.Orange,
    }
});