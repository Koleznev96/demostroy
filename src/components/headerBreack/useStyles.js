import { StyleSheet, Platform, Dimensions } from 'react-native';
import {Colors} from "../../utils/Colors";
const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: 63,
        marginTop: Platform.OS === 'ios' ? 35 : 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button_keft: {
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    button: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        marginLeft: -40,
        fontSize: 18,
    },
});