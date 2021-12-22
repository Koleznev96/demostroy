import { StyleSheet, Platform, Dimensions } from 'react-native';
import {Colors} from "../../utils/Colors";
const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
    root: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
        zIndex: 500,
    },
    input: {
        borderRadius: 15,
        backgroundColor: Colors.ColorInput,
        width: '85%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 14,
        height: 40,
        ...Colors.BoxShadow,
    },
    text_input: {
        paddingHorizontal: 6,
        width: '85%',
    },
    button_filter: {
        borderRadius: 15,
        backgroundColor: Colors.ColorInput,
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center',
        ...Colors.BoxShadow,
    }
});